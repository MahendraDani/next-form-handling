"use client";
import { CodeBlock } from "@/components/codeblock/code-block";
import { CodeBlockCopyButton } from "@/components/codeblock/copy-button";
import { CodeBlockFileName } from "@/components/codeblock/filename";
import { Container } from "@/components/containers/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const codeString = `export const getUser = async ({id} : {id : string})=>{
  const user = await prisma.users.findUnique({
    where : {
      id
    }
  })
  // some comment
  console.log("Working")
  return user;
}`;

const jsxCodeString = `import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
`;

export default function EditorPage() {
  const [copyCodeString, setCopyCodeString] = useState(codeString);
  return (
    <Container size={"lg"} className="h-[48rem]" variant={"flexCenterRow"}>
      <Tabs
        defaultValue="action.ts"
        onValueChange={(value) => {
          value === "action.ts"
            ? setCopyCodeString(codeString)
            : setCopyCodeString(jsxCodeString);
        }}
      >
        <div className="flex justify-between items-center">
          <TabsList className="w-full flex justify-start items-center gap-1 border-[0.5px] text-sm bg-gray-800">
            <CodeBlockFileName language="typescript" fileName="action.ts" />
            <CodeBlockFileName language="tsx" fileName="form.tsx" />
          </TabsList>
          <CodeBlockCopyButton codeString={copyCodeString} />
        </div>
        <TabsContent value="action.ts">
          <CodeBlock language="typescript" filename="action.ts">
            {copyCodeString}
          </CodeBlock>
        </TabsContent>
        <TabsContent value="form.tsx">
          <CodeBlock language="tsx" filename="form.tsx">
            {copyCodeString}
          </CodeBlock>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
