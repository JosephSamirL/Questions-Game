import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#f5f5f5",
        },
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTintColor: "#006AFF",
      }}
    >
      <Stack.Screen
        name="topic"
        options={{
          title: t("screens.topicSelection"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          title: t("screens.playerSelection"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="names"
        options={{
          title: t("screens.nameSelection"),
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="game"
        options={{
          title: t("screens.game"),
          headerShown: true,
        }}
      />
    </Stack>
  );
}
