"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: number;
}

interface QuizProps {
  questions: Question[];
  userId: string;
  user: User;
}

export function Quiz({ questions, userId, user }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleAnswer = async (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const finalScore =
        selectedAnswer === questions[currentQuestion].correct_answer
          ? score + 1
          : score;

      await supabase.from("scores").insert({
        user_id: userId,
        score: finalScore,
        profiles: user.user_metadata.full_name,
      });

      setShowResults(true);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Quiz Complete!
          </h2>
          <p className="text-center text-xl mb-6">
            Your score: {score} out of {questions.length}
          </p>
          <div className="flex justify-center">
            <Button onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-lg p-8">
        <div className="mb-8">
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-gray-500">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        <h2 className="text-xl font-bold mb-6">
          {questions[currentQuestion].question}
        </h2>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full text-left justify-start h-auto py-4 px-6"
              onClick={() => handleAnswer(index)}
            >
              {option}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
