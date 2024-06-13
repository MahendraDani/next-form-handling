"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { isValidGithubUrl } from "@/lib/valid-urls";
import { FormButton } from "@/components/ui/buttons/form-button";

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Name should not exceed 255 characters" })
    .describe("The name of user"),
  occupation: z
    .string()
    .min(1, { message: "Occupation is required" })
    .max(255, { message: "Occupation should not exceed 255 characters" }),
  githubUrl: z
    .string()
    .min(1, { message: "Github profile is required" })
    .describe("The github profile of the user"),
});

export const PersonalInfoForm = ({ currentStep }: { currentStep: string }) => {
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

  const nextStep = parseInt(currentStep) + 1;
  const prevStep = parseInt(currentStep) - 1;

  const [initialValues, setInitialValues] = useState({
    name: "",
    occupation: "",
    githubUrl: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("name") || "";
    const occupation = localStorage.getItem("occupation") || "";
    const githubUrl = localStorage.getItem("githubUrl") || "";

    setInitialValues({ name, occupation, githubUrl });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);

  function onSubmit({
    name,
    occupation,
    githubUrl,
  }: z.infer<typeof formSchema>) {
    if (!isValidGithubUrl({ githubUrl })) {
      form.setError("githubUrl", {
        message: "Please provide a valid github profile",
        type: "validate",
      });
      return;
    }
    localStorage.setItem("name", name);
    localStorage.setItem("occupation", occupation);
    localStorage.setItem("githubUrl", githubUrl);

    router.push(`/feedback?${createQueryString("step", nextStep.toString())}`);
  }

  const { isSubmitting } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="p-4 space-y-4" disabled={isSubmitting}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="occupation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Occupation</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Student, Co Founder, Developer"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="githubUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Github</FormLabel>
                <FormControl>
                  <Input placeholder="https://github.com/johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full text-end">
            <FormButton isSubmitting={isSubmitting}>Next</FormButton>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};
