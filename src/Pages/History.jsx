import { useContext, useState } from "react";
import { Clock3, History as HistoryIcon, ListChecks, TimerReset, Trash2 } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { clearHistory, deleteHistoryEntry, getHistory } from "../utils/history";

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

function getActivityValue(item) {
  if (item.type === "task") {
    return item.title;
  }

  return formatTime(item.seconds ?? 0);
}

function formatDate(value) {
  return new Date(value).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function renderActivityIcon(type) {
  if (type === "timer") {
    return <Clock3 className="h-5 w-5" />;
  }

  if (type === "stopwatch") {
    return <TimerReset className="h-5 w-5" />;
  }

  return <ListChecks className="h-5 w-5" />;
}

export default function History() {
  const { user } = useContext(AuthContext);
  const [, forceRefresh] = useState(0);
  const history = user ? getHistory()[user.username] || [] : [];

  const timerEntries = history.filter((item) => item.type === "timer").length;
  const stopwatchEntries = history.filter((item) => item.type === "stopwatch").length;
  const taskEntries = history.filter((item) => item.type === "task").length;

  function handleDeleteEntry(entryIndex) {
    deleteHistoryEntry(user, entryIndex);
    forceRefresh((value) => value + 1);
  }

  function handleClearHistory() {
    if (!history.length) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete all activity history?",
    );

    if (!confirmed) {
      return;
    }

    clearHistory(user);
    forceRefresh((value) => value + 1);
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 text-white sm:p-6 lg:p-8">
      <header className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.24em] text-violet-300">History</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">Review your activity log</h1>
        <p className="max-w-2xl text-sm text-slate-400 sm:text-base">
          Timer sessions, stopwatch runs, and completed tasks are arranged into a
          responsive history feed that stays readable across screen sizes.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Timer entries</p>
          <p className="mt-6 text-4xl font-semibold">{timerEntries}</p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Stopwatch entries
          </p>
          <p className="mt-6 text-4xl font-semibold">{stopwatchEntries}</p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg sm:col-span-2 lg:col-span-1">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Task entries</p>
          <p className="mt-6 text-4xl font-semibold">{taskEntries}</p>
        </article>
      </section>

      <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-800 p-3 text-slate-200">
              <HistoryIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Activity feed</h2>
              <p className="text-sm text-slate-400">
                Everything you have logged so far, with the newest items first.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClearHistory}
            disabled={history.length === 0}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-rose-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="h-4 w-4" />
            Clear all
          </button>
        </div>

        {history.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-700 px-5 py-10 text-center text-slate-400">
            No activity yet.
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {history
              .slice()
              .reverse()
              .map((item, index) => {
                const originalIndex = history.length - index - 1;

                return (
                  <article
                    key={`${item.type}-${item.date}-${index}`}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-slate-800 p-3 text-slate-200">
                        {renderActivityIcon(item.type)}
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                          {item.type}
                        </p>
                        <p className="mt-1 font-semibold text-white">
                          {getActivityValue(item)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-start gap-3 sm:items-end">
                      <p className="text-sm text-slate-400">{formatDate(item.date)}</p>
                      <button
                        type="button"
                        onClick={() => handleDeleteEntry(originalIndex)}
                        className="inline-flex items-center gap-2 rounded-2xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-rose-400 hover:text-white"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </article>
                );
              })}
          </div>
        )}
      </section>
    </main>
  );
}
