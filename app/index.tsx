import { Redirect } from "expo-router";

export default function Index() {
  // Redirect to the topic screen when the app opens
  return <Redirect href="/(tabs)/topic" />;
}
