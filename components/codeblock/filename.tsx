import Image from "next/image";
import tsIcon from "@/public/icons/ts.svg";
import reactIcon from "@/public/icons/react.svg";
import { TabsTrigger } from "../ui/tabs";

export const CodeBlockFileName = ({
  language,
  fileName,
}: {
  language: "typescript" | "tsx";
  fileName: string;
}) => {
  return (
    <TabsTrigger
      value={fileName}
      className="text-yellow-500 flex justify-start items-center gap-1 hover:bg-black/25"
    >
      {language === "typescript" && (
        <Image src={tsIcon} height={16} width={16} alt="ts icon" />
      )}

      {language === "tsx" && (
        <Image src={reactIcon} height={16} width={16} alt="ts icon" />
      )}

      <span>{fileName}</span>
    </TabsTrigger>
  );
};
