"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { submitContactForm } from "@/app/actions/contact";
import { Alert, Building, Checked, Loader, Mail, Phone, Send } from "../Icons";
import { cn } from "@/libs/cn";

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
    mode: "onTouched",
  });

  // Reset form when success
  useEffect(() => {
    if (state.success && formRef.current) {
      reset();
      formRef.current.reset();
    }
  }, [state, reset]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative overflow-hidden p-4 lg:p-8"
      >
        <div className="relative z-10">
          <form
            ref={formRef}
            action={formAction}
            onSubmit={async (e) => {
              // Validate with react-hook-form client-side before sending Actionq
              const isValid = await trigger();
              if (!isValid) {
                e.preventDefault();
              }
            }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <label
                htmlFor="company"
                className="flex items-center gap-x-2 text-md font-medium text-on-background"
              >
                <Building className="size-5" />
                <span>Company</span>
              </label>
              <div className="space-y-1">
                <input
                  {...register("company")}
                  id="company"
                  type="text"
                  disabled={isPending || state.success}
                  placeholder="Ex. Acme Corp"
                  className={cn(
                    "pixel-input",
                    (clientErrors.company || state.fieldErrors?.company) && "error"
                  )}
                />
                <AnimatePresence>
                  {(clientErrors.company || state.fieldErrors?.company) && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-400 text-xs font-bold pt-1"
                    >
                      {clientErrors.company?.message ||
                        state.fieldErrors?.company?.[0]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="email"
                className="flex items-center gap-x-2 text-md font-bold text-on-background"
              >
                <Mail className="size-5" />
                <span>Email</span>
              </label>
              <div className="space-y-1">
                <input
                  {...register("email")}
                  id="email"
                  type="email"
                  disabled={isPending || state.success}
                  placeholder="Ex. contact@acme.com"
                  className={cn(
                    "pixel-input",
                    (clientErrors.email || state.fieldErrors?.email) && "error"
                  )}
                />
                <AnimatePresence>
                  {(clientErrors.email || state.fieldErrors?.email) && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-400 text-xs font-bold pt-1"
                    >
                      {clientErrors.email?.message ||
                        state.fieldErrors?.email?.[0]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="tel"
                className="flex items-center gap-x-2 text-md font-bold text-on-background"
              >
                <Phone className="size-5" />
                <span>Telephone</span>
              </label>
              <div className="space-y-1">
                <input
                  {...register("tel")}
                  id="tel"
                  type="tel"
                  disabled={isPending || state.success}
                  placeholder="Ex. 099-000-0000"
                  className={cn(
                    "pixel-input",
                    (clientErrors.tel || state.fieldErrors?.tel) && "error"
                  )}
                />
                <AnimatePresence>
                  {(clientErrors.tel || state.fieldErrors?.tel) && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-400 text-xs font-bold pt-1"
                    >
                      {clientErrors.tel?.message || state.fieldErrors?.tel?.[0]}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center justify-center p-1.5 pt-4">
              <button
                type="submit"
                disabled={isPending || state.success}
                className={cn(
                    "shrink-0 btn-pixel btn-pixel--primary-dim group",
                    (isPending || state.success) && "opacity-70 cursor-not-allowed"
                )}
              >
                <AnimatePresence mode="wait">
                  {!isPending && !state.success && (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-x-2 items-center"
                    >
                      <span>Send Message</span>
                      <Send className="size-5" />
                    </motion.span>
                  )}

                  {isPending && (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-x-2 items-center"
                    >
                      <span>Sending...</span>
                      <Loader className="animate-spin" />
                    </motion.span>
                  )}

                  {state.success && !isPending && (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex gap-x-2 items-center text-green-400 font-bold"
                    >
                      <span>Sent Successfully</span>
                      <Checked className="size-5" />
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
                className="mt-6 flex gap-x-2 items-center text-red-400 text-sm bg-red-400/10 p-3 pixel-tag border-red-400/20"
              >
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
