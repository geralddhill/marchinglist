import { ComponentProps, ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

export type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
  endAdornment?: ReactNode;
};

export default function Input({
  label,
  error,
  endAdornment,
  id,
  className,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex w-full flex-col-reverse">
      {error && (
        <p className="text-sm text-red-500 dark:text-red-600">{error}</p>
      )}
      <div className="relative">
        <input
          id={inputId}
          className={cn(
            "peer md:border-dark focus-visible:border-primary md:dark:focus-visible:border-primary dark:focus-visible:border-primary-light w-full rounded-2xl border-2 p-4 focus-visible:outline-none",
            className ?? "",
          )}
          aria-invalid={!!error}
          {...props}
        />
        {endAdornment && (
          <div className="absolute inset-y-0 right-0 flex items-center p-2 pr-4">
            {endAdornment}
          </div>
        )}
      </div>
      {label && (
        <label
          htmlFor={inputId}
          className="peer-focus-visible:text-primary dark:peer-focus-visible:text-primary-light md:dark:peer-focus-visible:text-primary ml-4"
        >
          {label}
        </label>
      )}
    </div>
  );
}
