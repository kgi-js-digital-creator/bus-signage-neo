import { HashRouter, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import type { Body } from "./types/ResponseJson";
import Timetable from "./components/Timetable";
import Load from "./components/Load";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import timetableData from "./utils/timetableData";


export default function App() {
  const [timetable, setTimetable] = useState<Body>()
  const [isLoading, setIsLoading] = useState<boolean>(true)



  useEffect(() => {
    const init = async () => {
      const data = await timetableData();
      setTimetable(data);
      setIsLoading(false);
    }
    init();
  }, [])

  return (
    <div className="flex flex-col cursor-none! select-none w-full h-full bg-neutral-900 text-neutral-50 antialiased">
      <HashRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home timetable={timetable} isLoading={isLoading} />} />
          <Route path="/:id" element={<TimetablePage timetable={timetable} isLoading={isLoading} />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

function TimetablePage({ timetable, isLoading }: { timetable?: Body, isLoading: boolean }) {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      {isLoading || !timetable || !id ? <Load /> : <Timetable id={id} data={timetable} />}
    </>
  )
}