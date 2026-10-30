# 新婚纪念册

一个手机优先的静态婚礼纪念网站。页面采用纸质杂志式排版，包含故事时间轴、结婚天数、精选照片、自动淡入轮换、可横向翻阅的相册、家人祝福与隐藏彩蛋。当前已使用真实姓名、婚礼日期和四张真实照片；故事节点中仍有占位内容。发布到公开仓库前，请确认新人同意公开这些内容。

## 本地运行

要求 Node.js 22 或更高版本。

```bash
npm install
npm run dev
npm run build
npm test
```

开发服务器会显示本地访问地址。构建产物在 `dist/`。`npm run preview` 可检查生产构建。

## 替换姓名、日期和故事

只编辑 `src/config/wedding.ts`：

- `names`：两人姓名或昵称。
- `date`：婚礼日期，必须是 `YYYY-MM-DD`，例如 `2026-10-30`。留空时计数器显示占位。
- `location`：婚礼地点，可留空。
- `origins`：男方故乡、女方故乡与相遇城市；当前分别为临汾、烟台、北京。
- `stories`：目前有 9 个占位节点；逐项填写 `date`、`title`、`text`。不适用的节点可删除，也可继续增加。日期文字可写“2026 年 10 月”等；只有婚礼主日期参与计算。
- `blessing`、`blessingSignature`：祝福正文和落款。
- `showEasterEgg`：是否显示末尾的小印章。

日期按 `Asia/Shanghai` 的日历日计算，不随访客手机时区变化。婚礼当天显示已携手 0 天；未到婚礼日时显示倒计时。2 月 29 日结婚时，非闰年的周年日按 **2 月 28 日** 计算。

## 替换照片

目前四张真实照片保存在 `src/figs/`，已经按内容重命名并通过 `src/config/wedding.ts` 导入。以后新增照片可以沿用这种方式：先给文件取描述性英文名，再在配置文件导入并填写 `src`、`alt`、`caption`。下面的 `public/images/` 方式也继续可用。

1. 把得到新人许可、适合公开发布的照片放入 `public/images/`。建议先压缩成 WebP 或 JPEG，单张尽量控制在 300～800 KB；封面可适当大些。
2. 在 `src/config/wedding.ts` 对应照片的 `src` 填入 `/images/文件名.webp`。`alt` 写照片内容，`caption` 写简短说明。
3. `hero` 是封面；`stories[].photo` 是时间轴；`featured` 是 8 张杂志精选；`cinema` 是 4 张轮换照片；`albums[].photos` 是完整相册。重复使用一张照片也可以。
4. 新增相册时，在 `albums` 数组中增加 `{ title, date, photos }`。首版“婚礼当天”有 12 个占位位置，可按实际数量增减。
5. 用手机预览人物是否被裁切；封面和精选照片尽量选择留有画面余量的照片。

照片路径在 GitHub Pages 的子路径下也能工作：构建时会使用 Vite 的 `base` 前缀。不要把私密照片、住址、电话、密码或令牌放进公开仓库；前端隐藏内容不等于加密。

## GitHub Pages 部署

1. 仓库地址为 [LockiYu/QingWedding](https://github.com/LockiYu/QingWedding)。请将仓库设为**公开**，并确认新人同意公开展示所用照片和个人信息。
2. 此目录已初始化为 Git 仓库。首次发布时连接该仓库并推送 `main` 分支。
3. 在仓库 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。
4. 推送后查看 **Actions → Deploy wedding album**。Pages 地址为 `https://lockiyu.github.io/QingWedding/`。
5. 部署成功后运行 `./scripts/verify-pages.sh https://lockiyu.github.io/QingWedding/`，检查首页和主脚本能否从公网访问。再用真实手机分别在 Wi‑Fi 和移动网络打开网址，检查照片、刷新后的页面及 HTTPS。中国大陆访问 GitHub Pages 可能不稳定；可迁移到其他静态平台。

仓库名称改变时，在 Actions 的 `build` 步骤添加环境变量 `VITE_BASE_PATH: /实际仓库名/`；本地构建也可设置同名环境变量。自定义域名时设为 `/`。NFC 和二维码都要等**最终网址验证可用后**再制作。

## 后续修改与重新发布

修改配置、文字、样式或照片后运行：

```bash
./scripts/deploy.sh "更新婚礼照片"
```

脚本会依次安装锁定版本的依赖、运行日期测试、构建网站、提交改动并推送到 `main`。GitHub Actions 随后自动发布。确认 Actions 成功后，可再运行 `./scripts/verify-pages.sh <你的 Pages 网址>`。不要把私密照片或密码放进将要推送的目录。

## 二维码与 NFC

- 二维码：用可信的离线二维码工具或手机应用把最终 `https://` 地址编码为二维码。打印前用另一台手机扫描，确认与 NFC 使用的是同一个地址。避免用会替换为短链或附带广告的服务。
- NFC：购买 NTAG213、13.56 MHz、支持 NDEF 的圆形标签 3～5 张。金属背板使用抗金属标签。
- 使用 NFC Tools 等应用，选 **写入 → URL/URI 记录**，输入已验证的完整 HTTPS 地址，写入后用另一台手机读取。不要写成普通文本记录，也先不要永久锁定为只读。
- 手机可能需要解锁、开启 NFC，并点击系统通知才能打开页面。二维码应始终保留为备用入口。

## 实体相框装配

1. 选 6 寸胡桃木色相框，按相框开窗尺寸打印合照。
2. 将 NFC 标签贴在背面靠近边缘、避开金属支架的位置；隔板影响读取时贴在外侧，用装饰贴覆盖。
3. 在背面或随附卡片印上二维码与“轻触相框，开启属于你们的故事”。
4. 装好后再次测试 NFC 与二维码。最后写手写祝福卡并包装。

实体物料预算可按需求说明书的 ¥100～230 参考，实际以购买价格为准。

## 交付前检查

- [ ] 替换所有姓名、日期、故事、照片与落款占位
- [ ] 获得公开照片与信息的许可
- [ ] `npm run build` 和 `npm test` 通过
- [ ] GitHub Actions 部署成功，真实手机能访问
- [ ] NFC 装框后可读取，二维码能打开同一网址

线上部署与公网访问以实际 GitHub Actions 和 Pages 验证结果为准；真实设备兼容性测试、NFC 写入与实体组装需要在发布后完成。
