import React, { useState } from "react";
import { Image, Tag, Send, Heart, MessageSquare, Share2 } from "lucide-react";

export default function Feed() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Mizu",
      username: "@mizu",
      time: "2h ago",
      content:
        "Just finished setting up the new glassy dark mode UI. The indigo glow effects look incredible with backdrop-blur! 🚀",
      likes: 12,
      comments: 3,
      isLiked: false,
    },
    {
      id: 2,
      author: "Sengly",
      username: "@sengly",
      time: "5h ago",
      content:
        "Building full-stack apps with React, Tailwind, and Node is so satisfying when the design system finally clicks into place.",
      likes: 24,
      comments: 8,
      isLiked: true,
    },
  ]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: "You",
      username: "@you",
      time: "Just now",
      content: postText,
      likes: 0,
      comments: 0,
      isLiked: false,
    };

    setPosts([newPost, ...posts]);
    setPostText("");
  };

  const toggleLike = (id) => {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      }),
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Create Post Input Box */}
      <div
        className="p-5 rounded-2xl backdrop-blur-xl border transition-all duration-300
        bg-white/70 border-black/10 shadow-sm
        dark:bg-white/[0.03] dark:border-white/10 dark:shadow-2xl"
      >
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's on your mind? Start yapping..."
            rows={3}
            className="w-full bg-transparent resize-none outline-none text-sm leading-relaxed
              text-neutral-900 placeholder:text-neutral-400
              dark:text-neutral-100 dark:placeholder:text-neutral-500"
          />

          <div className="flex items-center justify-between pt-3 mt-2 border-t border-black/5 dark:border-white/10">
            <div className="flex gap-1 text-neutral-500 dark:text-neutral-400 text-xs font-medium">
              <button
                type="button"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <Image className="w-4 h-4 text-indigo-500" />
                <span>Media</span>
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <Tag className="w-4 h-4 text-indigo-500" />
                <span>Tag</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={!postText.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200
                bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600
                shadow-[0_0_20px_rgba(99,102,241,0.3)] active:scale-95"
            >
              <span>Yap</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="p-5 rounded-2xl backdrop-blur-xl border transition-all duration-300
              bg-white/60 border-black/10 hover:border-black/20
              dark:bg-white/[0.02] dark:border-white/10 dark:hover:border-white/20"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-300 flex items-center justify-center font-bold text-white text-xs shadow-md">
                  {post.author[0]}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
                    {post.author}
                  </h4>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {post.username}
                  </span>
                </div>
              </div>
              <span className="text-xs text-neutral-400">{post.time}</span>
            </div>

            {/* Post Content */}
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 mb-4">
              {post.content}
            </p>

            {/* Post Actions */}
            <div className="flex items-center gap-6 pt-3 border-t border-black/5 dark:border-white/5 text-xs font-medium">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1.5 transition-colors ${
                  post.isLiked
                    ? "text-indigo-600 dark:text-indigo-400 font-bold"
                    : "text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${
                    post.isLiked ? "fill-indigo-600 dark:fill-indigo-400" : ""
                  }`}
                />
                <span>{post.likes}</span>
              </button>

              <button className="flex items-center gap-1.5 text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments}</span>
              </button>

              <button className="flex items-center gap-1.5 text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-auto">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
