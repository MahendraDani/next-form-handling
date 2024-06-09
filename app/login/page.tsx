import { getCurrentSession } from "@/lib/auth/session";
import { LoginForm } from "./components/form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = getCurrentSession();
  if (session.user) {
    redirect("/feedback");
  }
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <LoginForm />
    </main>
  );
}
