// components/QuizScreen.tsx

import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Definimos o formato de um objeto de pergunta para reutilizar o tipo
type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

// Definimos o formato exato das props que o componente espera
type QuizScreenProps = {
  currentQuestion: Question;
  questionNumber: number;
  score: number;
  mistakes: number;
  selectedOption: string | null;
  isOptionsDisabled: boolean;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
};

// Aplicamos a tipagem aqui na assinatura da função
export default function QuizScreen({
  currentQuestion,
  questionNumber,
  score,
  mistakes,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
}: QuizScreenProps) {

  const getOptionStyle = (option: string) => {
    if (selectedOption) {
      const isCorrect = option === currentQuestion.correctAnswer;
      if (isCorrect) {
        return styles.correctOption;
      }
      if (option === selectedOption && !isCorrect) {
        return styles.incorrectOption;
      }
    }
    return {};
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator
    >
      <View style={styles.header}>
        <View style={styles.clubMark}>
          <Text style={styles.clubMarkText}>SFC</Text>
        </View>
        <View>
          <Text style={styles.clubName}>SANTOS FC</Text>
          <Text style={styles.subtitle}>QUIZ ALVINEGRO</Text>
        </View>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>PLACAR</Text>
        <Text style={styles.scoreText}>Pontos: {score}</Text>
      </View>

      <View style={styles.cardsContainer}>
        <Text style={styles.cardsLabel}>CARTÕES</Text>
        <View style={styles.cardsRow}>
          {Array.from({ length: 2 }, (_, index) => {
            const isFirstYellow = index === 0 && mistakes >= 1;
            const isSecondRed = index === 1 && mistakes >= 2;
            const isSecondYellow = index === 1 && mistakes === 1;

            return (
              <View
                key={`card-${index}`}
                style={[
                  styles.card,
                  isFirstYellow && styles.yellowCard,
                  isSecondRed && styles.redCard,
                  isSecondYellow && styles.yellowCard,
                  !isFirstYellow && !isSecondRed && !isSecondYellow && styles.emptyCard,
                ]}
              >
                <Text style={styles.cardText}>
                  {isSecondRed ? '🟥' : isFirstYellow || isSecondYellow ? '🟨' : '•'}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {selectedOption && !currentQuestion.options.includes(selectedOption) ? null : null}

      {selectedOption && (
        <Text style={styles.warningText}>
          {mistakes === 1
            ? '1º cartão amarelo! Cuidado!'
            : mistakes === 2
              ? '2º cartão: vermelho! Você foi expulso!'
              : ''}
        </Text>
      )}

      <View style={styles.questionContainer}>
        <Text style={styles.questionNumber}>Pergunta {questionNumber}</Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, getOptionStyle(option)]}
            onPress={() => onOptionPress(option)}
            disabled={isOptionsDisabled}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedOption && (
        <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion}>
          <Text style={styles.nextButtonText}>Próxima Pergunta</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f4f2' },
  contentContainer: { flexGrow: 1, padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#111111', padding: 16, borderRadius: 4, borderBottomWidth: 4, borderBottomColor: '#d6b25e', marginBottom: 22 },
  clubMark: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center', marginRight: 13, borderWidth: 3, borderColor: '#d6b25e' },
  clubMarkText: { color: '#111111', fontSize: 14, fontWeight: '900', letterSpacing: 0 },
  clubName: { color: '#ffffff', fontSize: 21, fontWeight: '900', letterSpacing: 0 },
  subtitle: { color: '#d6b25e', fontSize: 11, fontWeight: '700', marginTop: 3, letterSpacing: 0 },
  scoreContainer: { alignItems: 'flex-end', marginBottom: 12 },
  scoreLabel: { color: '#777773', fontSize: 11, fontWeight: '800', letterSpacing: 0, marginBottom: 2 },
  scoreText: { fontSize: 18, fontWeight: '900', color: '#111111', letterSpacing: 0 },
  cardsContainer: { marginBottom: 18 },
  cardsLabel: { color: '#777773', fontSize: 11, fontWeight: '800', letterSpacing: 0, marginBottom: 8 },
  cardsRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  card: { width: 42, height: 56, borderRadius: 10, alignItems: 'center', justifyContent: 'center', borderWidth: 2 },
  emptyCard: { backgroundColor: '#e7e7e5', borderColor: '#d6d6d2' },
  yellowCard: { backgroundColor: '#f4d35e', borderColor: '#d6b25e' },
  redCard: { backgroundColor: '#d83d3d', borderColor: '#a82323' },
  cardText: { fontSize: 22 },
  warningText: { fontSize: 15, fontWeight: '700', color: '#8c2b2b', textAlign: 'center', marginBottom: 18 },
  questionContainer: { flex: 1, backgroundColor: '#ffffff', borderRadius: 4, padding: 20, justifyContent: 'center', marginBottom: 20, borderLeftWidth: 5, borderLeftColor: '#111111', shadowColor: '#111111', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  questionNumber: { fontSize: 14, fontWeight: '900', textAlign: 'center', color: '#d6b25e', marginBottom: 12, letterSpacing: 0 },
  questionText: { fontSize: 21, fontWeight: '800', textAlign: 'center', color: '#171717', lineHeight: 29, letterSpacing: 0 },
  optionsContainer: { flex: 1, justifyContent: 'space-around' },
  option: { backgroundColor: '#ffffff', padding: 16, borderRadius: 4, borderWidth: 2, borderColor: '#deded9', minHeight: 58, justifyContent: 'center' },
  optionText: { fontSize: 17, color: '#242424', fontWeight: '600', letterSpacing: 0 },
  correctOption: { borderColor: '#2f7d4a', backgroundColor: '#e2f1e5', borderWidth: 2 },
  incorrectOption: { borderColor: '#b33a3a', backgroundColor: '#f7e2e2', borderWidth: 2 },
  nextButton: { backgroundColor: '#111111', padding: 16, borderRadius: 4, marginTop: 20, alignItems: 'center', borderBottomWidth: 4, borderBottomColor: '#d6b25e' },
  nextButtonText: { color: '#ffffff', fontSize: 17, fontWeight: '900', letterSpacing: 0 },
});