function jsonToExcel(data, head, name = "download") {
  // 设置表头
  let source = head ? head + "\n" : "";
  // 将数据循环拼接到表中
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      source += item[key] + ",\t";
    });
    source += "\n";
  });

  const uri =
    "data:text/xlsx;charset=utf-8,\ufeff" + encodeURIComponent(source);

  // 创建a标签来实现下载
  const link = document.createElement("a");
  link.href = uri;
  // 对下载的文件命名
  link.download = `${name}.xlsx`;
  link.style.display = "none";
  link.click();
}

module.exports = jsonToExcel;
export default jsonToExcel;
