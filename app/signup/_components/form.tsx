"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ZCreateAccountSchema } from "@/lib/zod";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Spinner } from "@/components/spinner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExternalNavLink } from "@/components/navbar/external-navlink";

export const CreateAccountForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof ZCreateAccountSchema>>({
    resolver: zodResolver(ZCreateAccountSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();

  const onSubmit = async ({
    email,
    password,
  }: z.infer<typeof ZCreateAccountSchema>) => {
    const res = await fetch("/api/accounts", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "Application/json",
      },
    });
    const response = await res.json();
    if (!res.ok) {
      toast.error(response.error.message);
      return;
    }

    toast.success("Account created successfully");
    router.push("/feedback");
    return;
  };

  const { isSubmitting } = form.formState;

  return (
    <Card className="w-[25rem] max-w-[25rem]">
      <CardHeader className="-mb-2">
        <CardTitle className="w-full">Create Account</CardTitle>
        <CardDescription className="text-muted-foreground/40">
          <span>{"Forms, errors, rants and a lot more!"}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jhon@example.com"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      disabled={isSubmitting}
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
                  {showPassword ? (
                    <EyeIcon
                      size={"15px"}
                      className="absolute top-[2.25rem] right-2 z-10 cursor-pointer text-muted-foreground text-sm"
                      onClick={() => {
                        setShowPassword(false);
                      }}
                    />
                  ) : (
                    <EyeOffIcon
                      size={"15px"}
                      className="absolute top-[2.25rem] right-2 z-10 cursor-pointer text-muted-foreground text-sm"
                      onClick={() => {
                        setShowPassword(true);
                      }}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex justify-center items-center">
              <Button
                variant={"secondary"}
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 flex justify-center items-center gap-2
      "
              >
                {isSubmitting && <Spinner />}
                <span>Sign up</span>
              </Button>
            </div>
            <div className="w-full text-center flex justify-center items-center">
              <span className="text-muted-foreground/55 text-sm text-center">
                {"Already have an account?"}
              </span>
              <Link href={"/login"}>
                <span className="hover:underline duration-150 ease-in-out text-sm text-muted-foreground">
                  login
                </span>
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
