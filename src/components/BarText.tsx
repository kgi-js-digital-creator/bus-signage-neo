import type { Body } from "../types/ResponseJson";


export default function BarText({ data }: { data: Body }) {
  const text = data.metadata?.name ?? "時刻表";
  return (
    <div className="font-normal text-neutral-100">
      {text}
    </div>
  )
}