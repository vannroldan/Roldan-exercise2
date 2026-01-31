import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { questions } from "./questions";

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  const question = questions[index];
  if (!question) return null; // safety guard

  const selectAnswer = (choiceKey: string) => {
    const updated = [...answers];
    updated[index] = choiceKey;
    setAnswers(updated);
  };

  const next = () => {
    if (answers[index] === undefined) return; // block skipping

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      const score = answers.reduce(
        (total, ans, i) =>
          ans === questions[i].answer ? total + 1 : total,
        0
      );

      router.push({
        pathname: "/results",
        params: { score },
      });
    }
  };

  const choiceEntries = Object.entries(question.choices);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* Progress */}
      <Text style={{ marginBottom: 10, color: "#666" }}>
        Question {index + 1} of {questions.length}
      </Text>

      {/* Question */}
      <Text style={{ fontSize: 20, marginBottom: 10 }}>
        {question.question}
      </Text>

      {/* Options */}
      {choiceEntries.map(([key, value]) => (
        <Pressable
          key={key}
          onPress={() => selectAnswer(key)}
          style={{
            padding: 12,
            marginTop: 10,
            backgroundColor: answers[index] === key ? "#007AFF" : "#eee",
            borderRadius: 6,
          }}
        >
          <Text style={{ color: answers[index] === key ? "white" : "black" }}>
            {key}. {value}
          </Text>
        </Pressable>
      ))}

      {/* Next / Finish */}
      <Pressable
        onPress={next}
        disabled={answers[index] === undefined}
        style={{
          marginTop: 20,
          backgroundColor:
            answers[index] === undefined ? "#aaa" : "#2196F3",
          padding: 15,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {index === questions.length - 1 ? "Finish" : "Next"}
        </Text>
      </Pressable>
    </View>
  );
}
