"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/libs/cn";
import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";
import { ReactNode } from "react";

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon: ReactNode;
  register: UseFormRegisterReturn;
  error?: FieldError | string[];
  disabled?: boolean;
}

const InputField = ({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  register,
  error,
  disabled
}: InputFieldProps) => {
  const errorMessage = Array.isArray(error) ? error[0] : error?.message;

  return (
    <div className="space-y-3">
      <label
        htmlFor={id}
        className="flex items-center gap-x-2 text-md font-bold text-on-background"
      >
        {icon}
        <span>{label}</span>
      </label>
      <div className="space-y-1">
        <input
          {...register}
          id={id}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          className={cn(
            "pixel-input",
            errorMessage && "error"
          )}
        />
        <AnimatePresence>
          {errorMessage && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-red-400 text-xs font-bold pt-1"
            >
              {errorMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export { InputField };
