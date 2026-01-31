import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Quiz App</Text>

      <Pressable
        onPress={() => router.push("/quiz")}
        style={{ backgroundColor: "#4CAF50", padding: 15, borderRadius: 8 }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Start Quiz</Text>
      </Pressable>
    </View>
  );
}
