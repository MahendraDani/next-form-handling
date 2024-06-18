import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const CodeBlock = ({
  language,
  children,
  ...props
}: SyntaxHighlighterProps) => {
  return (
    <div className="p-4 font-mono">
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
