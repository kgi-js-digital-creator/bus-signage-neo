import {
    createContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

type TimeContextValue = {
    now: Date;
};

export const TimeContext = createContext<TimeContextValue | undefined>(undefined);

export default function TimeProvider({ children }: { children: ReactNode }) {
    const [now, setNow] = useState(() => new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <TimeContext.Provider value={{ now }}>
            {children}
        </TimeContext.Provider>
    );
}