import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlockFileName } from "./filename";
import { CodeBlockCopyButton } from "./copy-button";
import { CodeBlock } from "./code-block";
import { CSSProperties, useState } from "react";

export interface IComponenetProps {
  files: {
    filename: string;
    language: "typescript" | "tsx";
    code: string;
  }[];
  editorStyles?: CSSProperties;
}
export const MultiTabCodeBlock = ({
  files,
  editorStyles,
}: IComponenetProps) => {
  const [copyCodeString, setCopyCodeString] = useState(files[0].code);
  return (
    <Tabs
      className="max-w-[40rem]"
      defaultValue={files[0].filename}
      onValueChange={(value) => {
        for (let i = 0; i < files.length; i++) {
          if (files[i].filename === value) {
            setCopyCodeString(files[i].code);
          }
        }
      }}
    >
      <div
        className={`flex justify-between items-center w-[${editorStyles?.maxWidth}]`}
      >
        <TabsList className="w-full flex justify-start items-center gap-1 border-[0.5px] text-sm bg-gray-800">
          {files.map((file, i) => (
            <CodeBlockFileName
              key={i}
              language={file.language}
              fileName={file.filename}
            />
          ))}
        </TabsList>
        <CodeBlockCopyButton codeString={copyCodeString} />
      </div>
      {files.map((file, i) => (
        <TabsContent key={i} value={file.filename}>
          <CodeBlock
            language={file.language}
            filename={file.filename}
            editorStyles={editorStyles}
          >
            {copyCodeString}
          </CodeBlock>
        </TabsContent>
      ))}
    </Tabs>
  );
};
