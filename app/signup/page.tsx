import { getCurrentSession } from "@/lib/auth/session";
import { CreateAccountForm } from "./_components/form";
import { redirect } from "next/navigation";
import { Container } from "@/components/containers/Container";

export default function CreateAccountPage() {
  const session = getCurrentSession();
  if (session.user) {
    redirect("/feedback");
  }
  return (
    <Container className="h-[15rem] bg-gray-800">
      <div>Hello</div>
      <div>Bye</div>
    </Container>
  );
}
