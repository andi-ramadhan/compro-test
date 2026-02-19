import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });

      //save token to localStorage
      localStorage.setItem("token", response.data.token);

      //redirect to dashboard
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("Terjadi kesalahan, coba lagi");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-neutral-100">
          {/* header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black italic tracking-tighter text-neutral-900">
              LOREM<span className="text-emerald-500">IPSUM</span>
            </h1>
            <p className="text-neutral-500 mt-2">Admin Panel Login</p>
          </div>

          {/* error message */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
              {error}
            </div>
          )}

          {/* login form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-neutral-900"
                placeholder="Masukkan username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-neutral-900"
                placeholder="Masukkan password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
