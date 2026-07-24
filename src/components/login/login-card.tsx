"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorBanner } from "@/components/login/error-banner";
import { AppleIcon, FacebookIcon, GoogleIcon } from "@/components/login/oauth-icons";

const ERROR_COPY = "Email or password is incorrect. Try again or reset your password.";
const REMEMBERED_EMAIL_KEY = "propvista:remembered-email";

const fieldClasses =
  "h-11 rounded-lg border-0 bg-field px-3.5 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-brand-teal/40";

export function LoginCard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem(REMEMBERED_EMAIL_KEY);
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRemember(true);
    }
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(false);

    const result = await signIn("credentials", { email, password, redirect: false });
    setSubmitting(false);

    if (!result || result.error) {
      setError(true);
      setEmail("");
      setPassword("");
      return;
    }

    if (remember) {
      localStorage.setItem(REMEMBERED_EMAIL_KEY, email);
    } else {
      localStorage.removeItem(REMEMBERED_EMAIL_KEY);
    }
    router.push("/dashboard");
  }

  return (
    <div className="relative w-[600px]">
      {error && (
        <div className="absolute -top-[60px] left-1/2 -translate-x-1/2">
          <ErrorBanner message={ERROR_COPY} />
        </div>
      )}

      <Card className="w-full gap-[10px] rounded-[22px] border border-slate-300 bg-white p-[40px] shadow-[0_12px_34px_0_rgba(30,41,59,0.1)]">
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[30px]">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
            <p className="mt-1 text-sm text-slate-500">Log In to your account to continue</p>
          </div>

          <div className="flex flex-col gap-5">
            <div>
              <Label htmlFor="email" className="mb-1.5 text-sm font-medium text-slate-800">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                placeholder="Enter your email"
                className={fieldClasses}
              />
            </div>

            <div>
              <Label htmlFor="password" className="mb-1.5 text-sm font-medium text-slate-800">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter your password"
                  className={`${fieldClasses} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked === true)}
                  className="data-checked:border-brand-teal data-checked:bg-brand-teal"
                />
                <Label htmlFor="remember" className="text-sm text-slate-600">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm font-medium text-brand-teal hover:opacity-80">
                Forgot password
              </a>
            </div>
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="h-11 w-full rounded-lg bg-brand-teal text-sm font-semibold text-white hover:bg-brand-teal/90 disabled:opacity-70"
          >
            {submitting ? "Logging in…" : "Log In"}
          </Button>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-400" />
            or continue with
            <span className="h-px flex-1 bg-gradient-to-r from-slate-400 to-transparent" />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="h-11 flex-1 gap-2 rounded-lg border-slate-300 bg-neutral-100 text-sm font-medium text-slate-700 hover:bg-neutral-200"
            >
              <GoogleIcon /> Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
              className="h-11 flex-1 gap-2 rounded-lg border-slate-300 bg-neutral-100 text-sm font-medium text-slate-700 hover:bg-neutral-200"
            >
              <FacebookIcon /> Facebook
            </Button>
            <Button
              type="button"
              variant="outline"
              className="h-11 flex-1 gap-2 rounded-lg border-slate-300 bg-neutral-100 text-sm font-medium text-slate-700 hover:bg-neutral-200"
            >
              <AppleIcon /> Apple
            </Button>
          </div>

          <div className="flex h-[46px] items-center rounded-[14px] border border-slate-300 bg-slate-100">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 text-sm font-medium text-slate-600"
            >
              <Image src="/phone.png" alt="" width={18} height={18} /> Phone
            </button>
            <button
              type="button"
              className="my-1.5 mr-1.5 flex h-[38px] w-[250px] items-center justify-center gap-2 rounded-[14px] bg-white text-sm font-medium text-slate-800 hover:bg-slate-50"
            >
              <Image src="/mail.png" alt="" width={19} height={13} /> Mail
            </button>
          </div>

          <div className="text-center text-sm">
            <p className="text-slate-500">
              Don&apos;t have an account ?{" "}
              <Link href="/signup" className="font-semibold text-slate-800 hover:underline">
                Sign Up
              </Link>
            </p>
            <p className="mt-1 text-slate-500">
              We&apos;ll never share your data. Read our{" "}
              <a href="#" className="font-semibold text-slate-800 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
}
