import { useContext } from "react";
import { Clock3, History as HistoryIcon, ListChecks, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { getHistory } from "../utils/history";

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours}h ${minutes}m ${seconds}s`;
}

function formatActivity(item) {
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

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const history = user ? getHistory()[user.username] || [] : [];
  const today = new Date().toDateString();

  const todayHistory = history.filter(
    (item) => new Date(item.date).toDateString() === today,
  );

  const totalFocusSeconds = todayHistory
    .filter((item) => item.type === "timer")
    .reduce((acc, item) => acc + (item.seconds ?? 0), 0);

  const stopwatchSessions = todayHistory.filter(
    (item) => item.type === "stopwatch",
  ).length;

  const tasksCompleted = todayHistory.filter((item) => item.type === "task").length;
  const recent = history.slice(-5).reverse();

  const stats = [
    {
      label: "Focus time today",
      value: formatTime(totalFocusSeconds),
      helper: "Timer sessions completed today",
      icon: <Clock3 className="h-5 w-5" />,
    },
    {
      label: "Stopwatch runs",
      value: `${stopwatchSessions}`,
      helper: "Sessions logged today",
      icon: <PlayCircle className="h-5 w-5" />,
    },
    {
      label: "Tasks completed",
      value: `${tasksCompleted}`,
      helper: "Checked off today",
      icon: <ListChecks className="h-5 w-5" />,
    },
  ];

  const quickActions = [
    {
      label: "Start Timer",
      description: "Kick off a focused countdown session.",
      onClick: () => navigate("/timer"),
    },
    {
      label: "Open Stopwatch",
      description: "Track an open-ended work block.",
      onClick: () => navigate("/stopwatch"),
    },
    {
      label: "Manage Tasks",
      description: "Add or complete the next item on your list.",
      onClick: () => navigate("/task"),
    },
  ];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 text-white sm:p-6 lg:p-8">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl sm:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
          Welcome back, {user?.username ?? "Anonymous"}
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
          Your daily focus data stays readable from mobile to desktop, with quick
          access to timers, tasks, and recent progress.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </p>
              <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-300">
                {stat.icon}
              </div>
            </div>
            <p className="mt-6 text-3xl font-semibold sm:text-4xl">{stat.value}</p>
            <p className="mt-2 text-sm text-slate-400">{stat.helper}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Quick actions</h2>
          <p className="mt-2 text-sm text-slate-400">
            Jump straight into the part of FocusFlow you need next.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {quickActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={action.onClick}
                className="rounded-2xl border border-slate-700 bg-slate-950/40 p-4 text-left transition-colors hover:border-sky-400 hover:bg-sky-500/10"
              >
                <p className="font-semibold text-white">{action.label}</p>
                <p className="mt-2 text-sm text-slate-400">{action.description}</p>
              </button>
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-slate-800 p-3 text-slate-200">
              <HistoryIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Recent activity</h2>
              <p className="text-sm text-slate-400">
                Your latest timer sessions, stopwatch runs, and completed tasks.
              </p>
            </div>
          </div>

          {recent.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 px-5 py-10 text-center text-slate-400">
              No activity yet. Start a timer, stopwatch, or task to see progress here.
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {recent.map((item, index) => (
                <div
                  key={`${item.type}-${item.date}-${index}`}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                      {item.type}
                    </p>
                    <p className="mt-1 font-semibold text-white">{formatActivity(item)}</p>
                  </div>
                  <p className="text-sm text-slate-400">{formatDate(item.date)}</p>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
