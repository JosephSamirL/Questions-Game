import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ThemedView } from "../../components/ThemedView";
import { ThemedText } from "../../components/ThemedText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTopicContext } from "@/hooks/useTopicContext";
import { useTranslation } from "react-i18next";

export default function GameScreen() {
  const { names: namesParam } = useLocalSearchParams<{ names: string }>();
  const names = JSON.parse(namesParam || "[]");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [remainingPlayers, setRemainingPlayers] = useState<string[]>([]);
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set());
  const { questions, setSelectedTopic, setQuestions } = useTopicContext();
  const { t } = useTranslation();

  // Check if questions are available when the component mounts
  useEffect(() => {
    if (!questions || questions.length === 0) {
      Alert.alert("No Questions Selected", "Please select a topic first", [
        {
          text: "OK",
          onPress: () => router.replace("/(tabs)/topic"),
        },
      ]);
    } else {
      handleNextQuestion();
    }
  }, []);

  const getRandomQuestion = () => {
    // If no questions are available from the topic, use a default message
    if (!questions || questions.length === 0) {
      return t("game.noQuestions");
    }

    const availableQuestions = questions.filter(
      (_, index) => !usedQuestions.has(index)
    );
    if (availableQuestions.length === 0) {
      setUsedQuestions(new Set());
      return questions[Math.floor(Math.random() * questions.length)];
    }
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const originalIndex = questions.indexOf(availableQuestions[randomIndex]);
    setUsedQuestions(new Set([...usedQuestions, originalIndex]));
    return availableQuestions[randomIndex];
  };

  const getNextPlayer = () => {
    if (remainingPlayers.length === 0) {
      setRemainingPlayers([...names]);
      return names[Math.floor(Math.random() * names.length)];
    }
    const randomIndex = Math.floor(Math.random() * remainingPlayers.length);
    const player = remainingPlayers[randomIndex];
    setRemainingPlayers(
      remainingPlayers.filter((_, index) => index !== randomIndex)
    );
    return player;
  };

  const handleNextQuestion = () => {
    if (names.length === 0) {
      // If no player names, redirect to names page
      router.replace("/(tabs)/");
      return;
    }
    setCurrentQuestion(getRandomQuestion());
    setCurrentPlayer(getNextPlayer());
  };

  const handleExit = () => {
    // Navigate back to the home screen (player selection)
    router.replace("/(tabs)/");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.playerName}>
        {t("game.playerTurn", { player: currentPlayer })}
      </ThemedText>
      <View style={styles.questionContainer}>
        <ThemedText style={styles.question}>{currentQuestion}</ThemedText>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNextQuestion}>
          <ThemedText style={styles.buttonText}>
            {t("game.nextQuestion")}
          </ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.exitButton]}
          onPress={handleExit}
        >
          <ThemedText style={styles.buttonText}>
            {t("game.exitGame")}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollView: {
    flex: 1,
  },
  playerName: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 25,
    paddingHorizontal: 10,
    lineHeight: 34,
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(245, 245, 245, 0.1)",
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    minHeight: 200,
    maxHeight: "40%",
    overflow: "scroll",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  question: {
    fontSize: 24,
    textAlign: "center",
    lineHeight: 32,
    flexShrink: 1,
    flexWrap: "wrap",
    width: "100%",
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
  },
  exitButton: {
    backgroundColor: "#ff4444",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});
