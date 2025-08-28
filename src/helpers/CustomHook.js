import { useState } from "react";


export const useShowHistory = (initialValue = false) => {
    const [showHistory, setShowHistory] = useState(false);
    return showHistory
}