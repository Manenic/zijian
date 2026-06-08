const fs = require("fs");
const { Document, Packer, Paragraph, TextRun, AlignmentType } = require("docx");

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: "宋体", size: 24 }, // 小四 = 12pt = 24 half-points
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
        },
      },
      children: [
        // 称呼
        new Paragraph({
          spacing: { line: 360 }, // 1.5 倍行距
          children: [new TextRun({ text: "尊敬的阙老师：", bold: true, font: "宋体", size: 24 })],
        }),
        // 问候
        new Paragraph({
          spacing: { line: 360 },
          indent: { firstLine: 480 }, // 首行缩进 2 字符
          children: [new TextRun({ text: "您好！", font: "宋体", size: 24 })],
        }),
        // 第一段
        new Paragraph({
          spacing: { line: 360 },
          indent: { firstLine: 480 },
          alignment: AlignmentType.JUSTIFIED,
          children: [
            new TextRun({
              text: "我是东华大学材料科学与工程学院高分子材料专业的大二学生张展赫。通过学院官网了解到您的研究方向后，我对您课题组的工作非常感兴趣，冒昧写信，希望能有机会在本科阶段加入您的课题组学习。",
              font: "宋体",
              size: 24,
            }),
          ],
        }),
        // 第二段
        new Paragraph({
          spacing: { line: 360 },
          indent: { firstLine: 480 },
          alignment: AlignmentType.JUSTIFIED,
          children: [
            new TextRun({
              text: "您的研究方向涵盖AI4Fiber、Auto-Research Agent和复杂系统数字孪生。其中，我最感兴趣的是Auto-Research Agent方向——将大语言模型与科学计算、实验规划相结合，构建可自主迭代的科研系统。我认为这是AI与材料科学交叉的重要前沿，也是我希望未来深入学习的方向。",
              font: "宋体",
              size: 24,
            }),
          ],
        }),
        // 第三段
        new Paragraph({
          spacing: { line: 360 },
          indent: { firstLine: 480 },
          alignment: AlignmentType.JUSTIFIED,
          children: [
            new TextRun({
              text: "在学习之余，我尝试用AI工具解决实际问题，比如在写这封自荐信的时候，我将整个工作流整合为一个小的Skill并开源在GitHub上（",
              font: "宋体",
              size: 24,
            }),
            new TextRun({
              text: "https://github.com/Manenic/zijian",
              font: "宋体",
              size: 24,
              color: "0563C1",
              underline: {},
            }),
            new TextRun({
              text: "）。这个小项目让我对Agent的工作原理有了直观的认识。",
              font: "宋体",
              size: 24,
            }),
          ],
        }),
        // 第四段
        new Paragraph({
          spacing: { line: 360 },
          indent: { firstLine: 480 },
          alignment: AlignmentType.JUSTIFIED,
          children: [
            new TextRun({
              text: "作为高分子材料专业的学生，我愿意跨出舒适区，学习编程和AI技术。我希望自己不仅能写代码、读论文，也能理解材料实验和产业需求，在交叉学科中解决真实问题。我知道自己目前还有很多需要学习的地方，但我相信通过在课题组的学习和实践，我能不断成长。",
              font: "宋体",
              size: 24,
            }),
          ],
        }),
        // 感谢
        new Paragraph({
          spacing: { line: 360 },
          indent: { firstLine: 480 },
          alignment: AlignmentType.JUSTIFIED,
          children: [
            new TextRun({
              text: "冒昧致信，恳请您海涵！非常感谢您在百忙之中抽出时间阅读我的邮件，期待您的回复。",
              font: "宋体",
              size: 24,
            }),
          ],
        }),
        // 空行
        new Paragraph({ spacing: { line: 360 }, children: [] }),
        // 此致
        new Paragraph({
          spacing: { line: 360 },
          children: [new TextRun({ text: "此致", font: "宋体", size: 24 })],
        }),
        // 敬礼
        new Paragraph({
          spacing: { line: 360 },
          children: [new TextRun({ text: "敬礼！", font: "宋体", size: 24 })],
        }),
        // 空行
        new Paragraph({ spacing: { line: 360 }, children: [] }),
        // 署名
        new Paragraph({
          spacing: { line: 360 },
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "张展赫", font: "宋体", size: 24 })],
        }),
        // 学校专业
        new Paragraph({
          spacing: { line: 360 },
          alignment: AlignmentType.RIGHT,
          children: [
            new TextRun({
              text: "东华大学 材料科学与工程学院 高分子材料专业",
              font: "宋体",
              size: 24,
            }),
          ],
        }),
        // 邮箱
        new Paragraph({
          spacing: { line: 360 },
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "邮箱：XXX", font: "宋体", size: 24 })],
        }),
        // 电话
        new Paragraph({
          spacing: { line: 360 },
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "电话：XXX", font: "宋体", size: 24 })],
        }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("E:/readmehhh/cover_letter.docx", buffer);
  console.log("Done! Saved to E:/readmehhh/cover_letter.docx");
});
