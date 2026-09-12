import type { Body } from "../types/ResponseJson";
import getTodayType from "./getTodayType";
import mergeJson from "./mergeJson";

async function fetchData(
  todayType: string,
  type: "pub" | "sch" | "sch_temp",
): Promise<Body> {
  let status = "500";
  let statusMessage = "Internal Server Error";
  let timetable = {};
  const d = JSON.parse(atob(await (await fetch(`${import.meta.env.BASE_URL}xWER4`)).text()));
  const baseURL = `${atob(d["2A"])}${atob("P3Rva2VuPQ==")}${atob(d["2B"])}`;
  let requestURL: string;
  if (type === "sch_temp") {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月は0から始まるため+1する
    const day = now.getDate();
    requestURL = `${baseURL}&md=sch_temp&y=${year}&m=${month}&d=${day}`;
  } else {
    requestURL = `${baseURL}&md=${type}_${todayType}`;
  }
  try {
    const res = await fetch(requestURL, { cache: "no-store" });
    if (!res.ok) {
      status = res.status.toString();
      statusMessage = res.statusText;
      throw new Error(
        `Can't fetch data: ${requestURL} ${status}: ${statusMessage}`,
      );
    }
    const data = await res.json();
    status = data.status;
    statusMessage = data.status_msg;
    if (data.status === "200") {
      timetable = data.body;
    }
  } catch (error) {
    console.error(error);
  }

  const fullType = type === "pub" ? "public" : "school";

  const statusData = {
    metadata: {
      statuses: {
        [fullType]: {
          status: status,
          status_msg: statusMessage,
        },
      },
    },
  };
  return mergeJson([statusData, timetable]) as Body;
}

export default async function timetableData(): Promise<Body> {
  const todayType = await getTodayType();
  const [publicData, schoolTempData, schoolData] = await Promise.all([
    fetchData(todayType, "pub"),
    fetchData(todayType, "sch_temp"),
    fetchData(todayType, "sch"),
  ]);
  const returnData = schoolTempData.metadata.statuses.school.status === "200"
    ? mergeJson([publicData, schoolTempData]) as Body
    : mergeJson([publicData, schoolData]) as Body;
  console.log(returnData);
  return returnData;
}