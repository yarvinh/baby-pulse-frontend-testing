import { useEffect, useMemo, useRef, useState } from "react";

// Helper: format milliseconds -> HH:MM:SS
function formatHMS(ms) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export default function CountdownDemo() {
  const [durationSec, setDurationSec] = useState(60); // editable seconds
  const [targetTs, setTargetTs] = useState(null);
  const [remainingMs, setRemainingMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start countdown when button is pressed
  const start = (sec) => {
    const clamped = Math.max(1, Math.floor(sec));
    const target = Date.now() + clamped * 1000;
    setTargetTs(target);
    setIsRunning(true);
    setRemainingMs(target - Date.now());
  };

  const pause = () => setIsRunning(false);
  const resume = () => {
    if (targetTs && remainingMs > 0) {
      const newTarget = Date.now() + remainingMs;
      setTargetTs(newTarget);
      setIsRunning(true);
    }
  };
  const reset = () => {
    setIsRunning(false);
    setTargetTs(null);
    setRemainingMs(0);
  };

  // Effect: tick while running. Safe in React 18 StrictMode (cleanup clears previous interval).
  useEffect(() => {
    if (!isRunning || !targetTs) return;

    const tick = () => {
      const left = Math.max(0, targetTs - Date.now());
      setRemainingMs(left);
      if (left <= 0) {
        setIsRunning(false);
      }
    };

    tick(); // update immediately
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(tick, 250);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, targetTs]);

  const formatted = useMemo(() => formatHMS(remainingMs), [remainingMs]);
  const progress = useMemo(() => {
    if (!targetTs) return 0;
    const total = Math.max(1, durationSec * 1000);
    const left = remainingMs;
    return Math.min(100, Math.max(0, 100 - (left / total) * 100));
  }, [remainingMs, targetTs, durationSec]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md rounded-2xl shadow-lg bg-white p-6 space-y-5">
        <h1 className="text-2xl font-semibold">Countdown</h1>

        <div className="grid grid-cols-[1fr_auto] gap-3 items-end">
          <label className="block">
            <span className="text-sm text-gray-600">Duration (seconds)</span>
            <input
              type="number"
              min={1}
              value={durationSec}
              onChange={(e) => setDurationSec(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring"
            />
          </label>
          <button
            onClick={() => start(durationSec)}
            className="rounded-xl px-4 py-2 bg-black text-white hover:opacity-90 disabled:opacity-50"
            disabled={isRunning && remainingMs > 0}
            aria-label="Start countdown"
          >
            Start
          </button>
        </div>

        <div className="text-center">
          <div className="text-5xl font-bold tracking-tight tabular-nums">{formatted}</div>
          <div className="mt-3 h-3 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gray-800"
              style={{ width: `${progress}%` }}
              aria-label="Progress"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <button
            onClick={pause}
            className="rounded-xl px-4 py-2 border border-gray-300 hover:bg-gray-100"
            disabled={!isRunning}
          >
            Pause
          </button>
          <button
            onClick={resume}
            className="rounded-xl px-4 py-2 border border-gray-300 hover:bg-gray-100"
            disabled={isRunning || remainingMs <= 0 || !targetTs}
          >
            Resume
          </button>
          <button
            onClick={reset}
            className="rounded-xl px-4 py-2 border border-gray-300 hover:bg-gray-100"
            disabled={!targetTs && remainingMs === 0}
          >
            Reset
          </button>
        </div>

        <p className="text-xs text-gray-500">
          Tip: Strict Mode in React 18 mounts effects twice in development; this component clears and recreates the interval safely.
        </p>
      </div>
    </div>
  );
}
