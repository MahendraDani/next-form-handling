import { getCurrentSession } from "@/lib/auth/session";
import { FeedbackForm } from "./_components/feedback-form";
import { database } from "@/lib/services";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export default async function FeedbackPage() {
  noStore();
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
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(feedback, null, 2)}</pre> */}
      {!feedback && (
        <div className="p-6">
          <FeedbackForm />
        </div>
      )}
    </main>
  );
}
