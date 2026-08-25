import { useState } from 'react';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import StartScreen from '../components/StartScreen';
import questions from '../questions.json';

export default function HomePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isExpelled, setIsExpelled] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (option: string) => {
    if (isOptionsDisabled) {
      return;
    }

    const isCorrect = option === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((currentScore) => currentScore + 1);
    } else {
      const nextMistakes = mistakes + 1;
      setMistakes(nextMistakes);

      if (nextMistakes >= 2) {
        setIsExpelled(true);
        setIsQuizFinished(true);
        setSelectedOption(option);
        setIsOptionsDisabled(true);
        return;
      }
    }

    setSelectedOption(option);
    setIsOptionsDisabled(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  // Lógica de reinício agora está implementada
  const handlePlayAgain = () => {
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
    setMistakes(0);
    setIsExpelled(false);
  };

  if (!hasStarted) {
    return <StartScreen onStart={() => setHasStarted(true)} />;
  }

  return isQuizFinished ? (
    <ResultScreen
      score={score}
      totalQuestions={questions.length}
      onPlayAgain={handlePlayAgain}
      isExpelled={isExpelled}
    />
  ) : (
    <QuizScreen
      currentQuestion={currentQuestion}
      questionNumber={currentQuestionIndex + 1}
      score={score}
      mistakes={mistakes}
      selectedOption={selectedOption}
      isOptionsDisabled={isOptionsDisabled}
      onOptionPress={handleOptionPress}
      onNextQuestion={handleNextQuestion}
    />
  );
}