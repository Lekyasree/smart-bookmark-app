
"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100">
//       <button
//         onClick={handleLogin}
//         className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
//       >
//         Sign in with Google
//       </button>
//     </div>
//   );
// }
// 
return (
  <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 flex items-center justify-center p-6">

    <div className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-md text-center">

      <h1 className="text-3xl font-bold mb-3 text-purple-800 tracking-wide">
        Smart Bookmark Hub
      </h1>

      <p className="text-purple-700 mb-8 text-sm">
        Organize your favorite websites beautifully ✨
      </p>

      <button
        onClick={loginWithGoogle}
        className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 font-semibold"
      >
        Continue with Google
      </button>

    </div>
  </div>
);
}
