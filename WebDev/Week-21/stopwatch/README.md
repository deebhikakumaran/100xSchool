# stopwatch clock

a simple react stopwatch that counts up in `hh:mm:ss` format.

## files

- `app.jsx` - component logic
- `app.css` - styles (dark card, pulsing status dot, hover effects)

## setup

1. put both files in the same folder
2. keep the `import './app.css'` line at the top of `app.jsx`
3. render `<app />` like any normal component

## how it works

- `usestate` holds `secondspassed`, ticks up every second
- `useref` holds the interval id so it doesn't trigger re-renders on its own
- `starttimer` guards against double-clicking start (no runaway intervals)
- `stopclock` just clears the interval, freezes the count
- `resetclock` clears the interval and sets seconds back to 0
- `formattime` pads hours/minutes/seconds to 2 digits each

## controls

| button | what it does |
|--------|---------------|
| start  | begins counting up |
| stop   | pauses at current time |
| reset  | stops and zeroes the clock |

## notes

- tabular-nums in css keeps digits from jittering sideways each tick
- responsive down to mobile (smaller font + padding under 480px)