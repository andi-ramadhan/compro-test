import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCalendar, FaUser } from "react-icons/fa";
import axios from "axios";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/api/blogs/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.error("Error fetching blog:", error);
      setError("Blog tidak ditemukan");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-500 text-lg">{error || "Blog tidak ditemukan"}</p>
        <Link
          to="/"
          className="text-emerald-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
        >
          <FaArrowLeft /> Kembali ke Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-emerald-600 font-medium mb-8 transition-colors"
        >
          <FaArrowLeft /> Kembali
        </Link>

        {/* blog header */}
        <article>
          <div className="mb-8">
            <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-semibold">
              Blog
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter mb-6 text-neutral-900">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6 text-neutral-400 text-sm mb-8 pb-8 border-b border-neutral-200">
            <span className="flex items-center gap-2">
              <FaUser className="text-emerald-500" />
              {blog.author || "Admin"}
            </span>
            <span className="flex items-center gap-2">
              <FaCalendar className="text-emerald-500" />
              {formatDate(blog.created_at)}
            </span>
          </div>

          {/* blog content */}
          <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>
        </article>
      </div>
    </div>
  );
}
