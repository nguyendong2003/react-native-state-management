import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
import Filters from '../components/Filters';
import TodoList from '../components/TodoList';
import { FilterProvider } from '../context/FilterContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  // Shared values for animations
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);
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
  const contentAnimatedStyle = useAnimatedStyle(() => {
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
          <Text style={styles.headerTitle}>TODO APP WITH TANSTACK QUERY</Text>
        </View>

        <Animated.View style={[styles.contentContainer, contentAnimatedStyle]}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoid}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
          >
            <FilterProvider>
              <Filters />
              <TodoList />
            </FilterProvider>
          </KeyboardAvoidingView>
        </Animated.View>

        <Text style={styles.footer}>TanStack Query State Management</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070A13',
    overflow: 'hidden',
  },
  glowBlob1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(59, 130, 246, 0.35)',
    top: '10%',
    left: '-10%',
  },
  glowBlob2: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    bottom: '10%',
    right: '-10%',
  },
  decorContainer: {
    position: 'absolute',
    width: width * 1.4,
    height: width * 1.4,
    top: '15%',
    left: -width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.1,
  },
  decorRing: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: (width * 0.9) / 2,
    borderWidth: 1.5,
    borderColor: '#ffffff',
    borderStyle: 'dashed',
  },
  decorDot: {
    position: 'absolute',
    top: width * 0.25,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#818cf8',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  header: {
    alignItems: 'center',
    marginVertical: 12,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6366f1',
    letterSpacing: 4,
  },
  contentContainer: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'space-between',
  },
  footer: {
    fontSize: 11,
    color: '#475569',
    textAlign: 'center',
    marginTop: 10,
    letterSpacing: 0.5,
  },
});
