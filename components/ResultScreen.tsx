import { useAudioPlayer } from 'expo-audio';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// O arquivo do gol ainda não existe em assets/audio.
// Enquanto isso, mantemos o app carregando sem quebrar o bundle.
// Quando o MP3 estiver presente, substitua a linha abaixo por:
// const golNeymarAudio = require('../assets/audio/gol_neymar_2011.mp3');
const golNeymarAudio = null;

type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  isExpelled?: boolean;
};

function CelebrationBurst() {
  const confetti = useRef(
    Array.from({ length: 16 }, (_, index) => {
      const angle = (index / 16) * Math.PI * 2;
      const radius = 90 + (index % 4) * 18;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      return {
        id: index,
        x,
        y,
        color: ['#d6b25e', '#ffffff', '#0a0a0a', '#1b5e20', '#d71920'][index % 5],
      };
    })
  ).current;

  const animations = useRef(
    confetti.map(() => ({
      translateX: new Animated.Value(0),
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(1),
    }))
  ).current;

  useEffect(() => {
    const currentAnimations = animations.map((animation, index) => {
      const piece = confetti[index];

      Animated.sequence([
        Animated.delay(index * 60),
        Animated.parallel([
          Animated.timing(animation.translateX, {
            toValue: piece.x,
            duration: 1100,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(animation.translateY, {
            toValue: piece.y,
            duration: 1100,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(animation.opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      return animation;
    });

    return () => {
      currentAnimations.forEach((animation) => {
        animation.translateX.stopAnimation();
        animation.translateY.stopAnimation();
        animation.opacity.stopAnimation();
      });
    };
  }, [animations, confetti]);

  return (
    <View pointerEvents="none" style={styles.confettiWrap}>
      {confetti.map((piece, index) => (
        <Animated.View
          key={piece.id}
          style={[
            styles.confettiPiece,
            {
              backgroundColor: piece.color,
              transform: [
                { translateX: animations[index].translateX },
                { translateY: animations[index].translateY },
              ],
              opacity: animations[index].opacity,
            },
          ]}
        />
      ))}
    </View>
  );
}

export default function ResultScreen({ score, totalQuestions, onPlayAgain, isExpelled = false }: ResultScreenProps) {
  const isPerfectScore = score === totalQuestions && !isExpelled;
  const player = useAudioPlayer(golNeymarAudio);

  useEffect(() => {
    if (!isPerfectScore || !golNeymarAudio) {
      return;
    }

    try {
      player.seekTo(0);
      player.play();
    } catch (error) {
      console.warn('Erro ao reproduzir o áudio do gol:', error);
    }

    return () => {
      try {
        player.pause();
        player.remove();
      } catch (error) {
        console.warn('Erro ao liberar o áudio do gol:', error);
      }
    };
  }, [isPerfectScore, player]);

  return (
    <View style={styles.container}>
      {isPerfectScore && <CelebrationBurst />}

      <View style={styles.clubMark}>
        <Text style={styles.clubMarkText}>SFC</Text>
      </View>

      <Text style={styles.kicker}>SANTOS FC</Text>
      <Text style={styles.title}>{isExpelled ? 'EXPULSO!' : isPerfectScore ? 'GABARITOU!' : 'Fim de jogo'}</Text>

      {isExpelled ? (
        <View style={styles.celebrationCard}>
          <Text style={styles.celebrationEmoji}>🟥</Text>
          <Text style={styles.scoreText}>Você foi expulso do campo!</Text>
          <Text style={styles.celebrationText}>"Tente novamente." Você marcou {score} ponto(s) antes da expulsão.</Text>
        </View>
      ) : isPerfectScore ? (
        <View style={styles.celebrationCard}>
          <Text style={styles.celebrationEmoji}>🏆</Text>
          <Text style={styles.scoreText}>Você acertou {score} de {totalQuestions} perguntas!</Text>
          <Text style={styles.celebrationText}>Troféu da Libertadores conquistado: perfeito como o gol do Neymar!</Text>
        </View>
      ) : (
        <Text style={styles.scoreText}>
          Você acertou {score} de {totalQuestions} perguntas!
        </Text>
      )}

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
    zIndex: 2,
  },
  clubMarkText: {
    color: '#111111',
    fontSize: 21,
    fontWeight: '900',
    letterSpacing: 0,
  },
  kicker: {
    color: '#777773',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: 8,
  },
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
  celebrationCard: {
    backgroundColor: '#fffdf4',
    borderWidth: 2,
    borderColor: '#d6b25e',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginBottom: 22,
    width: '100%',
    maxWidth: 360,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  celebrationEmoji: {
    fontSize: 42,
    marginBottom: 10,
  },
  celebrationText: {
    color: '#4b4b48',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
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
  confettiWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  confettiPiece: {
    position: 'absolute',
    width: 10,
    height: 16,
    borderRadius: 4,
    top: '45%',
    left: '50%',
  },
});