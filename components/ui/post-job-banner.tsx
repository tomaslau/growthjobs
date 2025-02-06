import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PostJobBanner() {
  return (
    <Card className="p-6 border shadow-none rounded-lg">
      <h3 className="text-lg font-semibold mb-3">
        Hiring? Post Your Job Ad Here
      </h3>
      <p className="text-sm mb-4 text-muted-foreground">
        Reach talented professionals. Get quality applications fast.
      </p>
      <div className="flex items-center gap-2 mb-4">
        <div className="flex -space-x-3">
          <Avatar className="h-8 w-8 border border-background">
            <AvatarImage src="/avatars/bestwriting.png" alt="Best Writing" />
            <AvatarFallback>BW</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8 border border-background">
            <AvatarImage src="/avatars/marketful.png" alt="Marketful" />
            <AvatarFallback>MF</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8 border border-background">
            <AvatarImage src="/avatars/uithings.png" alt="UI Things" />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8 border border-background">
            <AvatarImage src="/avatars/bestwriting.png" alt="Best Writing" />
            <AvatarFallback>BW</AvatarFallback>
          </Avatar>
        </div>
        <span className="text-xs text-muted-foreground">
          Trusted by top companies
        </span>
      </div>
      <Button className="w-full bg-zinc-900 text-white hover:bg-zinc-800">
        Post a Job ($59)
      </Button>
      <p className="text-xs text-center mt-4 text-muted-foreground">
        30-day money-back guarantee
      </p>
    </Card>
  );
}
