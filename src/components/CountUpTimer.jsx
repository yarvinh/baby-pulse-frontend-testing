import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { formatElapsed, timeToLocal } from "../helpers/date";
import { PregnancyContext } from "../contexts/PregnancyContext";

const CountUpTimer = ({dateTime}) => {

  const {isRunning, setIsRunning} = useContext(PregnancyContext)

  const [elapsedMs, setElapsedMs] = useState(0);
  const [anchorTs, setAnchorTs] = useState(null)
  const intervalRef = useRef(null);

  const start = () => {
    setElapsedMs(0);
    setAnchorTs(new Date(timeToLocal(dateTime)));
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) start()

    if (!isRunning) return;
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

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (!isRunning && anchorTs != null) {
      setElapsedMs((prev) => prev)
    }
  }, [isRunning]);

  const formatted = useMemo(() => formatElapsed(elapsedMs), [elapsedMs]);


  return (
    <div className="text-center">
        <div className="text-5xl font-bold tracking-tight tabular-nums">{formatted}</div>
    </div>
  );
}

export default CountUpTimer