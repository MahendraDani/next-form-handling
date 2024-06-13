"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getCookie } from "cookies-next";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { isValidLinkedinUrl, isValidTwitterUrl } from "@/lib/valid-urls";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { getCurrentSession } from "@/lib/auth/session";
import jwt from "jsonwebtoken";
import { decodeJWT, verifyJWT } from "@/lib/auth/jwt";
import { getClientSession } from "@/lib/auth/client";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { FormButton } from "@/components/ui/buttons/form-button";

const formSchema = z.object({
  makePublic: z.boolean().default(false).optional(),
  feedback: z
    .string()
    .min(1, { message: "Feedback field can not be empty" })
    .max(1000, { message: "Feedback should not exceed 1000 characters" })
    .describe("The feedback of user"),
});

export const FinalFeedbackForm = ({ currentStep }: { currentStep: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  // const nextStep = parseInt(currentStep) + 1;
  // const prevStep = parseInt(currentStep) - 1;

  const [initialValues, setInitialValues] = useState({
    feedback: "",
    makePublic: true,
  });

  useEffect(() => {
    const feedback = localStorage.getItem("feedback") as string;
    const makePublic = localStorage.getItem("makePublic") ? true : false;

    setInitialValues({ feedback, makePublic });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);

  async function onSubmit({
    makePublic,
    feedback,
  }: z.infer<typeof formSchema>) {
    // localStorage.setItem("makePublic", makePublic ? "true" : "false");
    // localStorage.setItem("feedback", feedback as string);
    const name = localStorage.getItem("name") as string;
    const occupation = localStorage.getItem("occupation") as string;
    const githubUrl = localStorage.getItem("githubUrl") as string;
    const twitterUrl = localStorage.getItem("twitterUrl") as string;
    const linkedinUrl = localStorage.getItem("linkedinUrl") as string;

    const { user } = getClientSession();

    const res = await fetch("/api/feedbacks", {
      method: "POST",
      body: JSON.stringify({
        name,
        occupation,
        githubUrl,
        twitterUrl,
        linkedinUrl,
        userId: user.id,
        makePublic,
        feedback,
      }),
    });

    const response = await res.json();

    // if (res.status === 400) {
    //   toast.error(response.error.message);
    //   return;
    // }

    console.log(res);
    console.log(response);
    if (res.status !== 200) {
      toast.error(response.error.message);
    } else {
      toast.success("Feedback submitted successfully");
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isSubmitting} className="py-4 space-y-4">
          <FormField
            control={form.control}
            name="feedback"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your opinion</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="I think..."
                    maxLength={1000}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="makePublic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Go public</FormLabel>
                  <FormDescription>
                    By allowing you let us show your feedback in our
                    testimonials
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormButton isSubmitting={isSubmitting}>Submit</FormButton>
        </fieldset>
      </form>
    </Form>
  );
};
