import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="topic"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="names"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="game"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
