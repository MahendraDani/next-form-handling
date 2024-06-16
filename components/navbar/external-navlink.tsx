import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface IExternalNavLinkProps {
  href: string;
  name: string;
}
export const ExternalNavLink = ({ href, name }: IExternalNavLinkProps) => {
  return (
    <Link href={href} target="_blank">
      <div className="flex justify-center items-center group">
        <p className="underLine text-gray-500 group-hover:text-gray-300 duration-150 ease-in-out">
          {name}
        </p>
        <ArrowUpRight
          size={"14px"}
          className="text-gray-500 group-hover:text-gray-300"
        />
      </div>
    </Link>
  );
};
