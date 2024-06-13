import { ReactNode } from "react";
import { Button } from "../button";
import { Spinner } from "@/components/spinner";
export const FormButton = ({
  children,
  isSubmitting,
}: {
  children: ReactNode;
  isSubmitting: boolean;
}) => {
  return (
    <div className="w-full flex justify-end items-center gap-4">
      <Button type="submit" className="flex justify-center items-center gap-2">
        {isSubmitting && <Spinner />}
        {children}
      </Button>
    </div>
  );
};
