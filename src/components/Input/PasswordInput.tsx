"use client"

import { Eye, EyeOff } from "lucide-react";
import Input, { type InputProps } from "./Input";
import { useState } from "react";
import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<InputProps, "type" | "endAdornment">;

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