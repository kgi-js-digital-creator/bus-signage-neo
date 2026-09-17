import fetchWithRetry from "./fetchWithRetry";


export async function checkStatus(): Promise<{ status: boolean; message: string; status_code: number }> {
  try {
    const dr = await fetchWithRetry(`${import.meta.env.BASE_URL}xWER4`);
    if (!dr.ok) {
      return {
        status: false,
        message: `システム障害が発生しています`,
        status_code: dr.status,
      };
    }
    const d = JSON.parse(atob(await dr.text()));
    const response = await fetchWithRetry(`${atob(d["3A"])}${atob("P3Rva2VuPQ==")}${atob(d["3B"])}`, { cache: "no-store" });
    if (response.status === 200) {
      const responseJson = await response.json();
      if (responseJson.status === "200") {
        return {
          status: true,
          message: "OK",
          status_code: Number(responseJson.status) || response.status,
        };
      } else {
        return {
          status: false,
          message: responseJson.status_msg,
          status_code: Number(responseJson.status) || response.status,
        };
      }
    } else {
      return {
        status: false,
        message: `表示許可を確認できません`,
        status_code: response.status,
      };
    }
  } catch (error) {
    // errorオブジェクトがReactの描画に渡るとエラーになるため、明示的に文字列に変換する
    return {
      status: false,
      message: `処理エラーにより表示許可を確認できません：${error instanceof Error ? error.message : String(error)}`,
      status_code: 500,
    };
  }
}
