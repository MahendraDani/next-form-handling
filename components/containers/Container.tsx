import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { ReactNode } from "react";

const containerVariants = cva("mx-auto", {
  variants: {
    variant: {
      default: "block",
      flexCenterRow: "flex flex-row justify-center items-center gap-2",
      flexBetweenRow: "flex flex-row justify-between items-center",
      flexCenterCol: "flex flex-col justify-center items-center gap-2",
      flexBetweenCol: "flex flex-col justify-between items-center gap-2",
    },
    size: {
      default: "w-[100vw]",
      lg: "w-[90vw] sm:w-[80vw]",
      md: "w-[85vw] sm:w-[40rem]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface IContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  children: ReactNode;
}
const Container = React.forwardRef<HTMLDivElement, IContainerProps>(
  ({ children, className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
export { Container, containerVariants };
