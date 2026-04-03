import { useContext, useEffect, useRef, useState } from "react";
import { Flag, Pause, Play, RotateCcw, TimerReset } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { saveToHistory } from "../utils/history";

function formatClock(hours, minutes, seconds) {
  return [hours, minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export default function Stopwatch() {
  const { user } = useContext(AuthContext);
  const intervalRef = useRef(null);

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function start() {
    if (intervalRef.current) {
      return;
    }

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 59) {
          setMinutes((currentMinutes) => {
            if (currentMinutes === 59) {
              setHours((currentHours) => currentHours + 1);
              return 0;
            }

            return currentMinutes + 1;
          });

          return 0;
        }

        return prev + 1;
      });
    }, 1000);
  }

  function pause() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  }

  function reset() {
    const elapsedSeconds = hours * 3600 + minutes * 60 + seconds;

    pause();

    if (elapsedSeconds > 0) {
      saveToHistory(user, {
        type: "stopwatch",
        seconds: elapsedSeconds,
      });
    }

    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setLaps([]);
  }

  function addLap() {
    setLaps((prev) => [...prev, formatClock(hours, minutes, seconds)]);
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 text-white sm:p-6 lg:p-8">
      <header className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.24em] text-emerald-300">Stopwatch</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Track open-ended work sessions
        </h1>
        <p className="max-w-2xl text-sm text-slate-400 sm:text-base">
          The timer display, control buttons, and lap history all adapt cleanly as
          the screen gets narrower.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">Current session</h2>
              <p className="mt-2 text-sm text-slate-400">
                Start, pause, lap, or reset without losing usable space on mobile.
              </p>
            </div>
            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-300">
              <TimerReset className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-950/40 px-4 py-8 text-center sm:px-6">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Elapsed time</p>
            <h2 className="mt-4 break-all font-mono text-4xl font-semibold tracking-[0.18em] sm:text-6xl lg:text-7xl">
              {formatClock(hours, minutes, seconds)}
            </h2>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <button
              type="button"
              onClick={start}
              disabled={isRunning}
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Play className="h-4 w-4" />
              Start
            </button>
            <button
              type="button"
              onClick={pause}
              disabled={!isRunning}
              className="flex items-center justify-center gap-2 rounded-2xl bg-amber-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Pause className="h-4 w-4" />
              Pause
            </button>
            <button
              type="button"
              onClick={reset}
              disabled={hours === 0 && minutes === 0 && seconds === 0 && laps.length === 0}
              className="flex items-center justify-center gap-2 rounded-2xl bg-rose-500 px-4 py-3 font-semibold text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
            <button
              type="button"
              onClick={addLap}
              disabled={hours === 0 && minutes === 0 && seconds === 0}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-600 bg-slate-950/40 px-4 py-3 font-semibold text-white transition hover:border-emerald-400 hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Flag className="h-4 w-4" />
              Lap
            </button>
          </div>
        </article>

        <aside className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Laps</h2>
          <p className="mt-2 text-sm text-slate-400">
            Each lap stays readable in a dedicated panel that scrolls independently
            when the list gets long.
          </p>

          {laps.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 px-5 py-10 text-center text-slate-400">
              No laps recorded yet.
            </div>
          ) : (
            <div className="mt-6 max-h-[28rem] space-y-3 overflow-y-auto pr-1">
              {laps
                .slice()
                .reverse()
                .map((lap, index) => {
                  const lapNumber = laps.length - index;

                  return (
                    <div
                      key={`${lap}-${lapNumber}`}
                      className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/40 px-4 py-3"
                    >
                      <span className="text-sm uppercase tracking-[0.2em] text-slate-400">
                        Lap {lapNumber}
                      </span>
                      <span className="font-mono text-base font-semibold text-white">
                        {lap}
                      </span>
                    </div>
                  );
                })}
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
