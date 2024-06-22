import { IComponenetProps } from "@/components/codeblock/multi-tab-codeblock";
import { code as apiCode } from "./api";
import { code as formCode } from "./form";
import { code as typesCode } from "./types";

export const jokeExample: IComponenetProps = {
  files: [
    {
      filename: "form.ts",
      language: "tsx",
      code: formCode,
    },
    {
      filename: "api.ts",
      language: "typescript",
      code: apiCode,
    },
    {
      filename: "types.ts",
      language: "typescript",
      code: typesCode,
    },
  ],
};
