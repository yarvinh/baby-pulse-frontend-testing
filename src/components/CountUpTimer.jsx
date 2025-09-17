import {  useEffect, useMemo, useRef, useState } from "react";
import { formatElapsed, timeToLocal } from "../helpers/date";

const CountUpTimer = ({dateTime}) => {

  const [elapsedMs, setElapsedMs] = useState(0);
  const [anchorTs, setAnchorTs] = useState(null)
  const intervalRef = useRef(null);
  const start = () => {
    setElapsedMs(0);
    setAnchorTs(timeToLocal(dateTime));
  };
  let startClock = false
  useEffect(() => {
    if (!startClock) start()
    startClock = true
  }, []);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const base = anchorTs ?? now;
      setElapsedMs(now - base);
    };

    tick();
    if (intervalRef.current){
      clearInterval(intervalRef.current)
    }
    intervalRef.current = window.setInterval(tick, 1000); 
  }, [anchorTs]);

  const formatted = useMemo(() => formatElapsed(elapsedMs), [elapsedMs]);

  return (
    <div className="text-center">
      <div className="text-5xl font-bold tracking-tight tabular-nums">{formatted}</div>
    </div>
  );
}

export default CountUpTimer