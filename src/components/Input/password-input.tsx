"use client"

import { Eye, EyeOff } from "lucide-react";
import Input, { type InputProps } from "./input";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<InputProps, "type" | "endAdornment">;

/**
 * Special input component for password input. Takes same props as `<input>` except `type`
 *
 * @remarks
 * Hides and shows passwords with a button
 */
export default function PasswordInput(props: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={
        <button
          type="button"
          onClick={() => {
            setVisible(!visible);
          }}
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          className={cn(
            "text-foreground3 hover:text-foreground focus-visible:outline-2",
            {
              "md:dark:text-dark3 md:dark:hover:text-dark": props.forAuth
            }
          )}
        >
          {visible ? <EyeOff size={32} /> : <Eye size={32} />}
        </button>
      }
    />
  );
}