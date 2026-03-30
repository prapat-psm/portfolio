"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "motion/react";
import { submitContactForm } from "@/app/actions/contact";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  Mail,
  Phone,
  Loader2,
} from "lucide-react";

const contactSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  tel: z.string().min(1, "Telephone is required"),
});

type FormValues = z.infer<typeof contactSchema>;

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);

  // React 19 / Next JS 15 useActionState pattern
  const [state, formAction, isPending] = useActionState(submitContactForm, {
    success: false,
    error: null,
    fieldErrors: {},
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
    <div className="w-full max-w-xl mx-auto p-1">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 p-8 shadow-2xl"
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none" />

        <div className="relative z-10">
          <form
            ref={formRef}
            action={formAction}
            onSubmit={async (e) => {
              // Validate with react-hook-form client-side before sending Action
              const isValid = await trigger();
              if (!isValid) {
                e.preventDefault();
              }
            }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="company"
                className="flex items-center text-sm font-medium text-white/80"
              >
                <Building2 className="w-4 h-4 mr-2 text-white/50" />
                Company
              </label>
              <input
                {...register("company")}
                id="company"
                type="text"
                disabled={isPending || state.success}
                placeholder="Ex. Acme Corp"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all disabled:opacity-50 ${
                  clientErrors.company || state.fieldErrors?.company
                    ? "border-red-500/50"
                    : "border-white/10"
                }`}
              />
              <AnimatePresence>
                {(clientErrors.company || state.fieldErrors?.company) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {clientErrors.company?.message ||
                      state.fieldErrors?.company?.[0]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="flex items-center text-sm font-medium text-white/80"
              >
                <Mail className="w-4 h-4 mr-2 text-white/50" />
                Email
              </label>
              <input
                {...register("email")}
                id="email"
                type="email"
                disabled={isPending || state.success}
                placeholder="contact@acme.com"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all disabled:opacity-50 ${
                  clientErrors.email || state.fieldErrors?.email
                    ? "border-red-500/50"
                    : "border-white/10"
                }`}
              />
              <AnimatePresence>
                {(clientErrors.email || state.fieldErrors?.email) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {clientErrors.email?.message ||
                      state.fieldErrors?.email?.[0]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="tel"
                className="flex items-center text-sm font-medium text-white/80"
              >
                <Phone className="w-4 h-4 mr-2 text-white/50" />
                Telephone
              </label>
              <input
                {...register("tel")}
                id="tel"
                type="tel"
                disabled={isPending || state.success}
                placeholder="+1 (555) 000-0000"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all disabled:opacity-50 ${
                  clientErrors.tel || state.fieldErrors?.tel
                    ? "border-red-500/50"
                    : "border-white/10"
                }`}
              />
              <AnimatePresence>
                {(clientErrors.tel || state.fieldErrors?.tel) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-400 text-xs mt-1"
                  >
                    {clientErrors.tel?.message || state.fieldErrors?.tel?.[0]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              disabled={isPending || state.success}
              className={`w-full relative group overflow-hidden rounded-xl bg-white text-black font-semibold py-3.5 px-4 transition-all hover:bg-white/90 active:scale-[0.98] disabled:active:scale-100 flex items-center justify-center ${
                isPending || state.success
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              <AnimatePresence mode="wait">
                {!isPending && !state.success && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                )}

                {isPending && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center"
                  >
                    <span>Sending...</span>
                    <Loader2 className="w-5 h-5 ml-2 animate-spin" />
                  </motion.div>
                )}

                {state.success && !isPending && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center text-green-700"
                  >
                    <span>Sent Successfully</span>
                    <CheckCircle2 className="w-5 h-5 ml-2" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

          <AnimatePresence>
            {state.error && !isPending && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex items-center text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
              >
                <AlertCircle className="w-4 h-4 mr-2 shrink-0" />
                <span>{state.error}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
