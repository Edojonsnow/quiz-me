import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Dashboard } from "@/components/dashboard";

export default async function DashboardPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/");
  }

  const { data: categories } = await supabase.from("categories").select("*");

  const { data: scores } = await supabase.from("scores").select("*");

  return (
    <Dashboard
      user={session.user}
      categories={categories || []}
      scores={scores || []}
    />
  );
}
