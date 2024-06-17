import { getCurrentSession } from "@/lib/auth/session";
import { LoginForm } from "./_components/form";
import { redirect } from "next/navigation";
import { Container } from "@/components/containers/Container";

export default async function LoginPage() {
  const session = getCurrentSession();
  if (session.user) {
    redirect("/feedback");
  }
  return (
    <Container size={"lg"} variant={"flexCenterRow"} className="h-[45rem]">
      <LoginForm />
    </Container>
  );
}
