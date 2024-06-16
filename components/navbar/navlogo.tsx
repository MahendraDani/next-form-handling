import { useUser } from "@/hooks/user-user";
import Link from "next/link";

export const NavLogo = () => {
  const { loggedIn } = useUser();
  return (
    <Link href={loggedIn ? "/feedback" : "/"}>
      <p className="text-xl sm:text-2xl font-semibold">Forms</p>
    </Link>
  );
};
