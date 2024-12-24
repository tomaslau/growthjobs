"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";

export function PersistentToast() {
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    const toastMessage = searchParams.get("toast");
    const toastType = searchParams.get("type") || "default";

    if (toastMessage) {
      toast({
        title: toastMessage,
        variant: toastType as "default" | "destructive",
      });
    }
  }, [searchParams, toast]);

  return null;
}
