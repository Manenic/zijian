# zijian - 自荐信生成助手

一个 Claude Code Skill，帮助学生快速生成课题组自荐信。

## 功能

- **自动生成**：输入导师主页 URL，自动抓取信息、询问背景、输出完整自荐信草稿
- **检查优化**：提供已有草稿，逐段分析并给出修改建议

## 安装

### 方式一：全局安装（推荐）

将 `.claude/skills/zijian/` 目录复制到你的 Claude Code skills 目录：

```bash
# Windows
xcopy /E /I .claude\skills\zijian %USERPROFILE%\.claude\skills\zijian

# macOS / Linux
cp -r .claude/skills/zijian ~/.claude/skills/zijian
```

### 方式二：项目级安装

将 `.claude/skills/zijian/` 目录放到你项目的 `.claude/skills/` 目录下即可。

## 使用方法

在 Claude Code 中输入：

```
/zijian
```

然后根据提示提供导师主页 URL 和你的个人信息即可。

### 生成模式

```
/zijian
> 请提供导师主页 URL
https://cmse.dhu.edu.cn/2026/0430/c14707a375489/page.htm
> （Claude 会自动抓取信息并询问你的背景）
> （输出自荐信建议和完整草稿）
```

### 检查模式

```
/zijian
> （粘贴你的自荐信草稿）
> （Claude 会逐段分析并给出修改建议）
```

## 支持的网站类型

- 高校教师主页（.edu.cn / .edu）
- 个人学术网站
- Google Scholar
- ResearchGate
- 其他网页

如果自动抓取失败，会提示你手动粘贴信息。

## 输出

- 自荐信草稿保存为 `cover_letter_draft.md`
- 修改版保存为 `cover_letter_revised.md`

## 许可证

MIT License
