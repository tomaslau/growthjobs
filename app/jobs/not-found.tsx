import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function JobNotFound() {
  return (
    <main className="container py-16">
      <div className="max-w-[640px] mx-auto text-center">
        <h1 className="text-2xl font-semibold mb-4">Job Not Found</h1>
        <p className="text-gray-600 mb-8">
          The job posting you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Button asChild size="sm" variant="outline">
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>
        </Button>
      </div>
    </main>
  );
}
