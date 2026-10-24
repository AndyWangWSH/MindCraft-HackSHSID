# CourseFlow 从下载到提交：逐步操作

## 1 下载和解压
1. 下载 CourseFlow-HackSHSID-2026.zip。
2. Windows：右键ZIP→全部解压→选择桌面或文档→解压。不要只在ZIP预览里打开网页。
3. 打开解压后的 CourseFlow 文件夹。
4. 双击 index.html，使用 Edge 或 Chrome 打开。保持它与 app.js、engine.js、style.css 在同一文件夹。
5. 浏览器无需联网，不用安装Python，不用输入API密钥。

## 2 按这个顺序试用
1. 教学周选“单周”，权重选“3·平衡模式”。
2. 点击“自动优化”：应出现楼层差17→11、同科重复2→1、加权总分23→14。
3. 点击“原始”和“当前结果”对比课表；蓝色描边是调课。
4. 展开底部“各科课时核对”：original和current的每科count、minutes应一致。
5. 切换“双周”，再次优化：应出现楼层差16→10、重复2→0、总分22→10。
6. 切回单周。在变化情景选 Chinese、周一、P2，点击“添加不可用时段”。先出现红色冲突；再自动优化，应通过检查。
7. 清空限制。改为 CAS、周三、P6，添加限制并优化。由于CAS固定，应显示未满足约束。这是正确的失败提示。
8. 点击“清空限制”和“恢复原课表”。点击某门非固定课程可加锁，再优化观察它保留原位置。要锁定已移动的课，先恢复原课表。
9. 点击“导出结果 JSON”保存课表与指标。点击“打印课表”，可在系统打印框选“另存为PDF”。
10. 页面状态保存在内存，刷新会重置。JSON是结果导出文件，目前没有导入功能。

## 3 运行自动化测试（建议自己执行一次）
1. 如果只演示网页，可以跳过安装。
2. 如要复现测试，从 https://nodejs.org/ 安装官方Node.js。
3. Windows在CourseFlow文件夹地址栏输入 cmd，回车。
4. 输入 `node test.js`，回车。
5. 应显示22行PASS，末尾显示单双周结果；evidence/results.json和test-log.txt会被更新。
6. 如果提示node不是命令，安装完成后关闭终端再重新打开。
7. 测试运行时间会因电脑而变化。证据图中的结构性结果可复现，毫秒数不要求一致。

## 4 GitHub 注册 / 登录
1. 在自己的浏览器打开 https://github.com/ 。已有账号点Sign in；没有账号点Sign up。
2. 按网站提示填写自己的邮箱、用户名、密码并完成邮箱验证。密码不需要交给任何人。
3. 登录后点右上角“+”→New repository。也可打开 https://github.com/new 。

## 5 创建公开仓库
1. Repository name填写 `courseflow-hackshsid-2026`。
2. Description填写：`Explainable timetable optimization prototype for HackSHSID 2026.`
3. 可见性选 Public，这是比赛表单要求。
4. 为避免README冲突，创建时先不勾选初始化README；不必添加.gitignore或许可证。
5. 点击Create repository。
6. 在空仓库页面点击“uploading an existing file”；如果已有文件，使用Add file→Upload files。
7. 打开电脑的CourseFlow文件夹，选中文件夹里面的文件和evidence文件夹，拖入上传区域。
8. 不要上传整个ZIP；不要把CourseFlow外层文件夹作为唯一一层上传。仓库首页必须直接看到index.html、app.js、engine.js、style.css、README.md。
9. 检查TEAM.md，填入真实贡献后再上传。未授权公开的个人信息不要写入。队员姓名也可只在报名表填写，用成员A/B在公开记录中对应。
10. Commit message填写 `Add CourseFlow prototype and test evidence`。
11. 点击Commit changes。等待上传完成。
12. 仓库首页地址就是报名表要的公开GitHub链接，格式为 https://github.com/你的用户名/courseflow-hackshsid-2026 。复制真实地址，不要原样粘贴此模板。
13. 打开无痕窗口访问仓库，应无需登录即可看到文件。

## 6 发布可直接访问的演示网页（GitHub Pages）
1. 在仓库顶部点Settings。
2. 左侧点Pages。
3. Build and deployment下面的Source选择Deploy from a branch。
4. Branch选择main，文件夹选择 / (root)，点击Save。
5. 等待部署，刷新Pages页面，直到显示已发布的网站链接。也可以在Actions查看pages build and deployment是否成功。
6. 点击页面实际显示的链接测试。项目网站通常形如 https://你的用户名.github.io/courseflow-hackshsid-2026/ ，以GitHub给出的实际地址为准。
7. 网页与仓库链接不同：报名表“GitHub仓库”填写github.com链接；演示网页链接可以放入项目说明和README。
8. 如果404：检查index.html是否在仓库根目录、大小写是否正确、Pages分支是否main、目录是否/(root)，并等待部署完成。
9. 如果只有HTML没有样式：检查style.css、app.js、engine.js是否与index.html同目录，文件名大小写是否一致。
10. 修改文件后通过Add file→Upload files上传同名文件并提交，Pages会重新部署。
官方参考：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 7 填写比赛报名表
1. 打开学校项目说明给出的 https://study.standardcas.org/login ，自行登录。
2. 进入HackSHSID项目提交入口，填写队员信息（规则为1–3人）。
3. 打开SUBMISSION_ZH.md，可用记事本查看；按对应小标题复制内容。
4. 项目名称：CourseFlow｜智能课表优化实验室。
5. 简短介绍：复制对应段落。
6. 赛道选 School Life。学校PDF将Track 1对应School Life，不能因使用优化算法而误选Operation Research。
7. 封面上传cover.png，约1.8MB，符合5MB上限。
8. 项目灵感与说明：复制完整对应段落；如你确实做过访谈或修改，再加入真实内容。
9. GitHub链接：粘贴第5部分获得的真实公开仓库地址。
10. 测试证据：添加文字证据，再依次上传 evidence/01-metrics.png、02-tests.png、03-minutes.png，可再添加04-interface.jpg。最多8张，当前准备4张以内。
11. AI使用声明：复制当前准确版本；若自己已经运行和核对，用事实补充，不能提前声称独立写了全部代码。
12. 视频是可选项，没有就留空。
13. 核对姓名、赛道、公开链接、图片、AI声明后提交；保留成功页面截图。
14. PDF写的是10月17–24日开发与提交，但没有精确截止时刻。今天是2026年10月24日，请以学校平台或活动通知的实际截止时间为准。

## 8 提交前必须知道的三件事
- 这是有测试证据的单学生排课原型，不是已验证可用的全校系统。
- 不能从一张课表获知所有真实限制；至少私下核对转录、单双周、房间号、连堂要求和固定活动。原图里Football显示319教室，但真正场地未确认。
- 报名材料、测试和封面都已准备；真实成员信息、学校调查与本人理解不能由AI虚构。查看PRESENTATION_ZH.md练习5分钟演示。
