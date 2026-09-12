import type { Body } from "../types/ResponseJson";


export default function Description({ data }: { data: Body }) {
  return (
    <div className="relative flex flex-col flex-1 px-2 min-h-0 items-center overflow-hidden">
      <div className="flex shrink-0 w-full h-12 p-1 text-[2rem] font-medium">説明</div>
      <div className="flex flex-1 w-full flex-col pl-2 py-2 items-start text-base">
        {data?.metadata?.descriptions?.map((desc, index) => (
          <div key={index} className="">
            {desc}
          </div>
        ))}
      </div>
    </div>
  );
}
