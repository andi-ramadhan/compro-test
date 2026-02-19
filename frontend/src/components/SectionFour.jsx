import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaNewspaper, FaArrowRight } from "react-icons/fa";
import axios from "axios";

export default function SectionFour() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs");
      setBlogs(response.data.slice(0, 3));
    } catch (error) {
      console.error("Error fetching blogs:", error);
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

  const getExcerpt = (content, maxLength = 120) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <section className="w-full py-24 px-10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-neutral-500">Loading blogs...</p>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full py-24 px-10 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-white/50 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -mr-40 -mb-40"></div>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-xl mb-6 mx-auto shadow-lg shadow-emerald-200">
            <FaNewspaper />
          </div>
          <h2 className="text-5xl font-black italic tracking-tighter mb-4">
            LATEST <span className="text-emerald-500">BLOG</span>
          </h2>
          <div className="w-20 h-1.5 bg-neutral-950 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.id}`}
              className="group bg-white/60 backdrop-blur-sm rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-2 bg-linear-to-r from-emerald-400 to-emerald-600"></div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-3">
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full font-semibold">
                    Blog
                  </span>
                  <span>{formatDate(blog.created_at)}</span>
                </div>

                <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-neutral-500 text-sm leading-relaxed mb-4">
                  {getExcerpt(blog.content)}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-400">
                    by {blog.author || "Admin"}
                  </span>
                  <span className="text-emerald-600 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read More <FaArrowRight className="text-xs" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
