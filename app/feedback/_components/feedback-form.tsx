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

export const FeedbackForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentStep = searchParams.get("step");
  // console.log(formStage);

  useEffect(() => {
    if (currentStep && parseInt(currentStep) === 4) {
      router.push(`http://localhost:3000/feedback`);
    }
  }, [currentStep]);

  return (
    <Card className="max-w-[30rem]">
      <CardHeader className="-mb-2">
        <CardTitle>Give Feedback</CardTitle>
        <CardDescription>
          {/* {"Let us know what you liked about this project"} */}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!currentStep ? (
          <Link href={`/feedback?step=1`}>
            <Button>Send Feedback</Button>
          </Link>
        ) : (
          <>
            <FormProgressBar currentStep={currentStep} />
            {currentStep && parseInt(currentStep) === 1 && (
              <PersonalDetailsForm />
            )}
            {currentStep && parseInt(currentStep) === 2 && (
              <Form2 currentStep={currentStep} />
            )}
            {currentStep && parseInt(currentStep) === 3 && (
              <Form3 currentStep={currentStep} />
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

function PersonalDetailsForm() {
  const [age, setAge] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const hanldeFormSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("age", age);

    router.push(
      `http://localhost:3000/feedback?${createQueryString("step", "2")}`
    );
  };
  return (
    <form onSubmit={hanldeFormSubmit}>
      <div>Form 1</div>
      <Input
        name="age"
        placeholder="18"
        onChange={(e) => setAge(e.target.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}

function Form2({ currentStep }: { currentStep: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const [role, setRole] = useState("");
  const nextStep = parseInt(currentStep) + 1;
  const prevStep = parseInt(currentStep) - 1;
  const hanldeFormSubmit = (e: any) => {
    e.preventDefault();
    createQueryString("step", nextStep.toString());
    router.push(
      `http://localhost:3000/feedback?${createQueryString(
        "step",
        nextStep.toString()
      )}`
    );
  };
  return (
    <>
      <form onSubmit={hanldeFormSubmit}>
        <div>Form 2</div>
        <Input
          name="role"
          placeholder="abc"
          onChange={(e) => {
            setRole(e.target.value);
          }}
        />
        {parseInt(currentStep) > 0 && (
          <Link
            href={`${pathname}?${createQueryString(
              "step",
              prevStep.toString()
            )}`}
          >
            <Button type="button" variant={"outline"}>
              Back
            </Button>
          </Link>
        )}

        <Button type="submit">Submit 2</Button>
      </form>
      <Link
        href={`${pathname}?${createQueryString("step", nextStep.toString())}`}
      >
        <Button variant={"secondary"}>Skip</Button>
      </Link>
    </>
  );
}
function Form3({ currentStep }: { currentStep: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const [name, setName] = useState("");
  const nextStep = parseInt(currentStep) + 1;
  const prevStep = parseInt(currentStep) - 1;
  const hanldeFormSubmit = (e: any) => {
    e.preventDefault();
    localStorage.setItem("name", name);
    router.push(
      `http://localhost:3000/feedback?${createQueryString(
        "step",
        nextStep.toString()
      )}`
    );
  };
  return (
    <form onSubmit={hanldeFormSubmit}>
      <div>Form 3</div>
      <Input
        name="name"
        placeholder="Jhon"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {parseInt(currentStep) > 0 && (
        <Link
          href={`${pathname}?${createQueryString("step", prevStep.toString())}`}
        >
          <Button type="button" variant={"outline"}>
            Back
          </Button>
        </Link>
      )}
      <Button type="submit">Submit 3</Button>
    </form>
  );
}
