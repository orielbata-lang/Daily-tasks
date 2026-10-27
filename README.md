# Daily Tasks

A small mobile web app for three daily check-ins: **Pills Taken 💊**, **Calories Eaten 🍽️** and **Workout Done 💪**.

- Four tabs: **Today**, **Pills**, **Calories**, **Workout**. A task is approved automatically when its tab is complete:
  - **Pills**: all six checked (Finasteride, Iron, Omega 3, Vitamin D3, Hair pills, Magnesium).
  - **Calories**: add amounts with the keypad or quick buttons until the day reaches 3,500 kcal.
  - **Workout**: Workout A and B alternate daily, 2 sets per exercise. Reps start at 8 (dead hangs at 20 s) and go up by 1 rep (5 s) each time you finish that workout.
- Settings live at the top of the script in `index.html` (`PILLS`, `CAL_GOAL`, `WORKOUTS`, `REPS_START`, …).
- Today shows N/3 approved, one bar segment per task (partly filled as you go, green once approved), a ring on each task card and what's left (e.g. "Missing: Iron, Magnesium"). From 8 PM it also says how many hours are left. At 3/3 the hero says "All done for today!".
- Each calendar day (phone's local time) is stored separately. A new day starts unchecked, even if the app stays open past midnight.
- **History** covers the last 365 days: streaks, perfect days, a month calendar (swipe or use the arrows to go back 12 months; days before you started are greyed out), tap any tracked day to see what was done and when, and per-task completion rates with each task's current and best streak.
- Saved in the browser's local storage (keys starting with `dailyTasks.` only; the Money app's data is never touched). A copy is kept at the start of each day, and data that can't be read is set aside and recovered from that copy instead of being overwritten.
- Works offline via a service worker. Launch never waits on the network; a new version installs in the background and the app reloads into it when it's not in use (otherwise it shows "Update ready").

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The whole app (HTML, CSS, JS) |
| `manifest.webmanifest` | Home-screen install settings |
| `sw.js` | Offline cache (after editing any file, bump `VERSION` here and `APP_VERSION` in `index.html` together, e.g. `daily-tasks-v6` / `v6`) |
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
