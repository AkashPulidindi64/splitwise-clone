"use client";

import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const response = await fetch(
      "/api/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data =
      await response.json();

    console.log(data);

    alert("Signup Successful");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-300">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Sign Up
        </h1>

        <form
          onSubmit={handleSignup}
          className="space-y-4"
        >
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-3 border-2 border-gray-400 rounded-lg"
          />

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 border-2 border-gray-400 rounded-lg"
          />

          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full p-3 border-2 border-gray-400 rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-lg"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}