"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { submitContactForm } from "@/app/actions/contact";
import { Alert, Building, Checked, Loader, Mail, Phone, Send } from "../Icons";
import { cn } from "@/libs/cn";
import { InputField } from "./InputField";

const contactSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  email: z.email("Invalid email address"),
  tel: z.string().min(1, "Telephone is required"),
});

type FormValues = z.infer<typeof contactSchema>;

const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    error: null,
  });

  const {
    register,
    trigger,
    reset,
    formState: { errors: clientErrors },
  } = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
  });

  // Handle success state and reset
  useEffect(() => {
    if (state.success) {
      reset();
      formRef.current?.reset();
    }
  }, [state.success, reset]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative overflow-hidden p-4 lg:p-8">
        <div className="relative z-10">
          <form
            ref={formRef}
            action={formAction}
            onSubmit={async (e) => {
              const isValid = await trigger();
              if (!isValid) {
                e.preventDefault();
              }
            }}
            className="space-y-6">
            <InputField
              id="company"
              label="Company"
              placeholder="Ex. Acme Corp"
              icon={<Building className="size-5" />}
              register={register("company")}
              error={clientErrors.company || state.fieldErrors?.company}
              disabled={isPending}
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              placeholder="Ex. contact@acme.com"
              icon={<Mail className="size-5" />}
              register={register("email")}
              error={clientErrors.email || state.fieldErrors?.email}
              disabled={isPending}
            />

            <InputField
              id="tel"
              label="Telephone"
              type="tel"
              placeholder="Ex. 099-000-0000"
              icon={<Phone className="size-5" />}
              register={register("tel")}
              error={clientErrors.tel || state.fieldErrors?.tel}
              disabled={isPending}
            />

            <div className="flex items-center justify-center p-1.5 pt-4">
              <button
                type="submit"
                disabled={isPending}
                className={cn(
                  "shrink-0 btn-pixel btn-pixel--primary-dim group min-w-[200px]",
                  isPending && "opacity-70 cursor-not-allowed",
                )}>
                <AnimatePresence mode="wait">
                  {isPending ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-x-2 items-center justify-center">
                      <span>Sending...</span>
                      <Loader className="animate-spin" />
                    </motion.span>
                  ) : state.success ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex gap-x-2 items-center justify-center text-green-400 font-bold">
                      <span>Sent Successfully</span>
                      <Checked className="size-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-x-2 items-center justify-center">
                      <span>Send Message</span>
                      <Send className="size-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </form>

          <AnimatePresence>
            {state.error && !isPending && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 flex gap-x-2 items-center text-red-400 text-sm bg-red-400/10 p-3 pixel-tag border-red-400/20">
                <Alert className="size-5" />
                <span>{state.error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export { Form };
