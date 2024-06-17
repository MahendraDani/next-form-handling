import { getCurrentSession } from "@/lib/auth/session";
import { CreateAccountForm } from "./_components/form";
import { redirect } from "next/navigation";
import { Container } from "@/components/containers/Container";
import Image from "next/image";

export default function CreateAccountPage() {
  const session = getCurrentSession();
  if (session.user) {
    redirect("/feedback");
  }
  return (
    <Container className="min-h-[45rem]" variant={"flexCenterRow"}>
      <div>
        <CreateAccountForm />
      </div>
    </Container>
  );
}
