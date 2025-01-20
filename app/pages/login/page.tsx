"use client";
import React, { useState, useEffect } from "react";
import GetSession from "@/component/getsession";
import { useRouter } from "next/navigation";
import { FaUser, FaKey, FaGithub, FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { CredentialSignIn } from "@/component/signIn";
import { signIn } from "next-auth/react";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRouter();

  
  const CheckSession = async () => {
    const session = await GetSession();
    console.log("The session is", session);
    if (session?.user) route.replace("/pages/dashboard");
  };

  useEffect(() => {
    CheckSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;

    const response = await CredentialSignIn(email, password);

    if (response?.status === 400) {
      setError(response.message);
      setLoading(false);
      setTimeout(() => setError(null), 5000); 
    } else {
      route.push("/pages/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 shadow-lg rounded-lg bg-white">
        <h1 className="text-3xl font-semibold text-center flex items-center justify-center text-black mb-6">
          <FaUser className="mr-2" />
          Login
        </h1>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-md">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="border text-sm text-black w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              placeholder="Enter your email"
              id="email"
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="border text-sm text-black w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              placeholder="Enter your password"
              id="password"
              required
            />
          </div>
          <button
            className="w-full bg-gray-800 text-white py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 mt-2 hover:bg-blue-700 transition disabled:bg-gray-400"
            type="submit"
            disabled={loading}
          >
            <FaKey className="mr-2" />
            {loading ? "Signing in..." : "Sign in with Credentials"}
          </button>
        </form>
        <div className="mt-2">
          <button
            className="w-full bg-gray-800 text-white py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 mt-2 hover:bg-gray-900 transition"
            type="button"
            onClick={() => signIn("github")}
          >
            <FaGithub />
            <span>Sign in with GitHub</span>
          </button>
          <button
            className="w-full bg-gray-800 text-white py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 hover:bg-gray-900 transition mt-2"
            type="button"
            onClick={() => signIn("google")}
          >
            <FaGoogle />
            <span>Sign in with Google</span>
          </button>
        </div>
        <div className="mt-6 text-center text-sm text-gray-700">
          <p>
            Don't have an account?{" "}
            <Link href="/pages/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
