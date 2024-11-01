document.addEventListener("DOMContentLoaded", function () {
  const bar = document.getElementById("sidebar");
  const helpMenuItems = document.getElementById("cats");
  const helpMenu = document.getElementById("help-menu");
  const helpCaret = document.getElementById("caret");
  let helpOpen = false;
  document.addEventListener("click", function () {
    bar.classList.remove("movingbar");
  });
  document.addEventListener("mousemove", function (event) {
    if (event.clientX <= 5 && bar.classList.contains("movingbar") !== true) {
      bar.classList.add("movingbar");
    }
  });
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("help-menu")) {
      helpMenuItems.style.transform = "scaleY(0)";
      helpMenu.removeAttribute("style");
      helpCaret.removeAttribute("style");
      helpOpen = false;
    }
  });
  helpMenu.addEventListener("click", () => {
    if (helpOpen === false) {
      helpMenuItems.style.transform = "scaleY(1)";
      helpMenu.style.backgroundColor = "rgba(15, 15, 15, 0.8)";
      helpCaret.style.transform = "rotate(0deg)";
      helpOpen = true;
    } else {
      helpMenuItems.style.transform = "scaleY(0)";
      helpMenu.removeAttribute("style");
      helpCaret.removeAttribute("style");
      helpOpen = false;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const htmlTab = document.getElementById("html");
  const cssTab = document.getElementById("css");
  const jsTab = document.getElementById("js");
  const outputTab = document.getElementById("output");
  const htmlEdit = document.getElementById("htmlEdit");
  htmlEdit.value = htmlEdit.getAttribute("value");
  const cssEdit = document.getElementById("cssEdit");
  cssEdit.value = cssEdit.getAttribute("value");
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
  const bar = document.getElementById("tbar");
  const favorite = document.getElementById("favorite");
  const share = document.getElementById("share");
  const report = document.getElementById("flag");
  const sharel = document.querySelector(".entire");
  const sharem = document.querySelector(".sharepanel");
  const copy = document.getElementById("cbtn");
  const clink = document.getElementById("clink");
  const icons = document.querySelector(".icons");
  const author = document.querySelector(".author");
  const page = document.getElementById("page").getAttribute("data");
  clink.innerHTML = window.location.href;
  console.log(localStorage.macLearnFavorites);
  window.addEventListener("scroll", function () {
    if (window.scrollY > 150) {
      bar.classList.add("tbar-v");
      bar.appendChild(icons);
    } else {
      bar.classList.remove("tbar-v");
      author.appendChild(icons);
    }
  });
  if (localStorage.macLearnFavorites) {
    let favorites = localStorage.macLearnFavorites.split(",");
    let things = Array.from(favorites);
    things.forEach(function (thing) {
      if (thing === page) {
        favorite.src = "/maclearn/media/icons/star-solid.svg";
        return;
      }
    });
  }
  favorite.addEventListener("click", function () {
    if (favorite.src.endsWith("star-solid.svg")) {
      favorite.src = "/maclearn/media/icons/star-regular.svg";
      let favorites = localStorage.macLearnFavorites.split(",");
      let things = Array.from(favorites);
      things.forEach(function (thing, index) {
        if (thing === page) {
          things.splice(index, 1); // Remove 1 element at the current index
        }
      });
      localStorage.setItem("macLearnFavorites", things.join(",")); // Convert things back to a string
      return;
    } else {
      favorite.src = "/maclearn/media/icons/star-solid.svg";
      if (localStorage.macLearnFavorites) {
        let favorites = localStorage.macLearnFavorites.split(",");
        let things = Array.from(favorites);
        things.push(page);
        localStorage.setItem("macLearnFavorites", things + ",");
      } else {
        localStorage.setItem("macLearnFavorites", page + ",");
      }
      return;
    }
  });
  share.addEventListener("click", function () {
    sharel.style.display = "flex";
    sharel.style.visibility = "visible";
    sharel.addEventListener("click", function (e) {
      if (e.target !== sharem && e.target !== copy && e.target !== clink) {
        sharel.style.display = "none";
        sharel.style.visibility = "hidden";
      }
    });
  });
  copy.addEventListener("click", function () {
    navigator.clipboard.writeText(clink.innerHTML);
  });
  report.addEventListener("click", function () {
    window.open("https://forms.gle/GrNw79oqWgr2u9aLA", "_blank");
  });
  
});

document.addEventListener("DOMContentLoaded", function () {
  const overflowMenu = document.getElementById("overflow-menu");
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("shoot")) {
      overflowMenu.classList.add("menu-slide");
    } else {
      overflowMenu.classList.remove("menu-slide");
    }
  });
});
