import { useState, useEffect, useRef } from "react";
import {
  Image as ImageIcon,
  Send,
  Heart,
  MessageSquare,
  Share2,
  Trash2,
  MoreVertical,
  Pencil,
  Bookmark,
  Loader2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { deleteFeed, editFeed, getFeeds, postFeed } from "../../api/post";
import { getLikesByPost, likePost, unlikePost } from "../../api/like";
import { useAuth } from "../../hooks/useAuth";

const formatRelativeTime = (dateValue) => {
  if (!dateValue) return "Recently";

  const timestamp = new Date(dateValue).getTime();
  if (Number.isNaN(timestamp)) return "Recently";

  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
  return `${Math.floor(seconds / 31536000)}y ago`;
};

export default function Feed() {
  const [postText, setPostText] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likingPostIds, setLikingPostIds] = useState(new Set());
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [openMenuPostId, setOpenMenuPostId] = useState(null);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editText, setEditText] = useState("");

  // Lightbox Modal State
  const [activeModal, setActiveModal] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchPosts();
    // fetchPosts intentionally runs when the signed-in user changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  // Keyboard navigation for full-screen image lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activeModal.isOpen) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeModal]);

  async function fetchPosts() {
    try {
      setLoading(true);
      setError(null);
      const response = await getFeeds();
      const fetchedPosts = response.data?.data || response.data || [];
      const postsWithLikeState = await Promise.all(
        (Array.isArray(fetchedPosts) ? fetchedPosts : []).map(async (post) => {
          const postId = post._id || post.id;
          if (!postId || !user?.id) return post;

          try {
            const likesResponse = await getLikesByPost(postId);
            const likesData =
              likesResponse?.data?.data || likesResponse?.data || likesResponse;
            const likes = Array.isArray(likesData?.likes) ? likesData.likes : [];
            const likeCount = likesData?.count;

            return {
              ...post,
              isLiked: likes.some(
                (like) => like.userId === user.id || like.user?.id === user.id,
              ),
              ...(typeof likeCount === "number"
                ? {
                    likes: likeCount,
                    _count: { ...post._count, likes: likeCount },
                  }
                : {}),
            };
          } catch (err) {
            console.error(`Failed to load likes for post ${postId}:`, err);
            return post;
          }
        }),
      );
      setPosts(postsWithLikeState);
    } catch (err) {
      console.error("Failed to fetch posts:", err);
      setError("Unable to load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length + imageFiles.length > 5) {
      alert("You can only upload a maximum of 5 images per post.");
      return;
    }

    const updatedFiles = [...imageFiles, ...selectedFiles].slice(0, 5);
    setImageFiles(updatedFiles);

    const previews = updatedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);

    if (updatedFiles.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearAllImages = () => {
    setImageFiles([]);
    setImagePreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if ((!postText.trim() && imageFiles.length === 0) || isSubmitting) return;

    try {
      setIsSubmitting(true);

      let payload;
      if (imageFiles.length > 0) {
        payload = new FormData();
        payload.append("content", postText);
        imageFiles.forEach((file) => {
          payload.append("images", file);
        });
      } else {
        payload = { content: postText };
      }

      const response = await postFeed(payload);
      const createdPost = response.data?.data || response.data || response;
      const postWithAuthor = {
        ...createdPost,
        user: createdPost.user || user,
        userId: createdPost.userId || user?.id,
        isLiked: false,
        _count: { likes: 0, comments: 0, ...createdPost._count },
      };

      setPosts((prevPosts) => [postWithAuthor, ...prevPosts]);
      setPostText("");
      clearAllImages();
    } catch (err) {
      console.error("Failed to create post:", err);
      alert("Failed to publish your yap.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFeed(id);
      setPosts((prevPosts) =>
        prevPosts.filter((post) => (post._id || post.id) !== id),
      );
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Could not delete post.");
    }
  };

  const startEditing = (post) => {
    setEditingPostId(post._id || post.id);
    setEditText(post.content || "");
    setOpenMenuPostId(null);
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditText("");
  };

  const handleEdit = async (postId) => {
    if (!editText.trim()) return;

    try {
      const response = await editFeed(postId, { content: editText.trim() });
      const updatedPost = response.data?.data || response.data || response;
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          (post._id || post.id) === postId
            ? { ...post, ...updatedPost, content: updatedPost.content || editText.trim() }
            : post,
        ),
      );
      cancelEditing();
    } catch (err) {
      console.error("Failed to edit post:", err);
      alert("Could not edit Yap.");
    }
  };

  const handleLikeToggle = async (postId, isLiked) => {
    if (!postId || likingPostIds.has(postId)) return;

    const previousPosts = posts;
    const currentPost = posts.find((post) => (post._id || post.id) === postId);
    const currentCount = currentPost?._count?.likes ?? currentPost?.likes ?? 0;
    const nextCount = Math.max(0, currentCount + (isLiked ? -1 : 1));

    setLikingPostIds((ids) => new Set(ids).add(postId));
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        (post._id || post.id) === postId
          ? {
              ...post,
              isLiked: !isLiked,
              likes: nextCount,
              _count: { ...post._count, likes: nextCount },
            }
          : post,
      ),
    );

    try {
      if (isLiked) await unlikePost(postId);
      else await likePost(postId);
    } catch (err) {
      console.error("Failed to update like state:", err);
      setPosts(previousPosts);
    } finally {
      setLikingPostIds((ids) => {
        const nextIds = new Set(ids);
        nextIds.delete(postId);
        return nextIds;
      });
    }
  }

  // Lightbox Modal Controls
  const openModal = (images, index) => {
    setActiveModal({
      isOpen: true,
      images,
      currentIndex: index,
    });
  };

  function closeModal() {
    setActiveModal({ isOpen: false, images: [], currentIndex: 0 });
  }

  function prevImage() {
    setActiveModal((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex === 0
          ? prev.images.length - 1
          : prev.currentIndex - 1,
    }));
  }

  function nextImage() {
    setActiveModal((prev) => ({
      ...prev,
      currentIndex:
        prev.currentIndex === prev.images.length - 1
          ? 0
          : prev.currentIndex + 1,
    }));
  }

  const getGridClass = (count) => {
    if (count === 1) return "grid-cols-1";
    if (count === 5) return "grid-cols-3";
    return "grid-cols-2";
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageFileSelect}
        accept="image/*"
        multiple
        className="hidden"
      />

      {/* Create Post Input Card */}
      <div className="p-4 rounded-2xl bg-white/70 dark:bg-neutral-900/80 border border-black/10 dark:border-neutral-800 backdrop-blur-xl shadow-sm dark:shadow-xl transition-colors">
        <form onSubmit={handlePostSubmit}>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="What's happening? Start yapping..."
            rows={3}
            className="w-full bg-transparent resize-none outline-none text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 leading-relaxed"
          />

          {/* Multi-Image Upload Previews */}
          {imagePreviews.length > 0 && (
            <div
              className={`grid gap-1.5 my-3 rounded-2xl overflow-hidden border border-black/10 dark:border-neutral-800 ${getGridClass(
                imagePreviews.length,
              )}`}
            >
              {imagePreviews.map((src, index) => (
                <div
                  key={index}
                  className={`relative group bg-neutral-100 dark:bg-neutral-950 overflow-hidden ${
                    imagePreviews.length === 1
                      ? "max-h-[420px]"
                      : imagePreviews.length === 5 && index < 2
                        ? "h-40 col-span-1"
                        : "h-36"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Upload preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors backdrop-blur-md"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-neutral-800">
            <button
              type="button"
              disabled={imageFiles.length >= 5}
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold transition-colors disabled:opacity-40"
            >
              <ImageIcon className="w-4 h-4" />
              <span>
                {imageFiles.length > 0
                  ? `${imageFiles.length}/5 Media`
                  : "Media"}
              </span>
            </button>

            <button
              type="submit"
              disabled={
                (!postText.trim() && imageFiles.length === 0) || isSubmitting
              }
              className="flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all active:scale-95 shadow-lg shadow-indigo-600/30"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>Yap</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {loading && (
        <div className="flex justify-center py-10">
          <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-xs text-center">
          {error}
        </div>
      )}

      {/* Feed List */}
      {!loading && (
        <div className="space-y-3">
          {posts.map((post) => {
            const postId = post._id || post.id;
            const authorId = post.userId || post.user?.id || post.authorId;
            const isOwnPost = Boolean(user?.id && authorId === user.id);
            const authorName =
              post.user?.name || post.authorName || post.author || "Yapper";
            const username =
              post.user?.username || post.username || `@${authorName.toLowerCase().replace(/\s+/g, "")}`;

            const postImages = post.images?.length
              ? post.images.map((img) =>
                  typeof img === "string" ? img : img.url || img.path,
                )
              : post.image || post.imageUrl
                ? [post.image || post.imageUrl]
                : [];

            return (
              <article
                key={postId}
                className="p-5 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-black/10 dark:border-neutral-800/80 hover:border-black/20 dark:hover:border-neutral-700/80 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
                      {authorName[0]?.toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 leading-tight">
                        {authorName}
                      </h4>
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        {username}
                      </span>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-2">
                    <span className="text-xs text-neutral-400 dark:text-neutral-500">
                      {formatRelativeTime(post.createdAt)}
                    </span>
                    <button
                      onClick={() =>
                        setOpenMenuPostId((currentId) =>
                          currentId === postId ? null : postId,
                        )
                      }
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                      title="Post options"
                      aria-label="Post options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    {openMenuPostId === postId && (
                      <div className="absolute right-0 top-8 z-10 min-w-36 overflow-hidden rounded-xl border border-black/10 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-xl">
                        {isOwnPost ? (
                          <>
                            <button
                              onClick={() => startEditing(post)}
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setOpenMenuPostId(null);
                                handleDelete(postId);
                              }}
                              className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-red-500 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => setOpenMenuPostId(null)}
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-neutral-700 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10"
                          >
                            <Bookmark className="w-3.5 h-3.5" />
                            Save post
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {editingPostId === postId ? (
                  <div className="mb-3 space-y-2">
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      rows={3}
                      autoFocus
                      className="w-full resize-none rounded-xl border border-indigo-500/40 bg-transparent p-3 text-sm leading-relaxed text-neutral-800 outline-none dark:text-neutral-200"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={cancelEditing}
                        className="rounded-lg px-3 py-1.5 text-xs text-neutral-500 hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleEdit(postId)}
                        disabled={!editText.trim()}
                        className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                ) : post.content ? (
                  <p className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 mb-3 whitespace-pre-line">
                    {post.content}
                  </p>
                ) : null}

                {/* Clickable Image Grid */}
                {postImages.length > 0 && (
                  <div
                    className={`grid gap-1.5 mb-3 rounded-2xl overflow-hidden border border-black/10 dark:border-neutral-800 ${getGridClass(
                      postImages.length,
                    )}`}
                  >
                    {postImages.map((src, idx) => (
                      <div
                        key={idx}
                        onClick={() => openModal(postImages, idx)}
                        className={`cursor-pointer overflow-hidden group bg-neutral-100 dark:bg-neutral-950 transition-colors ${
                          postImages.length === 1
                            ? "max-h-[420px]"
                            : postImages.length === 5 && idx < 2
                              ? "h-40 col-span-1"
                              : "h-36"
                        }`}
                      >
                        <img
                          src={src}
                          alt="Attachment"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-8 pt-3 border-t border-black/5 dark:border-neutral-800/60 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  {/* Heart Button */}
                  <button
                    onClick={() => handleLikeToggle(postId, Boolean(post.isLiked))}
                    disabled={likingPostIds.has(postId)}
                    className={`flex items-center gap-2 transition-colors active:scale-95 ${
                      post.isLiked
                        ? "text-rose-500"
                        : "hover:text-rose-500 dark:hover:text-rose-400"
                    } disabled:opacity-50`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-all ${
                        post.isLiked ? "fill-current text-rose-500" : ""
                      }`}
                    />
                    <span>{post._count?.likes ?? post.likes ?? 0}</span>
                  </button>

                  <button className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post._count?.comments || post.comments || 0}</span>
                  </button>

                  <button className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ml-auto">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Full Screen Image Modal */}
      {activeModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {activeModal.images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div className="max-w-5xl max-h-[85vh] p-4 flex items-center justify-center">
            <img
              src={activeModal.images[activeModal.currentIndex]}
              alt="Expanded view"
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
          </div>

          {activeModal.images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 p-3 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {activeModal.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-neutral-900/80 text-white text-xs font-semibold">
              {activeModal.currentIndex + 1} / {activeModal.images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
