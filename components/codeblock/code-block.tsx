import { Clipboard, Copy } from "lucide-react";
import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CodeBlockCopyButton } from "./copy-button";
import tsIcon from "@/public/icons/ts.svg";
import Image from "next/image";
import reactIcon from "@/public/icons/react.svg";

interface ICodeBlockProps extends SyntaxHighlighterProps {
  filename: string;
}
export const CodeBlock = ({
  filename,
  language,
  children,
  ...props
}: ICodeBlockProps) => {
  return (
    <div>
      <SyntaxHighlighter
        language={language}
        showLineNumbers={true}
        wrapLongLines={true}
        style={atomOneDarkReasonable}
        customStyle={{
          padding: "8px",
          borderRadius: "0 0 8px 8px",
          backgroundColor: "black",
          border: "0.5px solid rgb(31,41,55)",
          minWidth: "45rem",
          maxWidth: "50rem",
          overflowX: "auto",
        }}
        {...props}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
