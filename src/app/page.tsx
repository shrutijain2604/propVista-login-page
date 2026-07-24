import { ImagePanel } from "@/components/login/image-panel";
import { LoginCard } from "@/components/login/login-card";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full items-stretch bg-neutral-100">
      <ImagePanel />
      <div className="flex flex-1 items-center justify-center">
        <LoginCard />
      </div>
    </div>
  );
}
