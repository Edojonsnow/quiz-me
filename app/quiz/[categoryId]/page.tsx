import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Quiz } from "@/components/quiz";

export default async function QuizPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data: questions } = await supabase
    .from("questions")
    .select("*")
    .eq("category_id", params.categoryId);

  if (!questions?.length) {
    redirect("/dashboard");
  }

  return (
    <Quiz questions={questions} userId={session.user.id} user={session.user} />
  );
}
