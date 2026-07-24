import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-100 p-6 text-center">
      <h1 className="text-2xl font-bold text-slate-800">Signed in</h1>
      <p className="text-slate-600">
        {session.user.name ?? session.user.email}
      </p>
      {session.user.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={session.user.image} alt="" className="size-16 rounded-full" />
      )}
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button
          type="submit"
          className="rounded-lg bg-brand-teal px-4 py-2 text-sm font-semibold text-white hover:bg-brand-teal/90"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
