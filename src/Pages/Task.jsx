import { useContext, useEffect, useState } from "react";
import { CheckCircle2, ListTodo, Plus, Trash2 } from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { saveToHistory } from "../utils/history";

function normalizeTasks(storedTasks) {
  return storedTasks
    .map((task, index) => {
      if (typeof task === "string") {
        return {
          id: `task-${index}-${task}`,
          title: task,
          completed: false,
        };
      }

      return {
        id: task.id ?? `task-${index}`,
        title: task.title ?? "",
        completed: Boolean(task.completed),
      };
    })
    .filter((task) => task.title.trim() !== "");
}

export default function Task() {
  const { user } = useContext(AuthContext);
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return normalizeTasks(storedTasks);
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(event) {
    event.preventDefault();

    const trimmedTask = taskInput.trim();

    if (!trimmedTask) {
      return;
    }

    setTasks((prev) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        title: trimmedTask,
        completed: false,
      },
      ...prev,
    ]);
    setTaskInput("");
  }

  function deleteTask(taskId) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  function toggleTask(taskId) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        const nextCompleted = !task.completed;

        if (nextCompleted) {
          saveToHistory(user, {
            type: "task",
            title: task.title,
            completed: true,
          });
        }

        return {
          ...task,
          completed: nextCompleted,
        };
      }),
    );
  }

  const completedTasks = tasks.filter((task) => task.completed).length;
  const activeTasks = tasks.length - completedTasks;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 text-white sm:p-6 lg:p-8">
      <header className="flex flex-col gap-3">
        <p className="text-sm uppercase tracking-[0.24em] text-sky-300">Tasks</p>
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Keep your task list clear on every screen
        </h1>
        <p className="max-w-2xl text-sm text-slate-400 sm:text-base">
          Add tasks, check them off, and manage the list with controls that stack
          neatly on phones and spread out on larger screens.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Total tasks</p>
            <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-300">
              <ListTodo className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-6 text-4xl font-semibold">{tasks.length}</p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Active tasks</p>
            <div className="rounded-2xl bg-amber-400/10 p-3 text-amber-300">
              <Plus className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-6 text-4xl font-semibold">{activeTasks}</p>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Completed tasks
            </p>
            <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-300">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-6 text-4xl font-semibold">{completedTasks}</p>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Add a task</h2>
          <p className="mt-2 text-sm text-slate-400">
            Enter the next action you want to finish today.
          </p>

          <form onSubmit={addTask} className="mt-6 flex flex-col gap-3">
            <input
              type="text"
              placeholder="Add task"
              value={taskInput}
              onChange={(event) => setTaskInput(event.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-sky-400"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-sky-400"
            >
              <Plus className="h-4 w-4" />
              Add task
            </button>
          </form>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
          <h2 className="text-2xl font-semibold">Your list</h2>
          <p className="mt-2 text-sm text-slate-400">
            Toggle a task when it is done, or delete it when it no longer belongs here.
          </p>

          {tasks.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-700 px-5 py-10 text-center text-slate-400">
              No tasks yet. Add your first item above.
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="mt-1 h-5 w-5 accent-sky-400"
                    />
                    <span
                      className={[
                        "text-base transition-colors",
                        task.completed
                          ? "text-slate-500 line-through"
                          : "text-slate-100",
                      ].join(" ")}
                    >
                      {task.title}
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    className="inline-flex items-center gap-2 self-start rounded-2xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-rose-400 hover:text-white sm:self-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
