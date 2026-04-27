import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await signin({ email, password });
      toast.success("Signed in");
      navigate("/");
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
        <p className="text-sm text-gray-500 mt-1">Sign in to manage bookings and list rooms.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={submitting}
            type="submit"
            className="w-full rounded-lg bg-black text-white py-2.5 font-medium hover:bg-black/90 transition disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-5">
          Don’t have an account?{" "}
          <Link to="/signup" className="font-medium text-black underline underline-offset-4">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

