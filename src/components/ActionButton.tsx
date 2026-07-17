"use client";

import { useFormStatus } from "react-dom";

import Button from "@/components/Button";

type ActionButtonProps = {
  children: string;
  pendingLabel?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
};

export default function ActionButton({
  children,
  pendingLabel = "処理中…",
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: ActionButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      disabled={pending}
    >
      {pending ? pendingLabel : children}
    </Button>
  );
}
