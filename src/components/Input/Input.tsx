import { ComponentProps, ReactNode, useId } from "react";
import { cn } from "@/lib/utils";

export type InputProps = ComponentProps<"input"> & {
  /** Label above the input area */
  label?: string;

  /** Optional error message to display below the input area */
  error?: string;

  /** Component to be placed on the right side of the input area */
  endAdornment?: ReactNode;

  /** True if this input is used in the sign-up or sign-in pages. For styling purposes only */
  forAuth?: boolean;
};

/**
 * Styled input component. Takes same props as `<input>`
 *
 * @remarks
 * Label and border change color when input is focused.
 */
export default function Input({
  label,
  error,
  endAdornment,
  forAuth = false,
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
      <div className="peer relative">
        <input
          id={inputId}
          className={cn(
            "focus-visible:border-primary dark:focus-visible:border-primary-light w-full rounded-2xl border-2 p-4 focus-visible:outline-none",
            {
              "md:dark:focus-visible:border-primary": forAuth,
            },
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
          className={cn(
            "peer-focus-within:text-primary dark:peer-focus-within:text-primary-light ml-4",
            {
              "md:dark:peer-focus-within:text-primary": forAuth,
            },
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}
