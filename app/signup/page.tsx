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
    <Container className="min-h-[48rem]" variant={"flexCenterRow"}>
      <div>
        <CreateAccountForm />
      </div>
    </Container>
  );
}

{
  /* <section className="w-full blur-[3px] relative hidden sm:block">
<Image
  className="absolute top-[5rem] left-[5rem] pointer-events-none"
  src={"/images/toasts/toast_error.png"}
  height={50}
  width={300}
  alt="toast error"
/>
<Image
  className="absolute top-[10rem] left-[10rem] pointer-events-none"
  src={"/images/toasts/toast_success.png"}
  height={50}
  width={300}
  alt="toast success"
/>

<Image
  className="absolute top-[15rem] left-[15rem] pointer-events-none"
  src={"/images/toasts/toast_info.png"}
  height={50}
  width={300}
  alt="toast info"
/>
<Image
  className="absolute top-[20rem] left-[20rem] pointer-events-none"
  src={"/images/toasts/toast_warning.png"}
  height={50}
  width={300}
  alt="toast warning"
/>
<Image
  className="absolute top-[25rem] left-[25rem] pointer-events-none"
  src={"/images/toasts/toast_info.png"}
  height={50}
  width={300}
  alt="toast info"
/>
<Image
  className="absolute top-[30rem] left-[30rem] pointer-events-none"
  src={"/images/toasts/toast_success.png"}
  height={50}
  width={300}
  alt="toast success"
/>
<Image
  className="absolute top-[35rem] left-[35rem] pointer-events-none"
  src={"/images/toasts/toast_error.png"}
  height={50}
  width={300}
  alt="toast error"
/>
</section> */
}
