import { z } from "zod";

export const ZCreateAccountSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email address" })
    .min(1, { message: "Email is required" })
    .describe("The email address of a new user"),

  password: z
    .string()
    .min(5, { message: "Password should be atleast 5 characters long" })
    .max(255, { message: "Password should not exceed 255 characters" })
    .describe("The password of new user's account")
    .refine(
      (pass) => {
        /**
         * 1. Should contain atleast one uppercase character (A-Z)
         * 2. Should contain atleast one special character (a-z)
         * 3. Should contain alteast one numeric value (1-9)
         * 4. Should contain atleast one special character (!,@,#,$,%,^,&,*,_)
         */
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;
        return passwordRegex.test(pass);
      },
      {
        message:
          "Password should contain atleast one uppercase letter (A-Z), one lowercase letter (a-z), one numeric value, one special character",
      }
    ),
});