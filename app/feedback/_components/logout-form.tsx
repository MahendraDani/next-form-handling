"use client";

import { useFormState, useFormStatus } from "react-dom";
import { logoutAction } from "../action";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import { toast } from "sonner";
import { useEffect } from "react";

export const LogoutForm = () => {
  const [state, formAction] = useFormState(logoutAction, {
    message: "",
    errorType: null,
    isError: false,
  });
  const showErrorToast = () => {
    state.errorType === "databaseError" || state.errorType === "internalError"
      ? toast.error(state.message)
      : null;
  };

  useEffect(() => {
    state.isError ? showErrorToast() : null;
  }, [state]);

  return (
    <form action={formAction}>
      <LogoutButton />
    </form>
  );
};

function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="flex justify-center items-center gap-2">
      {pending && <Spinner />}
      <span>Logout</span>
    </Button>
  );
}
