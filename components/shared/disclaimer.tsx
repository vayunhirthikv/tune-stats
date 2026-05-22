import { Info } from "lucide-react";

export function Disclaimer({ text }: { text: string }) {
  return (
    <p className="flex items-start gap-2 text-xs text-muted-foreground mt-2">
      <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
      <span>{text}</span>
    </p>
  );
}
