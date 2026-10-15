"use client"

import { Eye, EyeOff } from "lucide-react";
import Input, { type InputProps } from "./Input";
import { useState } from "react";

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
          className="text-foreground3 hover:text-foreground md:dark:text-dark3 md:dark:hover:text-dark focus-visible:outline-2"
        >
          {visible ? <EyeOff size={32} /> : <Eye size={32} />}
        </button>
      }
    />
  );
}