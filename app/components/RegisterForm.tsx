"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return setError("Isi form terlebih dahulu");
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        router.push("/");
      } else {
        setError("Terjadi kesalahan pada register");
      }
    } catch (error) {}
  };

  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="border p-5 rounded-lg shadow-lg border-t-slate-800 border-t-4">
        <h1 className="font-bold text-3xl text-slate-800 mb-5">Register</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Name"
            name="name"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-slate-800 text-white rounded-md py-2 font-semibold text-lg border shadow-lg border-slate-800 hover:bg-white hover:text-slate-800 transition-all ease-out duration-300"
          >
            Register
          </button>

          {error && (
            <div className="p-2 bg-red-500 w-fit rounded-md text-white text-sm">
              <p>{error}</p>
            </div>
          )}

          <div className="text-end text-sm">
            <p>
              Have An Account?{" "}
              <Link href={"/"} className="underline font-semibold">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
