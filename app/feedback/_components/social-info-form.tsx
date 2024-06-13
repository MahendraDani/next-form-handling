"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
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
import { isValidLinkedinUrl, isValidTwitterUrl } from "@/lib/valid-urls";
import { FormButton } from "@/components/ui/buttons/form-button";

const formSchema = z.object({
  twitterUrl: z.string().optional().describe("The twitter(X) handle of user"),
  linkedinUrl: z.string().optional().describe("The linkedin profile of user"),
});

export const SocialInfoForm = ({ currentStep }: { currentStep: string }) => {
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
    twitterUrl: "",
    linkedinUrl: "",
  });

  useEffect(() => {
    const linkedinUrl = localStorage.getItem("linkedinUrl") || "";
    const twitterUrl = localStorage.getItem("twitterUrl") || "";

    setInitialValues({ twitterUrl, linkedinUrl });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    form.reset(initialValues);
  }, [initialValues, form]);

  function onSubmit({ twitterUrl, linkedinUrl }: z.infer<typeof formSchema>) {
    if (twitterUrl) {
      if (!isValidTwitterUrl({ twitterUrl })) {
        form.setError("twitterUrl", {
          message: "Please provide a valid twitter handle",
          type: "validate",
        });
        return;
      }
    }
    if (linkedinUrl) {
      if (linkedinUrl && !isValidLinkedinUrl({ linkedinUrl })) {
        form.setError("linkedinUrl", {
          message: "Please provide a valid linkedin profile",
          type: "validate",
        });
        return;
      }
    }

    console.log(twitterUrl, linkedinUrl);
    localStorage.setItem("twitterUrl", twitterUrl as string);
    localStorage.setItem("linkedinUrl", linkedinUrl as string);

    router.push(`/feedback?${createQueryString("step", nextStep.toString())}`);
  }

  const handleSkipSubmit = () => {
    // Completely skip
    localStorage.setItem("twitterUrl", "");
    localStorage.setItem("linkedinUrl", "");
    router.push(`/feedback?${createQueryString("step", nextStep.toString())}`);
  };

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="p-4 space-y-4" disabled={isSubmitting}>
          <FormField
            control={form.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input placeholder="https://x.com/johndoe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="linkedinUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Linkedin</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/johndoe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end items-center gap-4">
            <Button
              type="button"
              variant={"outline"}
              onClick={handleSkipSubmit}
            >
              Skip
            </Button>
            <FormButton isSubmitting={isSubmitting}>Next</FormButton>
          </div>
        </fieldset>
      </form>
    </Form>
  );
};
