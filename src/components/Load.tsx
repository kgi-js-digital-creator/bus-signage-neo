export default function Load() {
  return (
    <div className="relative flex flex-col flex-1 px-4 py-5 min-h-0 gap-4 overflow-hidden">
      <div className="flex flex-row shrink-0 w-full h-12 gap-4">
        <div className="flex-3 h-full w-full rounded-2xl load-shimmer bg-neutral-800" />
        <div className="flex flex-2 flex-col justify-between">
          <div className="flex h-4 w-2/3 rounded-2xl load-shimmer bg-neutral-800" />
          <div className="flex h-6 w-full rounded-2xl load-shimmer bg-neutral-800" />
        </div>
      </div>
      <div className="flex flex-1 flex-col min-h-0 gap-3 overflow-hidden">
        <div className="flex shrink-0 h-16 w-full rounded-2xl load-shimmer bg-neutral-800" />
        <div className="flex shrink-0 h-16 w-full rounded-2xl load-shimmer bg-neutral-800" />
        <div className="flex shrink-0 h-16 w-full rounded-2xl load-shimmer bg-neutral-800" />
        <div className="flex shrink-0 h-16 w-full rounded-2xl load-shimmer bg-neutral-800" />
        <div className="flex shrink-0 h-16 w-full rounded-2xl load-shimmer bg-neutral-800" />
        <div className="flex shrink-0 h-16 w-full rounded-2xl load-shimmer bg-neutral-800" />
      </div>
      <div className="absolute bottom-5 w-full h-8 bg-linear-to-t from-neutral-900 to-transparent" />
    </div>
  )
}