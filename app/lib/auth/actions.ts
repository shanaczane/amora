"use server";

import { createServerSupabaseClient } from "@/app/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm_password") as string;
  const username = formData.get("username") as string;

  const supabase = await createServerSupabaseClient();

  // Check if username already exists
  const { data: existingUsername } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username.trim())
    .single();

  if (existingUsername) {
    return { error: "username", message: "This username is already taken" };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    if (error.message.includes("already registered")) {
      return { error: "email", message: "This email is already registered" };
    }
    return { error: "email", message: error.message };
  }

  // Create profile with username
  if (data.user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: data.user.id,
      username: username.trim(),
    });

    if (profileError) {
      return { error: "username", message: "Failed to create profile" };
    }
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signIn(formData: FormData) {
  const emailOrUsername = formData.get("email_or_username") as string;
  const password = formData.get("password") as string;

  const supabase = await createServerSupabaseClient();

  let email = emailOrUsername;

  // Check if input is a username (no @ symbol)
  if (!emailOrUsername.includes("@")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("user_id")
      .eq("username", emailOrUsername.trim())
      .single();

    if (!profile) {
      return { error: "email_or_username", message: "Username not found" };
    }

    // Get email from auth
    const {
      data: { user },
    } = (await supabase.auth.admin?.getUserById)
      ? await supabase.auth.admin.getUserById(profile.user_id)
      : { data: { user: null } };

    if (!user?.email) {
      return { error: "email_or_username", message: "Account not found" };
    }

    email = user.email;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    if (error.message.includes("Invalid login credentials")) {
      return {
        error: "password",
        message: "Incorrect email/username or password",
      };
    }
    return { error: "password", message: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}
