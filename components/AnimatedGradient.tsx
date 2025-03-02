import React, { useEffect } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

export const AnimatedGradient = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 3000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 0.5, 1],
        ["#4a9eff", "#8f7fff", "#4a9eff"]
      ),
    };
  });

  return <Animated.View style={[styles.gradient, animatedStyle]} />;
};

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    width,
    height,
    opacity: 0.15,
    zIndex: -1,
    top: 0,
    left: 0,
  },
});
