import { useEffect, useState } from "react";

import type { Body } from "../types/ResponseJson";
import Description from "../components/Description";
import Timetable from "../components/Timetable";
import BarText from "../components/BarText";
import Load from "../components/Load";


export default function Home({ timetable, isLoading }: { timetable?: Body, isLoading: boolean }) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 500);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <header className="flex shrink-0 flex-row w-full h-22 px-4 justify-between text-5xl items-center bg-neutral-800">
        <div className="font-normal">
          {isLoading || !timetable ? <>読み込み中...</> : <BarText data={timetable} />}
        </div>
        <div className="font-medium">
          {
            Intl.DateTimeFormat("ja-JP", {
              month: "numeric",
              day: "numeric",
              weekday: "short",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false,
            }).format(now)
          }
        </div>
      </header>
      <main className="flex flex-1 min-h-0 flex-row portrait:flex-col w-full h-full">
        <div className="flex flex-col flex-1 min-h-0 portrait:grow-4">
          <div className="flex shrink-0 w-full h-20 px-4 bg-[#4788ff] text-6xl items-center font-medium ">スクールバス</div>
          <div className="flex flex-1 min-h-0 flex-row">
            <div className="flex flex-1 min-h-0 flex-col">
              {isLoading || !timetable ? <Load /> : <Timetable id={"jr-hachioji"} data={timetable} />}
              {isLoading || !timetable ? <Load /> : <Timetable id={"keio-hachioji"} data={timetable} />}
            </div>
            <div className="flex flex-1 min-h-0 flex-col">
              {isLoading || !timetable ? <Load /> : <Timetable id={"minamiosawa"} data={timetable} />}
              {isLoading || !timetable ? <Load /> : <Timetable id={"haijima"} data={timetable} />}
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 min-h-0 portrait:grow-5">
          <div className="flex shrink-0 w-full h-20 px-4 bg-[#ff6347] text-6xl items-center font-medium">公共バス</div>
          <div className="flex flex-1 min-h-0 flex-row">
            <div className="flex flex-1 min-h-0 flex-col">
              {isLoading || !timetable ? <Load /> : <Timetable id={"k01-k02"} data={timetable} />}
              {isLoading || !timetable ? <Load /> : <Timetable id={"nh"} data={timetable} />}
              {isLoading || !timetable ? <Load /> : <Timetable id={"a21"} data={timetable} />}
              {isLoading || !timetable ? <Load /> : <Timetable id={"s04"} data={timetable} />}
            </div>
            <div className="flex flex-1 min-h-0 flex-col">
              {isLoading || !timetable ? <Load /> : <Timetable id={"k02"} data={timetable} />}
              {isLoading || !timetable ? <Load /> : <Timetable id={"t03"} data={timetable} />}
              {isLoading || !timetable ? <Load /> : <Timetable id={"k01-h"} data={timetable} />}
              {isLoading || !timetable ? <Load /> : <Description data={timetable} />}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}