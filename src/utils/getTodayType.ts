type SyukujitsuResponse = {
  "update-date": string;
  body: Record<string, string>;
};

export default async function getTodayType(now: Date): Promise<"week" | "sat" | "holi"> {
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const todayDate = `${yyyy}-${mm}-${dd}`;
  try {
    const d = JSON.parse(atob(await (await fetch(`${import.meta.env.BASE_URL}xWER4`)).text()));
    const syukujitsu = await fetch(atob(d["1A"]), { cache: "no-store" });
    const syukujitsuData: SyukujitsuResponse = await syukujitsu.json();
    if (syukujitsuData.body[todayDate]) {
      return "holi";
    }
  } catch (e) {
    console.log(e);
  }

  const week = now.getDay();

  if (week === 0) return "holi";
  if (week === 6) return "sat";
  return "week";
}
