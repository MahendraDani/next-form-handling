import { getCurrentSession } from "@/lib/auth/session";
import { CreateAccountForm } from "./components/form";
import { redirect } from "next/navigation";

export default function CreateAccountPage() {
  const session = getCurrentSession();
  if (session.user) {
    redirect("/feedback");
  }
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <CreateAccountForm />
    </main>
  );
}
