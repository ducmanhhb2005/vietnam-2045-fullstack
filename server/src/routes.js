const express = require('express');
const prisma = require('./prisma');
const { calculateJourney } = require('./scoring');

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({ ok: true, message: 'Vietnam 2045 API is running' });
});

router.get('/bootstrap', async (_req, res, next) => {
  try {
    const [roles, scenarios, quizQuestions, resultProfiles] = await Promise.all([
      prisma.role.findMany({ orderBy: { id: 'asc' } }),
      prisma.scenario.findMany({
        orderBy: { order: 'asc' },
        include: { choices: { orderBy: { label: 'asc' } } }
      }),
      prisma.quizQuestion.findMany({
        orderBy: { order: 'asc' },
        include: { options: { orderBy: { label: 'asc' } } }
      }),
      prisma.resultProfile.findMany({ orderBy: { id: 'asc' } })
    ]);

    res.json({ roles, scenarios, quizQuestions, resultProfiles });
  } catch (error) {
    next(error);
  }
});

router.post('/journey/complete', async (req, res, next) => {
  try {
    const { roleSlug, choices = [], answers = [] } = req.body;

    if (!roleSlug) {
      return res.status(400).json({ message: 'roleSlug is required' });
    }

    const role = await prisma.role.findUnique({ where: { slug: roleSlug } });
    if (!role) {
      return res.status(400).json({ message: 'Invalid roleSlug' });
    }

    const [choiceRows, optionRows] = await Promise.all([
      prisma.choice.findMany(),
      prisma.quizOption.findMany()
    ]);

    const choicesById = new Map(choiceRows.map((choice) => [choice.id, choice]));
    const optionsById = new Map(optionRows.map((option) => [option.id, option]));

    const { score, resultSlug, choiceDetails, answerDetails } = calculateJourney({
      roleSlug,
      selectedChoices: choices,
      selectedAnswers: answers,
      choicesById,
      optionsById
    });

    const profile = await prisma.resultProfile.findUnique({ where: { slug: resultSlug } });
    if (!profile) {
      return res.status(500).json({ message: 'Result profile not found' });
    }

    const session = await prisma.journeySession.create({
      data: {
        roleSlug,
        roleTitle: role.title,
        digitalScore: score.digitalScore,
        innovationScore: score.innovationScore,
        pioneerScore: score.pioneerScore,
        knowledgeScore: score.knowledgeScore,
        greenScore: score.greenScore,
        quizScore: score.quizScore,
        totalScore: score.totalScore,
        resultSlug: profile.slug,
        resultTitle: profile.title,
        choicesText: JSON.stringify(choiceDetails),
        answersText: JSON.stringify(answerDetails)
      }
    });

    res.status(201).json({ session, role, score, profile, choices: choiceDetails, answers: answerDetails });
  } catch (error) {
    next(error);
  }
});

router.get('/analytics', async (_req, res, next) => {
  try {
    const [totalSessions, latestSessions, groupedProfiles] = await Promise.all([
      prisma.journeySession.count(),
      prisma.journeySession.findMany({ orderBy: { createdAt: 'desc' }, take: 8 }),
      prisma.journeySession.groupBy({ by: ['resultTitle'], _count: { resultTitle: true } })
    ]);

    const aggregate = await prisma.journeySession.aggregate({
      _avg: {
        digitalScore: true,
        innovationScore: true,
        pioneerScore: true,
        knowledgeScore: true,
        greenScore: true,
        quizScore: true,
        totalScore: true
      }
    });

    res.json({
      totalSessions,
      groupedProfiles: groupedProfiles.map((item) => ({
        resultTitle: item.resultTitle,
        count: item._count.resultTitle
      })),
      averageScore: aggregate._avg,
      latestSessions
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
