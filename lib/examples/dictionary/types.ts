export const code = `export const ZWordFormSchema = z.object({
  word: z
    .string()
    .min(1, { message: "Please enter a word" })
    .regex(/^[^\d]*$/, 
    { message: "Numbers should not be present in word" 
    }),
});

type TActionErrorType =
  | "validationError"
  | "databaseError"
  | "internalError"
  | null;
export interface IPrevState {
  isError: boolean;
  message: string;
  response: any | null;
  errorType: TActionErrorType;
}
`;
