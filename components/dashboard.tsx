"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, LogOut, Trophy } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  description: string;
}

interface Profile {
  username: string;
  avatar_url: string;
}

interface Score {
  id: number;
  user_id: string;
  score: number;
  profiles: string;
}

interface DashboardProps {
  user: User;
  categories: Category[];
  scores: Score[];
}

export function Dashboard({ user, categories, scores }: DashboardProps) {
  const router = useRouter();
  const supabase = createClientComponentClient();
  // const [leaderboard, setLeaderboard] = useState<Score[]>([]);

  const handleStartQuiz = (categoryId: number) => {
    router.push(`/quiz/${categoryId}`);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  console.log(scores);

  // useEffect(() => {
  //   const fetchScores = async () => {
  //     const { data: scores, error } = await supabase
  //       .from("scores")
  //       .select("*")
  //       .order("score", { ascending: false });

  //     if (error) {
  //       console.error("Error fetching scores:", error);
  //       return;
  //     }

  //     console.log("Fetched scores:", scores);
  //     setLeaderboard(scores);
  //   };

  //   fetchScores();
  // }, [supabase]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <a className="flex items-center justify-center" href="#">
          <Brain className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">QuizMaster</span>
        </a>
        <Button variant="ghost" size="icon" onClick={handleSignOut}>
          <LogOut className="h-5 w-5" />
        </Button>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs defaultValue="categories">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>
          <TabsContent value="categories">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Card key={category.id} className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {category.description}
                  </p>
                  <Button onClick={() => handleStartQuiz(category.id)}>
                    Start Quiz
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="leaderboard">
            <Card>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold">Global Leaderboard</h2>
                </div>
                <div className="space-y-4">
                  {scores.map((entry, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold min-w-8">
                          #{index + 1}
                        </span>

                        <h1 className="font-medium">{entry.profiles}</h1>
                      </div>
                      <span className="text-lg font-bold">{entry.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
