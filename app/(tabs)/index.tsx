import React, { useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { router, usePathname } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AnimatedGradient } from "@/components/AnimatedGradient";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/useLanguage";
import { useTopicContext } from "@/hooks/useTopicContext";

const PLAYER_COUNTS = [2, 3, 4, 5, 6, 7, 8];

export default function HomeScreen() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { questions } = useTopicContext();
  const pathname = usePathname();

  // Check if we have questions selected, if not, redirect to topic screen
  // But we only want to do this check once when the component mounts
  useEffect(() => {
    // Don't redirect automatically, let the topic screen handle this flow
    // if (questions.length === 0) {
    //   router.replace("/(tabs)/topic");
    // }
  }, []);

  // Set direction based on language
  const isRTL = language === "ar";
  const containerStyle = [styles.container, isRTL ? { direction: "rtl" } : {}];

  const handlePlayerCountSelect = (count: number) => {
    router.push({
      pathname: "/(tabs)/names",
      params: { count: count.toString() },
    });
  };

  return (
    <ThemedView style={containerStyle}>
      <AnimatedGradient />
      <ThemedText style={styles.title}>{t("home.title")}</ThemedText>
      <ThemedText style={styles.subtitle}>{t("home.subtitle")}</ThemedText>
      <View style={styles.buttonGrid}>
        {PLAYER_COUNTS.map((count) => (
          <TouchableOpacity
            key={count}
            style={styles.button}
            onPress={() => handlePlayerCountSelect(count)}
          >
            <ThemedText style={styles.buttonText}>{count}</ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    textAlign: "center",
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    textAlign: "center",
  },
  buttonGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: Platform.select({ ios: 15, android: 20 }),
    paddingHorizontal: Platform.select({ ios: 0, android: 10 }),
  },
  button: {
    backgroundColor: "#2196F3",
    width: Platform.select({ ios: 70, android: 70 }),
    height: Platform.select({ ios: 70, android: 70 }),
    borderRadius: Platform.select({ ios: 35, android: 35 }),
    justifyContent: "center",
    alignItems: "center",
    elevation: Platform.select({ ios: 0, android: 4 }),
    margin: Platform.select({ ios: 0, android: 5 }),
  },
  buttonText: {
    color: "white",
    fontSize: Platform.select({ ios: 24, android: 24 }),
    fontWeight: "bold",
  },
});
