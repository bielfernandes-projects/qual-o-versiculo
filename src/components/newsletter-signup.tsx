"use client";

import { Mail, Check, AlertCircle } from "lucide-react";
import { useActionState } from "react";
import { subscribeToNewsletter } from "@/actions/subscribe";

export function NewsletterSignup() {
  const [state, action, isPending] = useActionState(subscribeToNewsletter, null);

  if (state?.success) {
    return (
      <div className="mx-6 md:mx-10 mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-3">
        <div className="flex items-center justify-center size-8 rounded-full bg-emerald-100 text-emerald-600">
          <Check className="size-4" />
        </div>
        <p className="text-sm font-medium text-emerald-800">
          Cadastro confirmado! Você receberá o versículo diariamente.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="mx-6 md:mx-10 mb-8">
      <label className="flex items-center gap-2 text-base font-medium text-brand-ink mb-2">
        <Mail className="size-4" />
        Receba o versículo todo dia no seu e-mail
      </label>
      <div className="flex gap-2">
        <input
          type="email"
          name="email"
          required
          placeholder="seu@email.com"
          disabled={isPending}
          className="flex-1 h-10 px-3 rounded-lg border border-brand-surface bg-brand-bg text-base text-brand-ink placeholder-brand-muted outline-none transition-all focus-visible:border-brand-primary focus-visible:ring-2 focus-visible:ring-brand-primary/10 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending}
          className="h-10 px-4 rounded-lg bg-brand-primary text-base font-medium text-white transition-all hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? "Enviando..." : "Receber diariamente"}
        </button>
      </div>
      {state?.error && (
        <p className="flex items-center gap-1.5 mt-2 text-sm text-red-600">
          <AlertCircle className="size-4" />
          {state.error}
        </p>
      )}
    </form>
  );
}
