//テキストのキーと値の組み合わせとなるインターフェイスを宣言
interface JObject {
  [key: string]: unknown;
}

//メイン関数部分JSONオブジェクトをArrayで渡す
export default function mergeJson(jsonList: Array<object>): object {
  //新規JObjectを宣言
  let result: JObject = {};
  //渡されたJSONすべてに順次処理
  jsonList.forEach((json) => {
    result = pushObject(result, json as JObject);
  });
  return result;
}

//オブジェクト結合部分、結合先のJObjectと結合したいJSONをJObjectとして渡す
function pushObject(baseObj: JObject, obj: JObject): JObject {
  //結合先のコピーを宣言
  const result: JObject = { ...baseObj };
  //結合先がすでに持っているキーをリスト化
  const hasKey = Object.keys(baseObj);

  //結合したいオブジェクトのアイテムに順次処理
  Object.entries(obj).forEach((entry) => {
    //アイテムのキーがすでに存在するかで分岐
    if (!hasKey.includes(entry[0])) {
      //キーを持たない場合オブジェクト型ならばJObjectに変換して代入、そうでなければそのまま代入
      if (typeof entry[1] === "object" && !Array.isArray(entry[1])) {
        result[entry[0]] = entry[1] as JObject;
      } else {
        result[entry[0]] = entry[1];
      }
    } else {
      //既存のキーの場合結合先と型が一致するか判定
      if (typeof result[entry[0]] !== typeof entry[1]) {
        //一致しない場合にエラー
        throw new Error(
          `object has different type value.\nkey:${entry[0]}\nexistType:${typeof result[entry[0]]}\ncalledType:${typeof entry[1]}`,
        );
        return;
      }

      //オブジェクト型ならばJObjectに変換して代入、そうでなければそのまま代入
      if (
        typeof result[entry[0]] === "object" &&
        !Array.isArray(result[entry[0]])
      ) {
        result[entry[0]] = pushObject(
          result[entry[0]] as JObject,
          entry[1] as JObject,
        );
      } else if (Array.isArray(result[entry[0]])) {
        Object.values(entry[1] as object).forEach((value) => {
          (result[entry[0]] as Array<unknown>).push(value);
        });
      }
    }
  });

  return result;
}
