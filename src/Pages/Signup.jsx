import { useContext, useState } from "react";
import { ArrowRight, CheckCircle2, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export default function Signup() {
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const result = signup(username, password);

    if (result.success) {
      navigate("/login");
    } else {
      alert(result.message);
    }
  }

  return (
    <main className="min-h-dvh bg-slate-950 px-4 py-6 text-white sm:px-6 lg:min-h-full lg:overflow-y-auto lg:px-8">
      <section className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl lg:grid-cols-[0.95fr,1.05fr]">
        <div className="flex flex-col justify-between gap-8 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 p-6 sm:p-8 lg:p-10">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-emerald-300">FocusFlow</p>
            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Create your focus workspace.
            </h1>
            <p className="mt-4 max-w-md text-sm text-slate-300 sm:text-base">
              Sign up once, then keep your timers, task completions, and activity
              history organized in one place.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl border border-slate-700/80 bg-slate-950/30 p-4">
              <div className="flex items-center gap-3 text-emerald-300">
                <UserPlus className="h-5 w-5" />
                <p className="font-semibold text-white">Quick setup</p>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                Create an account in seconds and start tracking immediately.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700/80 bg-slate-950/30 p-4">
              <div className="flex items-center gap-3 text-sky-300">
                <CheckCircle2 className="h-5 w-5" />
                <p className="font-semibold text-white">Works everywhere</p>
              </div>
              <p className="mt-2 text-sm text-slate-300">
                The layout stays clear whether you are on a small phone or a large screen.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center p-6 sm:p-8 lg:p-10">
          <div className="w-full max-w-md">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Get started</p>
            <h2 className="mt-3 text-3xl font-semibold">Create account</h2>
            <p className="mt-3 text-sm text-slate-400">
              Fill in your details to start using FocusFlow.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Username</span>
                <input
                  type="text"
                  required
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Password</span>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Confirm password</span>
                <input
                  type="password"
                  required
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-white outline-none transition focus:border-emerald-400"
                />
              </label>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Sign up
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <p className="mt-6 text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-emerald-300 hover:text-emerald-200">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
