import { getCurrentSession } from "@/lib/auth/session";

export default function Home() {
  const session = getCurrentSession();
  return (
    <main>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}
