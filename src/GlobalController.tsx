import { useEffect, useState } from "react";
import { checkStatus } from "./utils/checkStatus";
import { GlobeOff } from "lucide-react";

const checkInterval = 10 * 60 * 1000;

export function GlobalController({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<boolean>(true);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusCode, setStatusCode] = useState<number>(0);
  const [nextCheckTime, setNextCheckTime] = useState<number | null>(
    () => Date.now() + checkInterval,
  );
  const [timeRemaining, setTimeRemaining] = useState<number>(() =>
    Math.floor(checkInterval / 1000),
  );
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scale = params.get("scale");
    if (scale) {
      document.documentElement.style.zoom = scale;
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = now.getHours();

      if (h === 0 || h === 4) {
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, "0");
        const dd = String(now.getDate()).padStart(2, "0");
        const reloadId = `${yyyy}-${mm}-${dd}-${h}`;
        const currentUrl = new URL(window.location.href);
        const lastReloadId = currentUrl.searchParams.get("lastReload");

        if (lastReloadId !== reloadId) {
          currentUrl.searchParams.set("lastReload", reloadId);
          window.location.href = currentUrl.toString();
        }
      }
    }, 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const allowView = async () => {
      const result = await checkStatus();
      if (result.status) {
        setStatus((prevStatus) => {
          if (prevStatus === false) {
            window.location.reload();
          }
          return true;
        });
      } else {
        setStatus(false);
      }
      setStatusMessage(result.message);
      setStatusCode(result.status_code);
    };

    allowView();

    const timer = setInterval(() => {
      allowView();
      setNextCheckTime(Date.now() + checkInterval);
    }, checkInterval);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!status && nextCheckTime) {
      const updateTimer = setInterval(() => {
        const remaining = Math.max(
          0,
          Math.floor((nextCheckTime - Date.now()) / 1000),
        );
        setTimeRemaining(remaining);
      }, 1000);
      return () => clearInterval(updateTimer);
    }
  }, [status, nextCheckTime]);

  return (
    <>
      {isOffline && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(8px)",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "50rem",
              height: "10rem",
              backgroundColor: "#242424",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2rem",
              fontSize: "2rem",
              borderRadius: "1rem",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
              border: "0.5rem solid orange",
            }}
          >
            <GlobeOff size={60} color="orange" />
            インターネットに接続されていません
          </div>
        </div>
      )}
      {!status ? (
        <div style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
          <div style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            fontSize: "1.5rem",
            opacity: 0.5,
          }}>
            次回確認：{Math.floor(timeRemaining / 60)}分
            {(timeRemaining % 60).toString().padStart(2, "0")}秒
          </div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}>
            <div style={{
              position: "absolute",
              bottom: "0.5rem",
              right: "1rem",
              fontSize: "3rem",
              fontWeight: 400,
              opacity: 0.5,
            }}>{statusCode}</div>
            <div style={{
              fontSize: "5rem",
              fontWeight: "bold",
              whiteSpace: "pre-wrap",
            }}>
              {(statusMessage || "")
                .split(/\\n|\n/)
                .map((line, index, array) => (
                  <span key={index}>
                    {line}
                    {index !== array.length - 1 && <br />}
                  </span>
                ))}
            </div>
          </div>
        </div >
      ) : (
        children
      )
      }
    </>
  );
}
