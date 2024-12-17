"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { GitHubIcon } from "./icons";

export function PersistentToast() {
  const { toast } = useToast();

  useEffect(() => {
    // Show the toast when the component mounts
    const { dismiss } = toast({
      title: "Start Your Own Job Board",
      description: "Clone this project and create your own job board website.",
      action: (
        <ToastAction
          altText="View on GitHub"
          className="bg-black hover:bg-black/90 text-white text-xs px-3 py-1.5 h-auto gap-1.5"
          onClick={() =>
            window.open("https://github.com/tomaslau/jobboardstarter", "_blank")
          }
        >
          <GitHubIcon className="h-3.5 w-3.5" />
          View on GitHub
        </ToastAction>
      ),
      duration: Infinity, // Make the toast persist indefinitely
      className: "persistent-toast border shadow-lg", // Added border and shadow
      style: {
        backgroundColor: "white",
        opacity: 1,
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
      },
    });

    // Cleanup function (optional)
    return () => dismiss();
  }, [toast]);

  return null; // This component doesn't render anything directly
}
