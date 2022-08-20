function downloadFile(data, name, exstension = "xlsx") {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement("a");
  link.style.display = "none";
  link.href = url;
  link.setAttribute("download", `${name}.${exstension}`);
  link.click();
}

export default downloadFile;
module.exports = downloadFile;
