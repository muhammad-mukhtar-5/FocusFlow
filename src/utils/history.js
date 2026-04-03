export function getHistory() {
  return JSON.parse(localStorage.getItem("history")) || {};
}

export function saveToHistory(user, activity) {
  if (!user) return;

  const data = getHistory();

  if (!data[user.username]) {
    data[user.username] = [];
  }

  const newEntry = {
    ...activity,
    date: new Date()
  };

  data[user.username].push(newEntry);

  localStorage.setItem("history", JSON.stringify(data));
}

export function deleteHistoryEntry(user, entryIndex) {
  if (!user) return;

  const data = getHistory();
  const userHistory = data[user.username] || [];

  data[user.username] = userHistory.filter((_, index) => index !== entryIndex);

  localStorage.setItem("history", JSON.stringify(data));
}

export function clearHistory(user) {
  if (!user) return;

  const data = getHistory();
  data[user.username] = [];

  localStorage.setItem("history", JSON.stringify(data));
}
