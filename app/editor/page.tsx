import { CodeBlock } from "@/components/codeblock/code-bloc";
import { Container } from "@/components/containers/Container";

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
  return (
    <Container size={"lg"} className="h-[48rem]" variant={"flexCenterRow"}>
      <CodeBlock language="typescript">{codeString}</CodeBlock>
    </Container>
  );
}
