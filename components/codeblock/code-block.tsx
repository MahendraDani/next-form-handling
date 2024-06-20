import {
  Prism as SyntaxHighlighter,
  SyntaxHighlighterProps,
} from "react-syntax-highlighter";
import { atomOneDarkReasonable } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CSSProperties } from "react";

interface ICodeBlockProps extends SyntaxHighlighterProps {
  filename: string;
  maxWidth?: string;
  minWidth?: string;
  styles?: CSSProperties;
}
export const CodeBlock = ({
  filename,
  language,
  children,
  editorStyles,
  ...props
}: ICodeBlockProps) => {
  return (
    <div>
      <SyntaxHighlighter
        language={language}
        showLineNumbers={true}
        style={atomOneDarkReasonable}
        customStyle={{
          padding: "8px",
          borderRadius: "0 0 8px 8px",
          backgroundColor: "black",
          border: "0.5px solid rgb(31,41,55)",
          overflowX: "auto",
          ...editorStyles,
        }}
        {...props}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
