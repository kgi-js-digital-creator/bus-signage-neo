import { HashRouter, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Body } from "./types/ResponseJson.ts";
import Timetable from "./components/Timetable.tsx";
import Load from "./components/Load.tsx";
import NotFound from "./pages/NotFound.tsx";
import Home from "./pages/Home";
import timetableData from "./utils/timetableData.ts";
import useTime from "./hooks/useTime.tsx";


export default function App() {
  const { now } = useTime()
  const [timetable, setTimetable] = useState<Body>()
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const init = async () => {
      const data = await timetableData(now);
      setTimetable(data);
      setIsLoading(false);
    }
    init();
  }, [])

  return (
    <div className="flex flex-col cursor-none! select-none w-screen h-screen bg-neutral-900 text-neutral-50 antialiased">
      <HashRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home now={now} timetable={timetable} isLoading={isLoading} />} />
          <Route path="/:id" element={<TimetablePage now={now} timetable={timetable} isLoading={isLoading} />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

function TimetablePage({ now, timetable, isLoading }: { now: Date, timetable?: Body, isLoading: boolean }) {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      {isLoading || !timetable || !id ? <Load /> : <Timetable now={now} id={id} data={timetable} />}
    </>
  )
}