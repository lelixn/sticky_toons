
import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const pinVariants = cva("pin", {
  variants: {
    variant: {
      default: "text-toon-orange",
      red: "text-red-500",
      blue: "text-toon-sky-blue",
      purple: "text-toon-purple",
      green: "text-green-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface PinProps
  extends React.HTMLAttributes<SVGElement>,
    VariantProps<typeof pinVariants> {}

const Pin = ({ className, variant, ...props }: PinProps) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(pinVariants({ variant }), className)}
      {...props}
    >
      <path
        d="M50 5C55.5228 5 67.5228 15 73.0456 15C78.5685 15 90.5685 15 96.0913 15C96.0913 20.5228 96.0913 32.5228 96.0913 38.0457C96.0913 43.5685 86.0913 55.5685 86.0913 61.0913C86.0913 66.6142 86.0913 78.6142 86.0913 84.137C80.5685 84.137 68.5685 84.137 63.0456 84.137C57.5228 84.137 45.5228 94.137 40 94.137C34.4772 94.137 22.4772 84.137 16.9543 84.137C11.4315 84.137 -0.568451 84.137 -6.09128 84.137C-6.09128 78.6142 -6.09128 66.6142 -6.09128 61.0913C-6.09128 55.5685 3.90857 43.5685 3.90857 38.0457C3.90857 32.5228 3.90857 20.5228 3.90857 15C9.43142 15 21.4314 15 26.9543 15C32.4772 15 44.4772 5 50 5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default Pin;
