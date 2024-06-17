"use client";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { IPrevStateLoginAction, loginAction } from "../action";
import { Spinner } from "@/components/spinner";
import { toast } from "sonner";
import Link from "next/link";

export const LoginForm = () => {
  const initState: IPrevStateLoginAction = {
    message: "",
    isError: false,
    errorType: null,
  };

  const [state, formAction] = useFormState(loginAction, initState);
  return (
    <Card className="w-[25rem]">
      <CardHeader className="-mb-2">
        <CardTitle>Login to your Account</CardTitle>
        <CardDescription className="text-muted-foreground/40">
          {"Learn form-handling the Next way!"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <FormFields state={state} />
        </form>
      </CardContent>
    </Card>
  );
};

function FormFields({ state }: { state: IPrevStateLoginAction }) {
  const { pending } = useFormStatus();
  const [showPassword, setShowPassword] = useState(false);

  const showErrorToast = () => {
    state.errorType === "databaseError" || state.errorType === "internalError"
      ? toast.error(state.message)
      : null;
  };

  const showSuccessToast = () => {
    console.log(state.message);
    state.message.length > 0 ? toast.success(state.message) : null;
  };
  useEffect(() => {
    state.isError ? showErrorToast() : showSuccessToast();
  }, [state]);
  return (
    <>
      <fieldset className="space-y-4" disabled={pending}>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input name="email" placeholder="jhon@example.com" />
          {state.isError && state.errorType === "validationError:email" && (
            <ErrorMessage message={state.message} />
          )}
        </div>

        <div className="space-y-1 relative">
          <Label>Password</Label>
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="*********"
          />
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
          {state.isError && state.errorType === "validationError:password" && (
            <ErrorMessage message={state.message} />
          )}
        </div>
      </fieldset>
      <div className="mt-4 w-full flex justify-center items-center">
        <Button
          variant={"secondary"}
          type="submit"
          className="w-full mt-3 flex justify-center items-center gap-2"
        >
          {pending && <Spinner />}
          <span>Login</span>
        </Button>
      </div>
      <div className="w-full text-center flex justify-center items-center mt-3">
        <span className="text-muted-foreground/55 text-sm text-center">
          {"Don't have an account?"}
        </span>
        <Link href={"/signup"}>
          <span className="hover:underline duration-150 ease-in-out text-sm text-muted-foreground">
            signup
          </span>
        </Link>
      </div>
    </>
  );
}

function ErrorMessage({ message }: { message: string }) {
  return <p className="mt-1 text-sm font-medium text-destructive">{message}</p>;
}
