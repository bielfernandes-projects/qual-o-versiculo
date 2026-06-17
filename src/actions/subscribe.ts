"use server";

import { createClient } from "@/lib/supabase/server";

export async function subscribeToNewsletter(
  _prevState: { success?: boolean; error?: string } | null,
  formData: FormData,
) {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return { error: "E-mail inválido." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("subscribers")
    .insert({ email: email.trim().toLowerCase() });

  if (error) {
    if (error.code === "23505") {
      return { error: "Este e-mail já está cadastrado." };
    }
    return { error: "Erro ao cadastrar. Tente novamente." };
  }

  return { success: true };
}
