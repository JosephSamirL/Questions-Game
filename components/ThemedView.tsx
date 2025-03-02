import { View } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";
import { AnimatedGradient } from "./AnimatedGradient";

export function ThemedView(props: any) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View
      style={[
        {
          backgroundColor: "transparent",
          position: "relative",
          zIndex: 1,
          flex: 1,
        },
        style,
      ]}
      {...otherProps}
    >
      <AnimatedGradient />
      {props.children}
    </View>
  );
}
