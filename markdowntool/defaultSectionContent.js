const { data } = require("./api");
const { Line } = require("./line");

function sectionsDefaultContent(lines) {
  Object.entries(data.defaultContent).forEach(([title, description]) => {
    lines.forEach((line, index) => {
      if (line.content.toLowerCase().includes("### learning outcomes")) {
        line.content = "### Lesson overview";
      }
      if (line.content.toLowerCase().includes('### '.concat(title.toLowerCase()))) {
        line.content = '### '.concat(title);
      }
      if (line.content === '### '.concat(title)) {
        console.log('WAS: ', JSON.stringify(line.content));
        if (
          lines[index + 2].content.trim().startsWith("-") ||
          lines[index + 2].content.trim().startsWith("1")
          ) {
            lines.splice(index, 0, new Line());
            lines.splice(index, 0, new Line());
            lines[index + 2].content = description;
            lines[index].content = "### ".concat(title);
          }
        console.log('NOW: ', JSON.stringify(line.content));
        if (lines[index + 2].content !== description) {
          lines[index + 2].content = description;
          lines.splice(index + 3, 0, new Line());
        } 
      }

    });
  });
  return lines;
}

module.exports = { sectionsDefaultContent };
