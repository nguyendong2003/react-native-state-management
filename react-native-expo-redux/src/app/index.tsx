import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  // Shared values for animations
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.3);

  useEffect(() => {
    // Initial entry animations
    scale.value = withSpring(1, { damping: 15, stiffness: 100 });
    opacity.value = withTiming(1, { duration: 800 });

    // Continuous rotation for background decor elements
    rotation.value = withRepeat(
      withTiming(360, { duration: 30000, easing: Easing.linear }),
      -1,
      false
    );

    // Subtle pulsing for the glow effect
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 3000, easing: Easing.ease }),
        withTiming(0.2, { duration: 3000, easing: Easing.ease })
      ),
      -1,
      true
    );
  }, []);

  // Animated styles
  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const decorAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const glowAnimatedStyle1 = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value,
    };
  });

  const glowAnimatedStyle2 = useAnimatedStyle(() => {
    return {
      opacity: glowOpacity.value * 0.8,
    };
  });

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95, { damping: 10, stiffness: 300 });
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, { damping: 10, stiffness: 300 });
  };

  const handlePress = () => {
    // Playful bounce on tap
    scale.value = withSequence(
      withSpring(1.03, { damping: 8, stiffness: 400 }),
      withSpring(1, { damping: 15, stiffness: 200 })
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Background Soft Glows */}
      <Animated.View style={[styles.glowBlob1, glowAnimatedStyle1]} />
      <Animated.View style={[styles.glowBlob2, glowAnimatedStyle2]} />

      {/* Decorative Rotating Pattern */}
      <Animated.View style={[styles.decorContainer, decorAnimatedStyle]}>
        <View style={styles.decorRing} />
        <View style={styles.decorDot} />
      </Animated.View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ANTIGRAVITY</Text>
        </View>

        <Animated.View style={[styles.card, cardAnimatedStyle]}>
          {/* Top Emoji Badge */}
          <View style={styles.emojiContainer}>
            <Text style={styles.emoji}>🚀</Text>
          </View>

          {/* Hello World Text */}
          <Text style={styles.title}>Hello World</Text>
          <Text style={styles.subtitle}>
            Welcome to your clean React Native & Expo workspace. Every redundant line of code has been stripped away.
          </Text>

          {/* Action Button */}
          <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            style={styles.buttonFrame}
          >
            <Animated.View style={[styles.button, buttonAnimatedStyle]}>
              <Text style={styles.buttonText}>Get Started</Text>
            </Animated.View>
          </Pressable>
        </Animated.View>

        <Text style={styles.footer}>Ready to build something amazing.</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A13',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  glowBlob1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(59, 130, 246, 0.4)',
    top: '15%',
    left: '-10%',
  },
  glowBlob2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(139, 92, 246, 0.35)',
    bottom: '15%',
    right: '-10%',
  },
  decorContainer: {
    position: 'absolute',
    width: width * 1.4,
    height: width * 1.4,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.15,
  },
  decorRing: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    borderStyle: 'dashed',
  },
  decorDot: {
    position: 'absolute',
    top: width * 0.3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#818cf8',
  },
  safeArea: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6366f1',
    letterSpacing: 4,
  },
  card: {
    marginTop: 'auto',
    marginBottom: 'auto',
    width: '100%',
    maxWidth: 380,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 8,
  },
  emojiContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emoji: {
    fontSize: 26,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  buttonFrame: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 54,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#070A13',
  },
  footer: {
    fontSize: 12,
    color: '#475569',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
