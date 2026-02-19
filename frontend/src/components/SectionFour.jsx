import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaNewspaper, FaArrowRight, FaFilter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

export default function SectionFour() {
  const [blogs, setBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [sort, setSort] = useState("newest");
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, [selectedAuthor, sort]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = { sort };
      if (selectedAuthor) params.author = selectedAuthor;

      const response = await axios.get("/api/blogs", { params });
      setBlogs(response.data.data.blogs.slice(0, 6));
      setAuthors(response.data.data.authors);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
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

  //hide section if no blogs at all
  if (!loading && blogs.length === 0 && !selectedAuthor) {
    return null;
  }

  return (
    <section className="relative w-full py-24 px-10 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-white/50 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -mr-40 -mb-40"></div>

      <div className="max-w-6xl mx-auto">
        {/* header */}
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-xl mb-6 mx-auto shadow-lg shadow-emerald-200">
            <FaNewspaper />
          </div>
          <h2 className="text-5xl font-black italic tracking-tighter mb-4">
            LATEST <span className="text-emerald-500">BLOG</span>
          </h2>
          <div className="w-20 h-1.5 bg-neutral-950 mx-auto rounded-full"></div>
        </div>

        {/* filter bar */}
        <div className="flex flex-wrap items-center gap-3 mb-10 justify-center">
          <div className="flex items-center gap-2 text-neutral-500 text-sm font-semibold">
            <FaFilter className="text-emerald-500" />
            Filter:
          </div>

          {/* sort filter */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-4 py-2 rounded-full border border-neutral-200 bg-white text-neutral-700 text-sm font-medium focus:outline-none focus:border-emerald-400 cursor-pointer"
          >
            <option value="newest">Terbaru</option>
            <option value="oldest">Terlama</option>
          </select>

          {/* author filter */}
          {authors.length > 0 && (
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="px-4 py-2 rounded-full border border-neutral-200 bg-white text-neutral-700 text-sm font-medium focus:outline-none focus:border-emerald-400 cursor-pointer"
            >
              <option value="">Semua Penulis</option>
              {authors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          )}

          {/* reset filter button*/}
          {selectedAuthor && (
            <button
              onClick={() => setSelectedAuthor("")}
              className="px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-sm font-medium transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        {/* loading state */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-neutral-400">Loading...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-400">Tidak ada blog dari penulis ini.</p>
          </div>
        ) : (
          <div className="relative px-2">
            {/* nav buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg border border-neutral-200 rounded-full flex items-center justify-center text-neutral-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all -ml-2 md:-ml-5"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg border border-neutral-200 rounded-full flex items-center justify-center text-neutral-600 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all -mr-2 md:-mr-5"
            >
              <FaChevronRight />
            </button>

            {/* scroll container */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-6 md:gap-8 pb-8 snap-x no-scrollbar"
            >
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  to={`/blog/${blog.id}`}
                  className="shrink-0 w-[250px] md:w-[320px] snap-start group bg-white/60 backdrop-blur-sm rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-xl hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1"
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

                    <p className="text-neutral-500 text-sm leading-relaxed mb-4 line-clamp-2">
                      {blog.content}
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
        )}
      </div>
    </section>
  );
}
