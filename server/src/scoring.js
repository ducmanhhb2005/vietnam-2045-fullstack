const SCORE_FIELDS = {
  digital: 'digitalScore',
  innovation: 'innovationScore',
  pioneer: 'pioneerScore',
  knowledge: 'knowledgeScore',
  green: 'greenScore'
};

const ROLE_BONUS = {
  'student-digital': { digitalScore: 5, knowledgeScore: 3 },
  'startup-young': { innovationScore: 5, digitalScore: 2 },
  'green-citizen': { greenScore: 5, pioneerScore: 2 },
  'youth-union': { pioneerScore: 5, knowledgeScore: 2 }
};

const PROFILE_BY_SCORE_TYPE = {
  digitalScore: 'cong-dan-so-tien-phong',
  innovationScore: 'thanh-nien-sang-tao',
  pioneerScore: 'doan-vien-trach-nhiem',
  knowledgeScore: 'cong-dan-tri-thuc',
  greenScore: 'cong-dan-xanh-trach-nhiem'
};

function baseScore() {
  return {
    digitalScore: 0,
    innovationScore: 0,
    pioneerScore: 0,
    knowledgeScore: 0,
    greenScore: 0,
    quizScore: 0
  };
}

function applyBonus(score, bonus = {}) {
  for (const [field, value] of Object.entries(bonus)) {
    score[field] = (score[field] || 0) + value;
  }
}

function decideResultSlug(score) {
  const entries = [
    ['digitalScore', score.digitalScore],
    ['innovationScore', score.innovationScore],
    ['pioneerScore', score.pioneerScore],
    ['knowledgeScore', score.knowledgeScore],
    ['greenScore', score.greenScore]
  ];

  let [topField, topValue] = entries[0];
  for (const [field, value] of entries.slice(1)) {
    if (value > topValue) {
      topField = field;
      topValue = value;
    }
  }

  // Nếu người chơi trả lời quiz rất tốt, ưu tiên hình mẫu tri thức khi điểm không chênh lệch quá xa.
  if (score.quizScore >= 16 && score.knowledgeScore >= topValue - 2) {
    return 'cong-dan-tri-thuc';
  }

  return PROFILE_BY_SCORE_TYPE[topField];
}

function calculateJourney({ roleSlug, selectedChoices, selectedAnswers, choicesById, optionsById }) {
  const score = baseScore();
  applyBonus(score, ROLE_BONUS[roleSlug]);

  const choiceDetails = [];
  for (const item of selectedChoices) {
    const choice = choicesById.get(Number(item.choiceId));
    if (!choice) continue;

    if (choice.scoreType && SCORE_FIELDS[choice.scoreType]) {
      score[SCORE_FIELDS[choice.scoreType]] += choice.scoreValue;
    }

    choiceDetails.push({
      scenarioId: item.scenarioId,
      choiceId: choice.id,
      label: choice.label,
      text: choice.text,
      scoreType: choice.scoreType,
      scoreValue: choice.scoreValue
    });
  }

  const answerDetails = [];
  for (const item of selectedAnswers) {
    const option = optionsById.get(Number(item.optionId));
    if (!option) continue;

    if (option.isCorrect) {
      score.quizScore += 4;
      score.knowledgeScore += 1;
    }

    answerDetails.push({
      questionId: item.questionId,
      optionId: option.id,
      label: option.label,
      text: option.text,
      isCorrect: option.isCorrect
    });
  }

  const totalScore =
    score.digitalScore +
    score.innovationScore +
    score.pioneerScore +
    score.knowledgeScore +
    score.greenScore +
    score.quizScore;

  return {
    score: {
      ...score,
      totalScore
    },
    resultSlug: decideResultSlug(score),
    choiceDetails,
    answerDetails
  };
}

module.exports = {
  calculateJourney
};
