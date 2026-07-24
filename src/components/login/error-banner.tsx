import { AlertTriangle } from "lucide-react";

export function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="flex w-fit items-center gap-[10px] whitespace-nowrap rounded-full border-[0.6px] border-red-400/60 bg-red-600/10 px-[24.5px] py-[7px]"
    >
      <AlertTriangle className="size-3.5 shrink-0 text-red-600" />
      <p className="text-xs text-red-600">{message}</p>
    </div>
  );
}
