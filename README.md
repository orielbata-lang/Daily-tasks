# Daily Tasks

A small mobile web app for three daily check-ins: **Pills Taken 💊**, **Calories Eaten 🍽️** and **Workout Done 💪**.

- Tap a task to check it, tap again to uncheck.
- Progress (e.g. 2/3) and a progress bar at the top; a completion message at 3/3.
- Each calendar day (phone's local time) is stored separately. A new day starts unchecked, even if the app stays open past midnight.
- **History** covers the last 365 days: streaks, perfect days, a month calendar (swipe or use the arrows to go back 12 months), tap any day to see what was done and when, and per-task completion rates.
- Saved in the browser's local storage; works offline via a service worker.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app (HTML, CSS, JS) |
| `manifest.webmanifest` | Home-screen install settings |
| `sw.js` | Offline cache (bump `VERSION` after editing any file) |
| `icons/` | App icons |

No build step. To run locally: `python3 -m http.server` and open http://localhost:8000.

## Install on iPhone

1. Host the folder on any HTTPS static host (for example GitHub Pages: repo **Settings → Pages → Deploy from a branch**, pick the branch and `/ (root)`).
2. Open the URL in **Safari**, tap **Share → Add to Home Screen**.
3. Launch it from the home-screen icon. Your checkmarks are stored on the phone for that installed app.

---

# Following the Bitch Ass Money (`money/`)

A second app with the same look. Each calendar month starts with a 7,000 lei (Moldovan leu) balance.

- Type an amount, optionally add a note, tap **Spend**. The date and time are saved automatically.
- See what's left, how much you've spent, how much you can spend per day for the rest of the month, and days left. The balance turns amber under 20% and red when you go over.
- Spends are listed by day. Tap one to delete it; every add or delete can be undone for a few seconds.
- Use the arrows on the balance card to look back at earlier months.
- A full-year calendar shades every day by how much was spent against that month's daily budget. Tap a day to jump to its spends, or a month name to open that month.
- Pink and purple theme.
- Change `MONTHLY_BUDGET` or the currency label `CURRENCY` at the top of the script in `money/index.html`.

Installed the same way; its address is the site address plus `/money/`.
