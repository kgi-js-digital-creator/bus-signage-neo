import { useEffect, useState } from "react";

import type { Body } from "../types/ResponseJson";


const schoolBusIds = ["jr-hachioji", "keio-hachioji", "minamiosawa", "haijima"];
const loggedInvalidTimes = new Set<string>();

function remainingMinutes(timeNumber: string | number, nowTime: number) {
  const time = String(timeNumber);
  const testRegex = /^\d{4}$/;
  if (time.length != 4 || !testRegex.test(time)) {
    if (!loggedInvalidTimes.has(time)) {
      loggedInvalidTimes.add(time);
      console.log(`時刻データが不正です: ${timeNumber}\nデータは４桁の整数値である必要があります。`);
    }
    return null;
  }

  const h = Number(time.slice(0, 2));
  const m = Number(time.slice(2));

  const targetMinutes = h * 60 + m;

  return targetMinutes - nowTime;
}

export default function Timetable({ id, data }: { id: string; data: Body }) {
  const [currentTime, setCurrentTime] = useState<number>(() => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.getHours() * 60 + now.getMinutes());
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const busType = schoolBusIds.includes(id) ? "school" : "public";
  const statusObj = data?.metadata?.statuses?.[busType];

  const stopName = data?.routes?.[id]?.stop ?? id;
  const lineName = data?.routes?.[id]?.line ?? "";
  const routeName = data?.routes?.[id]?.name ?? "";

  if (statusObj && statusObj.status !== "200") {
    return (
      <div className="relative flex flex-col flex-1 px-2 min-h-0 items-center overflow-hidden">
        <div className="flex flex-row items-center shrink-0 w-full gap-4 py-1">
          <div className="flex text-[2rem] text-center font-medium text-neutral-200">{stopName}</div>
          <div className="flex flex-col justify-end h-full font-medium text-neutral-300">
            <div className="text-[0.8rem]">{lineName}</div>
            <div className="text-base">{routeName}</div>
          </div>
        </div>
        <div className="flex flex-1 w-full flex-col min-h-0 overflow-hidden">
          <div className="flex flex-col justify-start font-normal text-[2rem] text-neutral-300">
            問題が発生しました
            <div className="text-red-500 font-bold">
              {statusObj.status} {statusObj.status_msg}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const remainingTimetable =
    data?.routes?.[id]?.timetable?.filter(([time]) => {
      const remaining = remainingMinutes(time, currentTime);
      return remaining !== null && remaining > 0;
    }) ?? [];

  return (
    <>
      <div className="relative flex flex-col flex-1 px-2 min-h-0 items-center overflow-hidden">
        <div className="flex flex-row items-center shrink-0 w-full gap-4 py-1">
          <div className="flex text-[2rem] text-center font-medium text-neutral-200">{stopName}</div>
          <div className={`flex flex-col h-8 font-medium text-neutral-300 gap-1 ${lineName && routeName ? "justify-center" : "justify-end"}`}>
            <div className="text-[0.8rem] leading-none">{lineName}</div>
            <div className="text-base leading-none">{routeName}</div>
          </div>
        </div>
        <div className="flex flex-1 w-full flex-col min-h-0 overflow-hidden">
          {remainingTimetable.length === 0 ? (
            <div className="flex flex-col py-4 justify-center items-center font-normal text-[2rem] text-neutral-400">本日の運行は終了しました</div>
          ) : (
            <>
              {remainingTimetable.map(([time, note], index) => {
                const remaining =
                  index <= 1 ? remainingMinutes(time, currentTime) : null;
                const isLast = index === remainingTimetable.length - 1;

                return (
                  <div
                    key={index}
                    className={`flex w-full px-2 shrink-0 items-center justify-between ${index === 0 ? "bg-orange-600/20" : ""}`}
                  >
                    <div className="flex items-center shrink-0 gap-3">
                      <div className={`font-bold text-[2.5rem]  ${isLast ? "text-[#e74c3c]" : "text-orange-400"}`}>
                        {`${String(time).slice(0, 2)}:${String(time).slice(2)}`}
                      </div>
                      {note && <div className="font-medium text-2xl px-2 py-1 bg-[#e74c3c] rounded-lg">{note}</div>}
                    </div>
                    {remaining !== null && remaining > 0 && (
                      <div
                        className={`flex font-semibold items-end text-2xl ${index === 1 ? "opacity-50" : ""}`}
                      >
                        あと
                        <div className="text-3xl">
                          {remaining >= 60
                            ? remaining % 60 === 0
                              ? `${Math.floor(remaining / 60)}時間`
                              : `${Math.floor(remaining / 60)}時間${remaining % 60}分`
                            : `${remaining}分`}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
        <div className="absolute bottom-0 w-full h-8 bg-linear-to-t from-neutral-900 to-transparent" />
      </div>
    </>
  );
}
