import { ComponentProps, useId } from "react";
import { cn } from "@/lib/utils";

type InputProps = ComponentProps<"input"> & {
  label?: string;
  error?: string;
};

export default function Input({label, error, id, className, ...props}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className="flex w-full flex-col-reverse">
      {error && (
        <p className="text-sm text-red-500 dark:text-red-600">{error}</p>
      )}
      <input
        id={inputId}
        className={cn(
          "peer md:border-dark focus-visible:border-primary md:dark:focus-visible:border-primary dark:focus-visible:border-primary-light w-full rounded-2xl border-2 p-4 focus-visible:outline-none",
          className ?? "",
        )}
        aria-invalid={!!error}
        {...props}
      />
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