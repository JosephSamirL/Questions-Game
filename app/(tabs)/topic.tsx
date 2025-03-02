import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Platform } from "react-native";
import { router } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { AnimatedGradient } from "@/components/AnimatedGradient";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/useLanguage";
import { useTopicContext } from "@/hooks/useTopicContext";

// Import the English question data sets
import generalQuestions from "@/constants/questions/general.json";
import scienceQuestions from "@/constants/questions/science.json";
import entertainmentQuestions from "@/constants/questions/entertainment.json";
import sportsQuestions from "@/constants/questions/sports.json";
import historyQuestions from "@/constants/questions/history.json";

// Import the Arabic question data sets
import generalQuestionsAr from "@/constants/questions/general_ar.json";
import scienceQuestionsAr from "@/constants/questions/science_ar.json";
import entertainmentQuestionsAr from "@/constants/questions/entertainment_ar.json";
import sportsQuestionsAr from "@/constants/questions/sports_ar.json";
import historyQuestionsAr from "@/constants/questions/history_ar.json";

export default function TopicScreen() {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const { selectedTopic, setSelectedTopic, questions, setQuestions } =
    useTopicContext();

  // Use Arabic questions if language is Arabic, otherwise use English
  const isArabic = language === "ar";

  // Topic options with their corresponding question sets based on language
  const TOPICS = [
    {
      id: "general",
      questions: isArabic ? generalQuestionsAr : generalQuestions,
    },
    {
      id: "science",
      questions: isArabic ? scienceQuestionsAr : scienceQuestions,
    },
    {
      id: "entertainment",
      questions: isArabic ? entertainmentQuestionsAr : entertainmentQuestions,
    },
    {
      id: "sports",
      questions: isArabic ? sportsQuestionsAr : sportsQuestions,
    },
    {
      id: "history",
      questions: isArabic ? historyQuestionsAr : historyQuestions,
    },
  ];

  // When the screen loads or language changes, make sure we have a default topic set
  useEffect(() => {
    // Reload questions for the current selected topic whenever language changes
    if (selectedTopic) {
      const currentTopic = TOPICS.find((topic) => topic.id === selectedTopic);
      if (currentTopic) {
        setQuestions(currentTopic.questions);
      } else {
        // If no topic is selected or topic not found, set default
        const defaultTopic = TOPICS[0];
        setSelectedTopic(defaultTopic.id as any);
        setQuestions(defaultTopic.questions);
      }
    } else {
      // If no topic is selected at all, set default
      const defaultTopic = TOPICS[0];
      setSelectedTopic(defaultTopic.id as any);
      setQuestions(defaultTopic.questions);
    }
  }, [language, selectedTopic]);

  const handleTopicSelect = (topicId: string) => {
    // Find the selected topic
    const selectedTopic = TOPICS.find((topic) => topic.id === topicId);
    if (selectedTopic) {
      // Set the selected topic in context
      setSelectedTopic(selectedTopic.id as any);
      // Set the questions for the selected topic
      setQuestions(selectedTopic.questions);

      // Navigate to the player count selection screen (home screen)
      // Use push instead of replace to ensure we can go back
      router.push("/(tabs)/");
    }
  };

  // Set direction based on language
  const isRTL = language === "ar";
  const containerStyle = [styles.container, isRTL ? { direction: "rtl" } : {}];

  return (
    <ThemedView style={containerStyle}>
      <AnimatedGradient />
      <ThemedText style={styles.title}>{t("topic.pageTitle")}</ThemedText>

      <View style={styles.topicGrid}>
        {TOPICS.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={styles.topicButton}
            onPress={() => handleTopicSelect(topic.id)}
          >
            <ThemedText style={styles.topicText}>
              {t(`topic.${topic.id}`)}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.languageButton} onPress={toggleLanguage}>
        <ThemedText style={styles.languageButtonText}>
          {t("topic.languageSwitch")}
        </ThemedText>
      </TouchableOpacity>
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
    marginBottom: 40,
    textAlign: "center",
    lineHeight: 34,
  },
  topicGrid: {
    width: "90%",
    gap: 15,
    alignItems: "stretch",
  },
  topicButton: {
    backgroundColor: "#2196F3",
    padding: 18,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  topicText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  languageButton: {
    marginTop: 40,
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  languageButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
