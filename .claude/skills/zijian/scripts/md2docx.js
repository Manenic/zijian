#!/usr/bin/env node
/**
 * md2docx.js - 将自荐信Markdown转为Word文档
 *
 * 用法：node md2docx.js [input.md] [output.docx]
 * 默认：读取 cover_letter_draft.md → 输出 cover_letter.docx
 */

const fs = require("fs");
const path = require("path");
const { Document, Packer, Paragraph, TextRun, AlignmentType } = require("docx");

// 解析命令行参数
const inputFile = process.argv[2] || "cover_letter_draft.md";
const outputFile = process.argv[3] || "cover_letter.docx";

// 读取Markdown内容
const content = fs.readFileSync(inputFile, "utf-8");

// 解析Markdown为段落
function parseMarkdown(md) {
  const lines = md.split("\n");
  const paragraphs = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // 空行
    if (!trimmed) {
      paragraphs.push(new Paragraph({ children: [] }));
      continue;
    }

    // 检查是否是链接 [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    const children = [];
    let match;

    while ((match = linkRegex.exec(trimmed)) !== null) {
      // 链接前的文本
      if (match.index > lastIndex) {
        children.push(
          new TextRun({
            text: trimmed.slice(lastIndex, match.index),
            font: "宋体",
            size: 24,
          })
        );
      }
      // 链接文本
      children.push(
        new TextRun({
          text: match[1],
          font: "宋体",
          size: 24,
          color: "0563C1",
          underline: {},
        })
      );
      lastIndex = match.index + match[0].length;
    }

    // 剩余文本
    if (lastIndex < trimmed.length) {
      children.push(
        new TextRun({
          text: trimmed.slice(lastIndex),
          font: "宋体",
          size: 24,
        })
      );
    }

    // 如果没有链接，直接添加整行
    if (children.length === 0) {
      children.push(
        new TextRun({
          text: trimmed,
          font: "宋体",
          size: 24,
        })
      );
    }

    paragraphs.push(
      new Paragraph({
        spacing: { line: 360 },
        indent: { firstLine: 480 },
        alignment: AlignmentType.JUSTIFIED,
        children,
      })
    );
  }

  return paragraphs;
}

// 创建Word文档
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "宋体", size: 24 },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children: parseMarkdown(content),
    },
  ],
});

// 生成Word文件
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputFile, buffer);
  console.log(`Done! Saved to ${path.resolve(outputFile)}`);
});
