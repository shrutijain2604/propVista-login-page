import { ImagePanel } from "@/components/login/image-panel";
import { SignupCard } from "@/components/login/signup-card";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen w-full items-stretch bg-neutral-100">
      <ImagePanel />
      <div className="flex flex-1 items-center justify-center">
        <SignupCard />
      </div>
    </div>
  );
}
