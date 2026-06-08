# zijian - 自荐信生成助手

一个 Claude Code Skill，帮助学生快速生成课题组自荐信。

## 功能

- **自动生成**：输入导师主页 URL，自动抓取信息、询问背景、输出完整自荐信草稿
- **检查优化**：提供已有草稿，逐段分析并给出修改建议

## 安装

```bash
npx skills add https://github.com/Manenic/zijian --skill zijian
```

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
- Word文档自动生成为 `cover_letter.docx`
- 修改版保存为 `cover_letter_revised.md`

### 自动生成Word文档

Skill内置脚本 `scripts/md2docx.js`，自动将Markdown草稿转换为格式化的Word文档：

```javascript
// 核心逻辑
function parseMarkdown(md) {
  const lines = md.split("\n");
  const paragraphs = [];

  for (const line of lines) {
    // 解析Markdown内容，转换为Word段落
    // 支持链接、文本格式等
    paragraphs.push(new Paragraph({
      spacing: { line: 360 },
      indent: { firstLine: 480 },
      children: [new TextRun({ text: line, font: "宋体", size: 24 })],
    }));
  }

  return paragraphs;
}

// 生成Word文档
const doc = new Document({ sections: [{ children: parseMarkdown(content) }] });
Packer.toBuffer(doc).then(buffer => fs.writeFileSync("cover_letter.docx", buffer));
```

使用方式：
```bash
node .claude/skills/zijian/scripts/md2docx.js [input.md] [output.docx]
```

## 许可证

MIT License
