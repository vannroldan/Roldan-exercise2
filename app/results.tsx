import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function Results() {
  const { score } = useLocalSearchParams();
  const numScore = typeof score === "string" ? parseInt(score) : score;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22 }}>Your Score</Text>
      <Text style={{ fontSize: 32, marginVertical: 10 }}>{numScore}</Text>

      <Pressable
        onPress={() => router.replace("/")}
        style={{ padding: 15, backgroundColor: "#4CAF50" }}
      >
        <Text style={{ color: "white" }}>Back to Home</Text>
      </Pressable>
    </View>
  );
}
