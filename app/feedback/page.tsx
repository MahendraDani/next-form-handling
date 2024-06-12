import { getCurrentSession } from "@/lib/auth/session";
import { LogoutForm } from "./_components/logout-form";
import { FeedbackForm } from "./_components/feedback-form";

export default function FeedbackPage() {
  const { user } = getCurrentSession();
  return (
    <main>
      <div>You should see this page only if you are logged in</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <LogoutForm />
      <div className="p-6">
        <FeedbackForm />
      </div>
    </main>
  );
}
