"use client";

import { Button } from "@/components/ui/button";
import { Brain, Trophy, Users } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function LandingPage() {
  const supabase = createClientComponentClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "twitter",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <a className="flex items-center justify-center" href="#">
          <Brain className="h-6 w-6" />
          <span className="ml-2 text-2xl font-bold">QuizMaster</span>
        </a>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Test Your Knowledge
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Challenge yourself with quizzes across various topics. Compete with others and climb the leaderboard.
                </p>
              </div>
              <Button size="lg" onClick={handleLogin}>
                Sign in with Twitter
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4">
                <Brain className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Multiple Topics</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Choose from various categories and test your knowledge
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Trophy className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Compete</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Challenge yourself and compete with others
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <Users className="h-8 w-8" />
                <h2 className="text-2xl font-bold">Global Leaderboard</h2>
                <p className="text-center text-gray-500 dark:text-gray-400">
                  See how you rank against players worldwide
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 QuizMaster. All rights reserved.
        </p>
      </footer>
    </div>
  );
}