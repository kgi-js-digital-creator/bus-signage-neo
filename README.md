<div align="center">
  <img src="./docs/images/icon.svg" width="200" height="200"/>
  <h1>通学バス情報サイネージ</h1>
</div>

![dev workflow](https://github.com/kgi-js-digital-creator/bus-signage-neo/actions/workflows/deploy_dev.yml/badge.svg)
![prod workflow](https://github.com/kgi-js-digital-creator/bus-signage-neo/actions/workflows/deploy_prod.yml/badge.svg)

![screenshot](./docs/images/screenshot_1.png)

# 通学バス情報サイネージ用マニュアル

これは通学バス情報サイネージ用の運用マニュアルです。ここでは各種URLパラメータの使用法、Node.jsとこのViteプロジェクトを編集してビルドできるようにするまでの手順を記しています。これが役に立つ機会が来ることを祈ります。

## Tailwind CSSについて
このプロジェクトでは、従来の`bus-signage-neo`リポジトリから、`Tailwind CSS`を導入し、よりコードの記述性を高めています。`Tailwind CSS`の詳しい使い方は[Tailwind CSSの公式サイト](https://tailwindcss.com/)などを確認してください。

## APIのURL及びTokenを変更する時
APIのURL及びTokenに変更があった場合、本リポジトリの`Settings`→`Secrets and Variables`→`Actions`の`Repository variables`の項目にある値を変更することで変更できます。

## ルーティング（子ページ）について
このプロジェクトでは`Github Pages`などの都合上、`HashRouter`と呼ばれるルーティング方式を利用しています。`HashRouter`では`example.com/child/a`ではなく`example.com/#/child/a`のように指定します。

### 利用可能なページ
| key | 参考 |
| --- | --- |
| / | ルーティングを指定していない状態。通常の状態の時刻表全体が表示されます。 |
| /{下記のID} | 代入したIDの時刻表のみ表示します。利用可能なIDは下記の表を参照してください。 |

### 利用可能なID一覧
| ID | 種類 | 停留所 | 参考 |
| --- | :---: | :---: | --- |
| jr-hachioji | スクールバス |  | JR八王子駅南口行 |
| keio-hachioji | スクールバス |  | 京王八王子行 |
| minamiosawa | スクールバス |  | 南大沢行 | 
| haijima | スクールバス |  | 拝島行 |
| k01-k02 | 公共バス | 中野市民センター | 工01・工02 JR・京王八王子駅行 |
| nh | 公共バス | 中野市民センター | 北部コース 西八王子駅行 |
| a21 | 公共バス | 中野団地 | 暁21 JR・京王八王子駅行 |
| s04 | 公共バス | 中野団地 | 市04 <市役所経由>西八王子駅行 |
| k02 | 公共バス | 工学院大学 | 工02 JR・京王八王子駅行 |
| t03 | 公共バス | 工学院大学 | 高月03 拝島駅行 |
| k01-h | 公共バス | 工学院大学西 | 工01 JR・京王八王子駅行 |

## URLパラメータの一覧
| key | 初期値 | value | 役割 |
| --- | --- | --- | --- |
| scale | 1.0 | float | 全体の表示サイズを調節します |

使用例：
```url
https://kgi-js-digital-creator.github.io/bus-signage/?scale=0.8
```

## ファイル構造について
```plain
bus-signage-neo/
├── public/                           # ルートに置かれるファイル
│   ├── 404.html                     # 404エラーページ本体
│   ├── site.webmanifest             # サイトの設定ファイル
│   └── favicon.svg                  # WEBアイコン
├── src/                              # ソースコード
│   ├── assets/                      # アセットフォルダ
│   │   └── fonts/　                # フォントフォルダ
│   ├── components/
│   │   ├── BarText.tsx             # ヘッダー用コンポーネント
│   │   ├── Description.tsx         # 停留所説明用コンポーネント
│   │   ├── Error.tsx               # エラー表示用コンポーネント
│   │   ├── ErrorBoundary.tsx       # エラー検出用コンポーネント
│   │   ├── Load.tsx                # 読み込み表示用コンポーネント
│   │   └── Timetable.tsx           # 各行先ごとの時刻表用コンポーネント
│   ├── context/                     # 未使用
│   ├── hooks/                       # 未使用
│   ├── pages/
│   │   ├── Home.tsx                # ホームページ
│   │   └── NotFound.tsx            # 404エラーページ
│   ├── types/
│   │   └── ResponseJson.ts         # レスポンスJSONの型
│   ├── utils/
│   │   ├── checkStatus.ts          # 表示許可確認
│   │   ├── getTodayType.ts         # 月～金(week)/土(sat)/日・祝(holi)を判定
│   │   ├── mergeJson.ts            # Jsonのディープマージ
│   │   └── timetableData.ts        # 時刻表データの取得
│   ├── App.tsx                      # アプリケーション本体
│   ├── GlobalController.tsx         # offlineや表示中止の表示、定期リロード処理など
│   ├── index.css                    # スタイル
│   └── main.tsx                     # メインコンポーネント
├── .gitignore                        # Gitの無視するファイル
├── eslint.config.js                  # ESLintの設定ファイル
├── index.html                        # リダイレクト用
├── package-lock.json                 # インストールされた依存関係の確定情報
├── package.json                      # パッケージ管理
├── README.md
├── tsconfig.app.json                 # TypeScript設定ファイル
├── tsconfig.json                     # TypeScriptプロジェクトの全体的な設定の管理
├── tsconfig.node.json                # Node.js用TypeScript設定ファイル
└── vite.config.js                    # Viteの設定

```

## Viteプロジェクトのセットアップ方法・編集方法
### nodeをインストールする
[公式サイトのダウンロードページ](https://nodejs.org/ja/download)からインストーラーをダウンロードし実行してください。

```sh
node -v
```
```sh
npm -v
```
ターミナルで上記のコマンドを実行し、バージョンが出力されればOKです。

※開発はnode v24.13.0で行っています。不具合が発生した場合は一度アンインストールしてから開発と同じバージョンで試してみてください。

### Githubからソースコードをダウンロードする
Github上のリポジトリからソースコードをダウンロードします。方法は3通りあります。

1. gitのcloneコマンドを使用する
2. Github Desktopを使用する
3. github.comからzipファイルをダウンロードする(非推奨)

#### gitのcloneコマンドを使用する
PCにgitをインストールし、以下のコマンドを実行します。
```sh
git clone https://github.com/kgi-js-digital-creator/bus-signage-neo.git
```

#### Github Desktopを使用する
https://github.com/kgi-js-digital-creator/bus-signage-neo

[GitHub Desktop](https://desktop.github.com/)をインストール後、上記のURLへアクセスし、右上の緑色の`Code`ボタンを押して、`Open in GitHub Desktop`を選択します。

#### github.comからzipファイルをダウンロードする(非推奨)
https://github.com/kgi-js-digital-creator/bus-signage-neo

上記のURLへアクセスし、右上の緑色の`Code`ボタンを押して、`Download ZIP`を選択します。

### ターミナルでプロジェクトへ移動する
`cd`コマンドを実行し、`bus-signage-neo/`フォルダの中に移動してください。

例：
```sh
cd [bus-signage-neo/のフォルダパス]
```

### xWER4ファイルを配置する
GitHub上の`bus-signage-neo`などの`gh-pages`ブランチにある`xWER4`というファイルを`public/`フォルダにコピーしてください。

### node_modulesをインストールする
package.json を元に必要なライブラリをインストールします。
```sh
npm install
```
node_modulesが入っていない場合、処理に数分かかることがあります。

これで準備は完了です。

## 各種コマンド
> これらのコマンドはviteプロジェクトのルートディレクトリ(`bus-signage-neo/`)で実行する必要があります。

### プロジェクトにパッケージを追加する
```sh
npm install [パッケージ名]
```
```sh
npm i [パッケージ名]
```
このコマンドでプロジェクトにパッケージをインストールすることが出来ます。`tailwind css`のように、開発時だけ必要なパッケージには`--save-dev`または`-D`の引数を追加することでビルドに含まれないようにすることが出来ます。

例：
```sh
npm install --save-dev [開発用依存パッケージ]
```

### 開発サーバを起動する
```sh
npm run dev
```
このコマンドを実行すると、表示されたURL（例：`http://localhost:5173/`）をブラウザで開くことで結果を確認することが出来ます。ターミナル内で`Ctrl + C`を入力すると停止することが出来ます。

### プロジェクトをビルドする
```sh
npm run build
```
このコマンドを実行すると、現在のプロジェクトをビルドすることが出来ます。出力結果はプロジェクトのルートディレクトリ内の`dist/`フォルダに生成されます。

### その他
その他のコマンドなどは[npm Docs](https://docs.npmjs.com/)などを確認してください。`npm run [script名]`で実行するものは`package.json`の`"scripts"`セクションを参照してください。
