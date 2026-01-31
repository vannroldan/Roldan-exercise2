import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import questions from "./questions";

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const router = useRouter();

  const question = questions[index];
  if (!question) return null; // safety guard

  const selectAnswer = (optionIndex: number) => {
    const updated = [...answers];
    updated[index] = optionIndex;
    setAnswers(updated);
  };

  const next = () => {
    if (answers[index] === undefined) return; // block skipping

    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      const score = answers.reduce(
        (total, ans, i) =>
          ans === questions[i].correctAnswer ? total + 1 : total,
        0
      );

      router.push({
        pathname: "/results",
        params: { score },
      });
    }
  };

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
      {question.options.map((opt, i) => (
        <Pressable
          key={i}
          onPress={() => selectAnswer(i)}
          style={{
            padding: 12,
            marginTop: 10,
            backgroundColor: answers[index] === i ? "#ddd" : "#eee",
            borderRadius: 6,
          }}
        >
          <Text>{opt}</Text>
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
