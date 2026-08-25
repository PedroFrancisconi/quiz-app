import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type StartScreenProps = {
  onStart: () => void;
};

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.waterGlow} />
      <Text style={[styles.seaCreature, styles.whaleOne]}>🐋</Text>
      <Text style={[styles.seaCreature, styles.fishOne]}>🐟</Text>
      <Text style={[styles.seaCreature, styles.fishTwo]}>🐠</Text>
      <Text style={[styles.seaCreature, styles.whaleTwo]}>🐋</Text>

      <View style={styles.content}>
        <Text style={styles.eyebrow}>DESDE 1912 • VILA BELMIRO</Text>

        <View style={styles.crestOuter}>
          <View style={styles.crestInner}>
            <Text style={styles.crestBottom}>SFC</Text>
          </View>
        </View>

        <Text style={styles.title}>QUIZ DO</Text>
        <Text style={styles.clubName}>SANTOS</Text>
        <Text style={styles.tagline}>O desafio do Peixe começa agora.</Text>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel="Iniciar quiz do Santos"
          style={styles.startButton}
          onPress={onStart}
          activeOpacity={0.85}
        >
          <Text style={styles.startButtonText}>INICIAR QUIZ</Text>
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>28 perguntas sobre a história alvinegra</Text>
      </View>

      <View style={styles.wave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#071a2c',
  },
  waterGlow: {
    position: 'absolute',
    top: '12%',
    left: '-18%',
    width: '136%',
    height: '48%',
    borderRadius: 260,
    backgroundColor: '#0b3150',
    opacity: 0.7,
    transform: [{ rotate: '-8deg' }],
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingBottom: 28,
  },
  eyebrow: {
    color: '#8fc9d4',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 20,
  },
  crestOuter: {
    width: 118,
    height: 138,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 5,
    borderColor: '#c9a34e',
    borderRadius: 16,
    transform: [{ rotate: '45deg' }],
    marginBottom: 28,
  },
  crestInner: {
    width: 88,
    height: 108,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#071a2c',
    transform: [{ rotate: '-45deg' }],
  },
  crestTop: {
    color: '#071a2c',
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 36,
  },
  crestBottom: {
    color: '#c9a34e',
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 25,
  },
  title: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '800',
    letterSpacing: 5,
  },
  clubName: {
    color: '#ffffff',
    fontSize: 54,
    fontWeight: '900',
    letterSpacing: 3,
    lineHeight: 60,
  },
  tagline: {
    color: '#b9d6dc',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 30,
  },
  startButton: {
    minWidth: 236,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingVertical: 17,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    borderBottomWidth: 5,
    borderBottomColor: '#c9a34e',
  },
  startButtonText: {
    color: '#071a2c',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  arrow: {
    color: '#c9a34e',
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 24,
  },
  footer: {
    color: '#6e9aa9',
    fontSize: 12,
    marginTop: 22,
    letterSpacing: 0.5,
  },
  seaCreature: {
    position: 'absolute',
    opacity: 0.72,
  },
  whaleOne: { top: '15%', right: '6%', fontSize: 40 },
  whaleTwo: { bottom: '13%', left: '5%', fontSize: 30, opacity: 0.45 },
  fishOne: { top: '30%', left: '8%', fontSize: 25, transform: [{ rotate: '-15deg' }] },
  fishTwo: { bottom: '28%', right: '10%', fontSize: 22, opacity: 0.5 },
  wave: {
    position: 'absolute',
    bottom: -78,
    left: -30,
    width: '120%',
    height: 135,
    borderRadius: 100,
    backgroundColor: '#0d3d5c',
    transform: [{ rotate: '-4deg' }],
  },
});