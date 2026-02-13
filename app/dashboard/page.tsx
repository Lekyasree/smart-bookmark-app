
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const router = useRouter();

  // Get logged-in user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/");
      } else {
        setUser(data.user);
        fetchBookmarks();
      }
    };

    getUser();
  }, []);

  // Fetch bookmarks (RLS handles user filtering)
  const fetchBookmarks = async () => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setBookmarks(data || []);
    }
  };

  // Add bookmark
  const addBookmark = async () => {
    if (!title || !url || !user) return;

    const { error } = await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    if (!error) {
      setTitle("");
      setUrl("");
      fetchBookmarks();
    }
  };

  // Delete bookmark
  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    fetchBookmarks();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (!user) return <div className="p-10">Loading...</div>;
return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">

    <div className="max-w-4xl mx-auto bg-blue-50 rounded-3xl shadow-xl p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-semibold text-indigo-800">
          Welcome {user.email}
        </h1>

        <button
          onClick={handleLogout}
          className="bg-indigo-500 text-white px-5 py-2 rounded-xl hover:bg-indigo-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Add Bookmark Section */}
      <div className="grid gap-4 mb-10">

        <input
          type="text"
          placeholder="Website Title"
          className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 font-semibold"
          //className="bg-purple-50 border border-purple-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="https://example.com"
          className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 font-semibold"
         // className="bg-purple-50 border border-purple-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-300"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={addBookmark}
          className="bg-pink-400 text-white py-3 rounded-xl hover:bg-pink-500 transition"
        >
          Add Bookmark
        </button>
      </div>

      {/* Bookmark List */}
      <div className="grid gap-4">

        {bookmarks.length === 0 && (
          <p className="text-indigo-700 text-center">
            No bookmarks yet.
          </p>
        )}

        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            //className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 font-semibold"
            className="flex justify-between items-center bg-purple-100 p-4 rounded-xl hover:bg-purple-200 transition"
          >
            <div>
              <a
                href={bookmark.url}
                target="_blank"
                className="font-medium text-indigo-700 hover:underline"
              // className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 font-semibold"
              >
                {bookmark.title}
              </a>
              <p className="text-xs text-indigo-600 mt-1">

                {bookmark.url}
              </p>
            </div>

            <button
              onClick={() => deleteBookmark(bookmark.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}

      </div>

    </div>
  </div>
);
}

