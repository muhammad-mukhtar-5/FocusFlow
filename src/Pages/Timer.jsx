import { useContext, useEffect, useRef, useState } from "react";
import { Clock3, Pause, Play, RotateCcw } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { saveToHistory } from "../utils/history";

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function Timer() {
  const { user } = useContext(AuthContext);
  const intervalRef = useRef(null);

  const [minutesInput, setMinutesInput] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);

  const radius = 84;
  const circumference = Number(2 * Math.PI * radius);
  const progress = totalTime > 0 ? time / totalTime : 0;
  const strokeDashoffset = circumference - progress * circumference;

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function setTimer() {
    const parsedMinutes = Number(minutesInput);

    if (!Number.isFinite(parsedMinutes) || parsedMinutes <= 0) {
      return;
    }

    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);

    const seconds = parsedMinutes * 60;
    setTime(seconds);
    setTotalTime(seconds);
  }

  function startTimer() {
    if (intervalRef.current || time <= 0) {
      return;
    }

    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setIsRunning(false);

          saveToHistory(user, {
            type: "timer",
            seconds: totalTime,
          });

          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }

  function resetTimer() {
    pauseTimer();
    setTime(0);
    setTotalTime(0);
    setMinutesInput("");
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 text-white sm:p-6 lg:p-8">
      <header className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Timer</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">Stay in a deep focus block</h1>
        <p className="max-w-2xl text-sm text-slate-400 sm:text-base">
          Set a countdown, start your session, and keep the controls easy to reach
          on smaller screens.
        </p>
      </header>

      <section className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Session setup</h2>
              <p className="mt-2 text-sm text-slate-400">
                Pick a duration in minutes, then start when you are ready.
              </p>
            </div>
            <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
              <Clock3 className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="number"
              min="1"
              inputMode="numeric"
              placeholder="Enter minutes"
              value={minutesInput}
              onChange={(event) => setMinutesInput(event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            />

            <button
              type="button"
              onClick={setTimer}
              className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Set timer
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-400">
            The countdown ring scales smoothly across mobile, tablet, and desktop.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={startTimer}
              disabled={time <= 0 || isRunning}
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Play className="h-4 w-4" />
              Start
            </button>
            <button
              type="button"
              onClick={pauseTimer}
              disabled={!isRunning}
              className="flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Pause className="h-4 w-4" />
              Pause
            </button>
            <button
              type="button"
              onClick={resetTimer}
              disabled={time === 0 && totalTime === 0}
              className="flex items-center justify-center gap-2 rounded-2xl bg-rose-500 px-4 py-3 font-semibold text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
          <div className="mx-auto flex max-w-sm flex-col items-center">
            <div className="relative h-64 w-64 max-w-full sm:h-72 sm:w-72">
              <svg viewBox="0 0 200 200" className="h-full w-full">
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="rgba(148, 163, 184, 0.25)"
                  strokeWidth="10"
                  fill="none"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="#22d3ee"
                  strokeWidth="10"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 100 100)"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Time left</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                  {formatTime(time)}
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  {totalTime > 0 ? `${Math.round(progress * 100)}% remaining` : "Set a timer to begin"}
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
