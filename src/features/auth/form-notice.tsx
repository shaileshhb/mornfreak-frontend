import { cn } from "@/lib/cn";

type FormNoticeProps = {
  tone: "error" | "success";
  children: React.ReactNode;
};

export function FormNotice({ tone, children }: FormNoticeProps) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-md border px-4 py-3 font-sans text-sm leading-relaxed",
        tone === "error"
          ? "border-destructive/30 bg-destructive/5 text-destructive"
          : "border-foreground/15 bg-background text-foreground",
      )}
    >
      {children}
    </p>
  );
}
