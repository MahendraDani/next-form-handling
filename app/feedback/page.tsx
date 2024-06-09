import { getCurrentSession } from "@/lib/auth/session";

export default function FeedbackPage() {
  const { user } = getCurrentSession();
  return (
    <main>
      <div>You should see this page only if you are logged in</div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </main>
  );
}
