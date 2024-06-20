import { IComponenetProps } from "@/components/codeblock/multi-tab-codeblock";
import { code as actionCode } from "./action";
import { code as formCode } from "./form";
import { code as typesCode } from "./types";

export const dictionaryExample: IComponenetProps = {
  files: [
    {
      filename: "action.ts",
      language: "typescript",
      code: actionCode,
    },
    {
      filename: "types.ts",
      language: "typescript",
      code: typesCode,
    },
    {
      filename: "form.ts",
      language: "tsx",
      code: formCode,
    },
  ],
};
