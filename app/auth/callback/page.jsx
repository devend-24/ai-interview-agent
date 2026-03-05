"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleLogin = async () => {
      // 1️⃣ Get logged in Supabase auth user
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("Auth error:", error);
        return router.push("/login");
      }

      // 2️⃣ Check if user exists in your custom "Users" table
      const { data: existingUser, error: fetchError } = await supabase
        .from("Users")
        .select("id, role")
        .eq("email", user.email)
        .single();

      // 3️⃣ If NOT exists → create new row
      if (fetchError || !existingUser) {
        const selectedRole =
          localStorage.getItem("selectedRole") || "candidate";

        const { data: newUser, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              name: user.user_metadata?.full_name || "",
              email: user.email,
              picture: user.user_metadata?.avatar_url || "",
              role: selectedRole,
            },
          ])
          .select()
          .single();

        if (insertError) {
          console.error("Insert error:", insertError.message);
          return;
        }

        localStorage.removeItem("selectedRole");

        // Redirect based on role
        if (selectedRole === "recruiter") {
          router.push("/dashboard");
        } else {
          router.push("/candidate/dashboard");
        }
      }
      // 4️⃣ Existing user
      else {
        if (existingUser.role === "recruiter") {
          router.push("/dashboard");
        } else {
          router.push("/candidate/dashboard");
        }
      }
    };

    handleLogin();
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-lg font-medium animate-pulse">
        Setting up your account...
      </p>
    </div>
  );
}