import React from "react";
import { cn } from "@/lib/utils";

type BadgeType =
  | "new"
  | "remote"
  | "onsite"
  | "hybrid"
  | "featured"
  | "default"
  | "not specified"
  | "visa-yes"
  | "visa-no"
  | "visa-not-specified"
  | "career-level"
  | "language";

interface JobBadgeProps {
  type: BadgeType;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function JobBadge({ type, children, className, icon }: JobBadgeProps) {
  const badgeStyles = {
    new: "bg-green-50 border-green-100 border text-green-700",
    remote: "bg-green-50 border-green-100 border text-green-700",
    onsite: "bg-red-50 border-red-100 border text-red-700",
    hybrid: "bg-blue-50 border-blue-100 border text-blue-700",
    featured: "bg-zinc-900 text-zinc-50",
    default: "bg-white border text-gray-700",
    "not specified": "bg-white border text-gray-700",
    "visa-yes": "bg-green-50 border-green-100 border text-green-700",
    "visa-no": "bg-red-50 border-red-100 border text-red-700",
    "visa-not-specified": "bg-white border text-gray-700",
    "career-level": "bg-white border text-gray-700",
    language: "bg-white border text-gray-700",
  };

  const baseStyles = "inline-block px-2 py-0.5 text-xs rounded-full";

  // Featured badges have different styling
  const featuredStyles =
    type === "featured"
      ? "inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full"
      : baseStyles;

  return (
    <span className={cn(featuredStyles, badgeStyles[type], className)}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </span>
  );
}
