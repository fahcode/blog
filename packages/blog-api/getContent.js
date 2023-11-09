const Axios = require("axios");
const fs = require("fs");
const path = require("path");

(async function () {
  const directoryPath = './output/2015'; // 替换为你要读取的目录路径
  console.log("=====run")
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log('读取目录时发生错误:', err);
      return;
    }
    let list = [];
    files.forEach((file, i) => {
      const filePath = path.join(directoryPath, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.log('获取文件状态时发生错误:', err);
          return;
        }
        if (stats.isFile()) {
          fs.readFile(filePath, 'utf-8', (err, content) => {
            if (err) {
              console.warn('读取文件内容时发生错误:', err);
              return;
            }

            try {
              
            } catch (error) {
              
            }
            // 获取标题等内容
            const header = getHeader(content);
            // getContent(content)
            console.log(`文件名: ${file}`, i, files.length, header.categories);
            list = list.concat(header.categories)
            // console.log(`文件内容:\n${content}`);
            if (i === files.length - 1) {
              fs.writeFile("./header.txt", JSON.stringify(list), { flag: "w" }, (err) => {
                console.log("====write error", err)
              })
            }
          });
        }
      });
    });
  });
})()



function getContent(text) {
  const lines = text.split('\n');
  const startIndex = lines.findIndex(line => line.trim() === '---') + 1; // 找到第一个 '---' 的位置
  const endIndex = lines.findIndex(line => line.trim() === '---', startIndex); // 找到第二个 '---' 的位置

  const contentLines = lines.slice(endIndex + 1); // 取出第二个 '---' 之后的内容
  const content = contentLines.join('\n'); // 将内容转换回字符串形式
  return content
}
function getHeader(text) {
  const titleRegex = /title:\s*"([^"]*)"/;
  const dateRegex = /date:\s*"([^"]*)"/;
  const categoriesRegex = /categories:\s*\n((?:\s*-\s*"[^"]*"\n?)+)/;

  const titleMatch = titleRegex.exec(text);
  const dateMatch = dateRegex.exec(text);
  const categoriesMatch = categoriesRegex.exec(text);

  const title = titleMatch ? titleMatch[1] : null;
  const date = dateMatch ? dateMatch[1] : null;
  const categories = categoriesMatch ? categoriesMatch[1].trim().split('\n').map(item => item.replace(/-\s*"([^"]*)"/, '$1')) : [];

  return { title, date, categories }
}