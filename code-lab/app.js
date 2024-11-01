const htmlTab = document.getElementById("html");
const cssTab = document.getElementById("css");
const jsTab = document.getElementById("js");
const outputTab = document.getElementById("output");
const htmlEdit = document.getElementById("htmlEdit");
const cssEdit = document.getElementById("cssEdit");
const jsEdit = document.getElementById("jsEdit");
const outputEdit = document.getElementById("outputEdit");
const tabs = [htmlTab, cssTab, jsTab, outputTab];
const edits = [htmlEdit, cssEdit, jsEdit, outputEdit];
const outputWindow = outputEdit.contentWindow.document;
htmlTab.addEventListener("click", function () {
  code(htmlTab, htmlEdit);
});
cssTab.addEventListener("click", function () {
  code(cssTab, cssEdit);
});
jsTab.addEventListener("click", function () {
  code(jsTab, jsEdit);
});
outputTab.addEventListener("click", function () {
  code(outputTab, outputEdit);
  output();
});
function code(tab, edit) {
  tabs.forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");
  edits.forEach((e) => e.classList.remove("show"));
  edit.classList.add("show");
}
function output() {
  let html = htmlEdit.value;
  let css = cssEdit.value;
  let js = jsEdit.value;
  let documentHTML = outputWindow.getElementsByTagName("html")[0];
  documentHTML.innerHTML = "";
  outputWindow.open();
  outputWindow.write(
    "<style>" +
      "* {margin:8px; word-wrap:break-word; white-space:pre-wrap; } html {margin:0px;background-color: white;}" +
      css +
      "</style>" +
      "<body>" +
      html +
      "<script>{" +
      js +
      "}</script>" +
      "</body>"
  );
  outputWindow.close();
}
