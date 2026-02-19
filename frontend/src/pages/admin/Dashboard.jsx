import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaTimes } from "react-icons/fa";
import axios from "axios";

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", author: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/admin");
      return;
    }
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blogs");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin");
  };

  const openAddForm = () => {
    setEditingBlog(null);
    setFormData({ title: "", content: "", author: "" });
    setFormError("");
    setShowForm(true);
  };

  const openEditForm = (blog) => {
    setEditingBlog(blog);
    setFormData({ title: blog.title, content: blog.content, author: blog.author || "" });
    setFormError("");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBlog(null);
    setFormData({ title: "", content: "", author: "" });
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError("");

    try {
      const headers = { Authorization: `Bearer ${token}` };

      if (editingBlog) {
        //update blog
        await axios.put(`/api/blogs/${editingBlog.id}`, formData, { headers });
      } else {
        //add new blog
        await axios.post("/api/blogs", formData, { headers });
      }

      closeForm();
      fetchBlogs(); //refresh list
    } catch (error) {
      console.error("Form submit error:", error);
      if (error.response && error.response.data) {
        setFormError(error.response.data.message);
      } else {
        setFormError("Terjadi kesalahan");
      }

      //if token expired, redirect to login
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/admin");
      }
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus blog ini?")) return;

    try {
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`/api/blogs/${id}`, { headers });
      fetchBlogs(); //refresh list
    } catch (error) {
      console.error("Delete error:", error);
      alert("Gagal menghapus blog");

      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        navigate("/admin");
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* top bar */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-black italic tracking-tighter text-neutral-900">
            LOREM<span className="text-emerald-500">IPSUM</span>
            <span className="text-sm font-normal text-neutral-400 ml-2 not-italic tracking-normal">
              Admin Dashboard
            </span>
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-neutral-500 hover:text-red-500 font-medium transition-colors text-sm"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">Blog Posts</h2>
            <p className="text-neutral-500 text-sm">{blogs.length} total posts</p>
          </div>
          <button
            onClick={openAddForm}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-300 flex items-center gap-2 text-sm"
          >
            <FaPlus /> Tambah Blog
          </button>
        </div>

        {/* blog list table */}
        {loading ? (
          <p className="text-neutral-500">Loading...</p>
        ) : blogs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
            <p className="text-neutral-400">Belum ada blog post. Klik "Tambah Blog" untuk memulai.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-50 border-b border-neutral-200">
                  <th className="text-left px-6 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider hidden md:table-cell">
                    Author
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider hidden md:table-cell">
                    Date
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-bold text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-neutral-900 text-sm">{blog.title}</div>
                    </td>
                    <td className="px-6 py-4 text-neutral-500 text-sm hidden md:table-cell">
                      {blog.author || "Admin"}
                    </td>
                    <td className="px-6 py-4 text-neutral-500 text-sm hidden md:table-cell">
                      {formatDate(blog.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => openEditForm(blog)}
                          className="p-2 text-neutral-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(blog.id)}
                          className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* modal header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-200">
              <h3 className="text-lg font-bold text-neutral-900">
                {editingBlog ? "Edit Blog" : "Tambah Blog Baru"}
              </h3>
              <button
                onClick={closeForm}
                className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-all"
              >
                <FaTimes />
              </button>
            </div>

            {/* modal body */}
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              {formError && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-neutral-900"
                  placeholder="Judul blog"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-neutral-900"
                  placeholder="Nama penulis"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-2">
                  Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-neutral-900 resize-y"
                  placeholder="Tulis konten blog di sini..."
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  className="px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-600 font-medium hover:bg-neutral-50 transition-all text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formLoading ? "Saving..." : editingBlog ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
