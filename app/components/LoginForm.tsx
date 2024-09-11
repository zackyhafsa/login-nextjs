"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      return setError("isi form terlebih dahulu");
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 200) {
        const users = await res.json();
        return router.push(`/dashboard/${users.user.id}`);
      }

      const user = await res.json();
      if (email !== user.email) {
        return setError("email salah");
      } else if (password !== user.password) {
        return setError("Password salah");
      }
    } catch (error) {}
  };

  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="border p-5 rounded-lg shadow-lg border-t-slate-800 border-t-4">
        <h1 className="font-bold text-3xl text-slate-800 mb-5">Login</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            name="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-slate-800 text-white rounded-md py-2 font-semibold text-lg border shadow-lg border-slate-800 hover:bg-white hover:text-slate-800 transition-all ease-out duration-300"
          >
            Login
          </button>

          {error && (
            <div className="p-2 bg-red-500 w-fit rounded-md text-white text-sm">
              <p>{error}</p>
            </div>
          )}

          <div className="text-end text-sm">
            <p>
              Don't Have An Account?{" "}
              <Link href={"/register"} className="underline font-semibold">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
