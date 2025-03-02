import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, ScrollView } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/useLanguage";

export default function PlayerNamesScreen() {
  const { count } = useLocalSearchParams<{ count: string }>();
  const playerCount = parseInt(count || "2", 10);
  const [names, setNames] = useState<string[]>(Array(playerCount).fill(""));
  const { t } = useTranslation();
  const { language } = useLanguage();

  // Reset names when player count changes
  useEffect(() => {
    setNames(Array(playerCount).fill(""));
  }, [playerCount]);

  // Set direction based on language
  const isRTL = language === "ar";
  const containerStyle = [styles.container, isRTL ? { direction: "rtl" } : {}];

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const handleContinue = () => {
    if (names.every((name) => name.trim())) {
      router.push({
        pathname: "/(tabs)/game",
        params: { names: JSON.stringify(names) },
      });
    }
  };

  return (
    <ThemedView style={containerStyle}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <ThemedText style={styles.title}>{t("names.title")}</ThemedText>
        {names.map((name, index) => (
          <View key={index} style={styles.inputContainer}>
            <ThemedText style={styles.label}>
              {t("names.playerLabel", { number: index + 1 })}
            </ThemedText>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(value) => handleNameChange(index, value)}
              placeholder={t("names.placeholderName", { number: index + 1 })}
              placeholderTextColor="#666"
            />
          </View>
        ))}
        <TouchableOpacity
          style={[
            styles.button,
            !names.every((name) => name.trim()) && styles.buttonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!names.every((name) => name.trim())}
        >
          <ThemedText style={styles.buttonText}>
            {t("names.continue")}
          </ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 40,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
