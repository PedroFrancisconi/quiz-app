import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Usando TypeScript para definir os "tipos" de props que esperamos receber
type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void; // Esperamos receber uma função para o botão
};

export default function ResultScreen({ score, totalQuestions, onPlayAgain }: ResultScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.clubMark}>
        <Text style={styles.clubMarkText}>SFC</Text>
      </View>
      <Text style={styles.kicker}>SANTOS FC</Text>
      <Text style={styles.title}>Fim de jogo</Text>
      <Text style={styles.scoreText}>
        Você acertou {score} de {totalQuestions} perguntas!
      </Text>

      <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
        <Text style={styles.buttonText}>Jogar Novamente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f2',
    padding: 24,
  },
  clubMark: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderColor: '#d6b25e',
    marginBottom: 18,
  },
  clubMarkText: { color: '#111111', fontSize: 21, fontWeight: '900', letterSpacing: 0 },
  kicker: { color: '#777773', fontSize: 13, fontWeight: '900', letterSpacing: 0, marginBottom: 8 },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#111111',
    letterSpacing: 0,
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 40,
    color: '#4b4b48',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#111111',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 4,
    borderBottomWidth: 4,
    borderBottomColor: '#d6b25e',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});