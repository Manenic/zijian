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

Skill内置脚本 `scripts/md2docx.py`，自动将Markdown草稿转换为格式化的Word文档：

```python
# 核心逻辑
def parse_markdown(md_content):
    """解析Markdown内容，返回段落列表"""
    lines = md_content.split("\n")
    paragraphs = []
    for line in lines:
        if line.strip():
            paragraphs.append(line.strip())
    return paragraphs

def create_word_document(paragraphs, output_file):
    """创建Word文档"""
    doc = Document()
    for text in paragraphs:
        p = doc.add_paragraph()
        p.paragraph_format.first_line_indent = Cm(0.74)  # 首行缩进
        p.paragraph_format.line_spacing = 1.5  # 1.5倍行距
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY  # 两端对齐
        run = p.add_run(text)
        run.font.name = '宋体'
        run.font.size = Pt(12)
    doc.save(output_file)
```

使用方式：
```bash
python .claude/skills/zijian/scripts/md2docx.py [input.md] [output.docx]
```

## 许可证

MIT License
