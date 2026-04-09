"use client";

import * as Dialog from "@radix-ui/react-dialog";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Close } from "../Icons";

const ProjectDetailContent = dynamic(() => import("./ProjectDetailContent"), {
  ssr: false,
  loading: () => <ProjectDetailSkeleton />,
});

interface ProjectDialogProps {
  slug: string | null;
  onOpenChange: (open: boolean) => void;
}

export const ProjectDialog = ({ slug, onOpenChange }: ProjectDialogProps) => {
  const isOpen = !!slug;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay className="fixed inset-0 backdrop-blur-md z-50 overflow-y-scroll">
              <Dialog.Content className="fixed inset-0 z-50 flex items-center overflow-y-scroll justify-center p-4">
                <Dialog.Title className="sr-only">Project Details</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Project Details
                </Dialog.Description>
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="bg-surface-container-low relative mx-auto max-w-4xl w-full max-h-[90svh] overflow-hidden flex flex-col">
                  <Dialog.Close className="absolute top-5 right-5 z-50 bg-surface-bright/50 hover:bg-surface-bright transition-colors size-10 rounded-full flex items-center justify-center text-on-background focus:outline-hidden">
                    <Close className="size-5" />
                  </Dialog.Close>

                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <Suspense fallback={<ProjectDetailSkeleton />}>
                      {slug && <ProjectDetailContent slug={slug} />}
                    </Suspense>
                  </div>
                </motion.div>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

const ProjectDetailSkeleton = () => (
  <div className="flex flex-col gap-10 p-10 animate-pulse">
    <div className="aspect-video bg-surface-variant/40" />
    <div className="flex flex-col gap-5">
      <div className="h-12 w-2/3 bg-surface-variant/40 rounded-lg" />
      <div className="flex gap-2">
        <div className="h-6 w-20 bg-surface-variant/40 rounded-full" />
        <div className="h-6 w-24 bg-surface-variant/40 rounded-full" />
        <div className="h-6 w-16 bg-surface-variant/40 rounded-full" />
      </div>
      <div className="space-y-4 pt-5">
        <div className="h-4 w-full bg-surface-variant/40 rounded-lg" />
        <div className="h-4 w-full bg-surface-variant/40 rounded-lg" />
        <div className="h-4 w-4/5 bg-surface-variant/40 rounded-lg" />
      </div>
    </div>
  </div>
);
