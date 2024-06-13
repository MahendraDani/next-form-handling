"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
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
    <Link
      href={`/feedback?step=${stepNumber}`}
      className="group hover:scale-105 duration-75 ease-in-out"
    >
      <div className="flex flex-row justify-start items-center gap-1">
        <div
          className={cn(
            "w-4 h-4 p-2 rounded-full bg-gray-200 flex justify-center items-center group-hover:bg-purple-500 group-hover:text-white",
            {
              "bg-purple-700 text-white": currentStep === stepNumber,
            }
          )}
        >
          <p className="text-[0.6rem]">{stepNumber}</p>
        </div>
        <p
          className={cn(
            "text-sm text-muted-foreground group-hover:text-purple-500",
            {
              "text-purple-700": currentStep === stepNumber,
            }
          )}
        >
          {name}
        </p>
      </div>
    </Link>
  );
}

//
