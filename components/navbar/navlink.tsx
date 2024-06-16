import Link from "next/link";

interface INavLinkProps {
  href: string;
  name: string;
}
export const NavLink = ({ href, name }: INavLinkProps) => {
  return (
    <Link href={href}>
      <div className="underLine text-gray-500 hover:text-gray-300 duration-150 ease-in-out">
        <p>{name}</p>
      </div>
    </Link>
  );
};
