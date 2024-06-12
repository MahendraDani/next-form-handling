"use client";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export const FormProgressBar = ({ currentStep }: { currentStep: string }) => {
  return (
    <div className="flex justify-between items-center">
      <StepName
        name="Personal Info"
        currentStep={parseInt(currentStep)}
        stepNumber={1}
      />
      <StepName
        name="Socials"
        currentStep={parseInt(currentStep)}
        stepNumber={2}
      />
      <StepName
        name="Feedback"
        currentStep={parseInt(currentStep)}
        stepNumber={3}
      />
    </div>
  );
};

function StepName({
  currentStep,
  name,
  stepNumber,
}: {
  currentStep: number;
  name: string;
  stepNumber: number;
}) {
  return (
    <div className="flex flex-row justify-start items-center gap-1">
      <div
        className={cn(
          "w-4 h-4 p-2 rounded-full bg-sky-200 flex justify-center items-center",
          { "bg-green-400": currentStep === stepNumber }
        )}
      >
        <p className="text-sm">{stepNumber}</p>
      </div>
      <p className="text-sm text-muted-foreground">{name}</p>
    </div>
  );
}

//
