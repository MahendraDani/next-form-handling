import { getCurrentSession } from "@/lib/auth/session";
import { LogoutForm } from "./_components/logout-form";
import { FeedbackForm } from "./_components/feedback-form";
import { database } from "@/lib/services";
import { redirect } from "next/navigation";

export default async function FeedbackPage() {
  const { user } = getCurrentSession();
  if (!user) {
    redirect("/login");
  }
  const { feedback } = await database.feedbacks.getByUserId({
    userId: user.id,
  });
  return (
    <main>
      <div>You should see this page only if you are logged in</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(feedback, null, 2)}</pre>
      <LogoutForm />
      {!feedback && (
        <div className="p-6">
          <FeedbackForm />
        </div>
      )}
    </main>
  );
}
