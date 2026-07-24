import { ShieldCheck } from "lucide-react";

import { LogoMark } from "@/components/login/logo-mark";

const bullets = [
  { src: "/1st_bullet.svg", width: 13, height: 18, text: "All your leads in one place" },
  { src: "/2nd_bullet.svg", width: 20, height: 14, text: "Close more deals, faster" },
  { src: "/3rd_bullet.svg", width: 17, height: 21, text: "Insights that drive growth" },
];

export function ImagePanel() {
  return (
    <div className="relative h-auto min-h-[1024px] w-[720px] shrink-0 overflow-hidden rounded-tr-[26px] rounded-br-[26px]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[url('/bg_image.jpg')] bg-cover bg-left"
      />
      {/*
        Figma specifies this as an opaque slate-800 -> #00060F gradient, but the
        photo still shows through in the reference screenshots — that only works
        if the layer uses a blend mode Figma's inspector panel didn't expose.
        Approximated here as a partially transparent overlay to match the look.
      */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-slate-800/75 to-[#00060F]/90"
      />

      <div className="absolute top-[60px] left-[60px] flex h-[44px] w-[220px] items-center gap-2.5">
        <LogoMark className="shrink-0" />
        <span className="text-2xl font-bold">
          <span className="text-white">Prop</span>
          <span className="text-brand">Vista</span>
        </span>
      </div>

      <div className="absolute top-[240px] left-[60px] flex w-[407px] flex-col gap-[28px]">
        <div>
          <h1 className="w-[540px] text-4xl font-bold leading-tight text-white whitespace-nowrap">
            Smarter Deals.
            <br />
            Stronger <span className="text-brand">Relationships.</span>
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Manage Leads, Properties, Conversations and Deals From One Powerful Platform.
          </p>
        </div>

        <ul className="flex flex-col gap-3">
          {bullets.map(({ src, width, height, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm text-slate-100">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                <img src={src} alt="" width={width} height={height} />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute top-[854px] left-[60px] flex w-[364px] items-center gap-[10px] rounded-[14px] border border-slate-300 bg-white px-[14.5px] py-[12px]">
        <ShieldCheck className="size-6 shrink-0 text-brand" />
        <div>
          <p className="text-sm font-semibold text-slate-800">Trusted &amp; Secure</p>
          <p className="text-xs text-slate-500">SOC 2 Type II &bull; ISO 27001 &bull; Audit-Logged</p>
        </div>
      </div>

      <p className="absolute top-[940px] left-[60px] text-xs text-slate-400">
        &copy; {new Date().getFullYear()} PropVista. All rights reserved.
      </p>
    </div>
  );
}
