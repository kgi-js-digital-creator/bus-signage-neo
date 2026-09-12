import { useState } from "react";
import type { ErrorInfo } from "react";

import useTime from "../hooks/useTime";


export interface ErrorProps {
  error?: Error | unknown;
  errorInfo?: ErrorInfo | null;
}

export default function ErrorComponent({ error, errorInfo }: ErrorProps) {
  const { now } = useTime();

  const [ariseTime] = useState(() => now.toLocaleString("ja-JP", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }))

  const getErrorContent = (): string => {
    let content: string;

    if (error instanceof globalThis.Error) {
      content = error.stack || `${error.name}: ${error.message}`;
    } else if (typeof error === "string") {
      content = error;
    } else if (error && typeof error === "object") {
      const errObj = error as Record<string, unknown>;
      if (typeof errObj.stack === "string") {
        content = errObj.stack;
      } else if (typeof errObj.message === "string") {
        content = errObj.message;
      } else {
        try {
          content = JSON.stringify(error, null, 2);
        } catch {
          content = String(error);
        }
      }
    } else if (error != null) {
      content = String(error);
    } else {
      content = "不明なエラー";
    }

    if (errorInfo?.componentStack) {
      content += `\n\nComponent Stack:\n${errorInfo.componentStack}`;
    }

    return content;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-red-900 text-neutral-100 p-6 select-none overflow-hidden">
      <div className="w-full flex flex-col gap-2 text-center">
        <h1 className="text-4xl font-bold">
          エラーが発生しました
        </h1>
        <div className="text-xl text-neutral-400 font-mono">
          発生時刻: {ariseTime}
        </div>
        <div className="m-4 text-left">
          <pre className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-red-300 font-mono text-xs break-all whitespace-pre-wrap max-h-[65vh] overflow-auto select-text leading-relaxed">
            {getErrorContent()}
          </pre>
        </div>
      </div>
    </div>
  );
}