"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ZFeedbackFormSchema } from "@/lib/zod";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FormProgressBar } from "./form-progress-bar";
import { PersonalInfoForm } from "./personal-info-form";
import { SocialInfoForm } from "./social-info-form";
import { FinalFeedbackForm } from "./final-feedback-form";

export const FeedbackForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentStep = searchParams.get("step");

  useEffect(() => {
    if (currentStep && parseInt(currentStep) === 4) {
      router.push(`http://localhost:3000/feedback`);
    }
  }, [currentStep]);

  return (
    <Card className="max-w-[30rem]">
      <CardHeader className="-mb-2">
        <CardTitle>Give Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        {!currentStep ? (
          <Link href={`/feedback?step=1`}>
            <Button>Send Feedback</Button>
          </Link>
        ) : (
          <div>
            <FormProgressBar currentStep={currentStep} />
            {currentStep && parseInt(currentStep) === 1 && (
              // <PersonalDetailsForm />
              <PersonalInfoForm currentStep={currentStep} />
            )}
            {currentStep && parseInt(currentStep) === 2 && (
              <SocialInfoForm currentStep={currentStep} />
            )}
            {currentStep && parseInt(currentStep) === 3 && (
              <FinalFeedbackForm currentStep={currentStep} />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
