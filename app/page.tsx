
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/dashboard");
      }
    };

    checkUser();
  }, [router]);

  // Google Login
  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://smart-bookmark-app-johu.vercel.app/dashboard",
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-purple-800">
          Smart Bookmark Hub
        </h1>

        <p className="text-gray-600 mb-6">
          Organize your favorite websites beautifully ✨
        </p>

        <button
          onClick={loginWithGoogle}
          className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
