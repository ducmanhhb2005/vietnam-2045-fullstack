import { useEffect, useMemo, useState } from 'react';
import { api } from './lib/api.js';
import Header from './components/Header.jsx';
import Shell from './components/Shell.jsx';
import Landing from './components/Landing.jsx';
import RoleSelect from './components/RoleSelect.jsx';
import ScenarioScreen from './components/ScenarioScreen.jsx';
import FeedbackScreen from './components/FeedbackScreen.jsx';
import QuizScreen from './components/QuizScreen.jsx';
import ResultScreen from './components/ResultScreen.jsx';
import AnalyticsScreen from './components/AnalyticsScreen.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';

const SCREENS = {
  LANDING: 'landing',
  ROLES: 'roles',
  SCENARIO: 'scenario',
  FEEDBACK: 'feedback',
  QUIZ: 'quiz',
  RESULT: 'result',
  ANALYTICS: 'analytics'
};

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [screen, setScreen] = useState(SCREENS.LANDING);
  const [selectedRole, setSelectedRole] = useState(null);
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [lastChoice, setLastChoice] = useState(null);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  async function loadData() {
    try {
      setLoading(true);
      setError('');
      const response = await api.getBootstrap();
      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const currentScenario = useMemo(() => data?.scenarios?.[scenarioIndex], [data, scenarioIndex]);
  const currentQuiz = useMemo(() => data?.quizQuestions?.[quizIndex], [data, quizIndex]);

  function restart() {
    setScreen(SCREENS.LANDING);
    setSelectedRole(null);
    setScenarioIndex(0);
    setSelectedChoices([]);
    setLastChoice(null);
    setQuizIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setResult(null);
    setIsSubmitting(false);
  }

  function goHome() {
    setScreen(SCREENS.LANDING);
  }

  function startJourney() {
    setScreen(SCREENS.ROLES);
  }

  function selectRole(role) {
    setSelectedRole(role);
    setScenarioIndex(0);
    setSelectedChoices([]);
    setScreen(SCREENS.SCENARIO);
  }

  function chooseScenario(choice) {
    setLastChoice({ choice, scenario: currentScenario });
    setSelectedChoices((prev) => [
      ...prev,
      { scenarioId: currentScenario.id, choiceId: choice.id }
    ]);
    setScreen(SCREENS.FEEDBACK);
  }

  function nextAfterFeedback() {
    const isLast = scenarioIndex >= data.scenarios.length - 1;
    if (isLast) {
      setQuizIndex(0);
      setSelectedOption(null);
      setScreen(SCREENS.QUIZ);
      return;
    }

    setScenarioIndex((value) => value + 1);
    setScreen(SCREENS.SCENARIO);
  }

  function selectQuizOption(option) {
    if (selectedOption) return;
    setSelectedOption(option);
  }

  async function nextQuiz() {
    if (!selectedOption) return;

    const newAnswers = [
      ...answers,
      { questionId: currentQuiz.id, optionId: selectedOption.id }
    ];
    setAnswers(newAnswers);

    const isLastQuiz = quizIndex >= data.quizQuestions.length - 1;
    if (!isLastQuiz) {
      setQuizIndex((value) => value + 1);
      setSelectedOption(null);
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await api.completeJourney({
        roleSlug: selectedRole.slug,
        choices: selectedChoices,
        answers: newAnswers
      });
      setResult(response);
      setScreen(SCREENS.RESULT);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function openAnalytics() {
    setScreen(SCREENS.ANALYTICS);
    try {
      setAnalyticsLoading(true);
      const response = await api.getAnalytics();
      setAnalytics(response);
    } catch (err) {
      setAnalytics(null);
    } finally {
      setAnalyticsLoading(false);
    }
  }

  function renderScreen() {
    if (loading || error || !data) {
      return <LoadingScreen error={error} onRetry={loadData} />;
    }

    if (screen === SCREENS.LANDING) {
      return <Landing onStart={startJourney} />;
    }

    if (screen === SCREENS.ROLES) {
      return <RoleSelect roles={data.roles} onSelect={selectRole} />;
    }

    if (screen === SCREENS.SCENARIO && currentScenario) {
      return (
        <ScenarioScreen
          scenario={currentScenario}
          currentIndex={scenarioIndex}
          total={data.scenarios.length}
          role={selectedRole}
          onChoose={chooseScenario}
        />
      );
    }

    if (screen === SCREENS.FEEDBACK) {
      return (
        <FeedbackScreen
          choice={lastChoice?.choice}
          scenario={lastChoice?.scenario}
          isLastScenario={scenarioIndex >= data.scenarios.length - 1}
          onNext={nextAfterFeedback}
        />
      );
    }

    if (screen === SCREENS.QUIZ && currentQuiz) {
      return (
        <QuizScreen
          question={currentQuiz}
          currentIndex={quizIndex}
          total={data.quizQuestions.length}
          selectedOption={selectedOption}
          onSelect={selectQuizOption}
          onNext={nextQuiz}
          isSubmitting={isSubmitting}
        />
      );
    }

    if (screen === SCREENS.RESULT) {
      return <ResultScreen result={result} onRestart={restart} />;
    }

    if (screen === SCREENS.ANALYTICS) {
      return <AnalyticsScreen analytics={analytics} loading={analyticsLoading} onBack={() => setScreen(SCREENS.LANDING)} />;
    }

    return <Landing onStart={startJourney} />;
  }

  return (
    <Shell>
      <Header onHome={goHome} onAnalytics={openAnalytics} onRestart={restart} compact={Boolean(error)} />
      {renderScreen()}
    </Shell>
  );
}
