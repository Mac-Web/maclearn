document.addEventListener("DOMContentLoaded", function () {
  const sidebarmain = document.createElement("div");
  sidebarmain.classList.add("macsidebar");
  sidebarmain.setAttribute("id", "sidebar");
  sidebarmain.innerHTML = `<a href="/"><img src="/logo.png" alt="" /></a>
  <a href="/macideas/"><img src="/MacIdeas Logo.png" alt="" /></a>
<a href="/maclearn/"><img src="/MacLearn Logo.png" alt="" /></a>
<a href="/mactools/"><img src="/MacTools Logo.png" alt="" /></a>
<a href="/macvg/"><img src="/MacVG Logo.png" alt="" /></a>
<a href="/macblog/"><img src="/MacBlog Logo.png" alt="" /></a>`;
  document.addEventListener("mousemove", function (event) {
    if (event.clientX <= 5 && sidebarmain.classList.contains("movingbar") !== true) {
      sidebarmain.classList.add("movingbar");
    }
  });
  document.addEventListener("click", function () {
    sidebarmain.classList.remove("movingbar");
  });
  document.body.appendChild(sidebarmain);
  //Above is code for MacWeb sidebar

  const nav = document.createElement("nav");
  nav.classList.add("nav");
  nav.innerHTML = `
      <a href="/maclearn/" class="logo">
        <img src="/maclearn/maclearn-logo.png" alt="MacLearn Logo" />
      </a>
      <a href="/maclearn/html/" class="nav-link">HTML</a>
      <a href="/maclearn/css/" class="nav-link">CSS</a>
      <a href="/maclearn/references/" class="nav-link">References</a>
      <a href="/maclearn/playground/" class="nav-link">Playground</a>
      <div class="right">
        <div class="select help-menu" id="help-menu">
          <span class="help-menu">Help</span>
          <img
            src="/maclearn/media/icons/caret.svg"
            class="caret help-menu"
            id="caret"
          />
          <ul id="cats" class="help-menu">
            <a href="/macblog/projects/maclearn/">About</a>
            <a href="/macblog/updates/maclearn/">Updates</a>
            <a href="/macblog/projects/maclearn/">Docs</a>
            <a href="https://forms.gle/P5QfiZFgZ3KURdbJ8" target="_blank">
              Feedback
            </a>
          </ul>
        </div>
        <a href="/maclearn/me/" class="profile">
          <img src="/maclearn/media/icons/profile.svg" />
        </a>
      </div>`;
  //Above is code for nav bar

  const currentPage = window.location.pathname.split("/").pop();
  let paragraph,
    articleName,
    articleDate,
    articleRelease,
    author,
    prevLink,
    nextLink,
    interactiveHTML = null;
  const dataFile = "data/" + currentPage.split(".")[0] + ".json";
  fetch(dataFile)
    .then((response) => response.json())
    .then((data) => {
      paragraph = data.paragraph;
      articleName = data.articleName;
      articleDate = data.articleDate;
      articleRelease = data.articleRelease;
      author = data.author;
      prevLink = data.previous;
      nextLink = data.next;
      if (data.interactiveHTML) {
        interactiveHTML = data.interactiveHTML;
      }
      if (data.interactives) {
        interactiveHTML = data.interactives;
      }
      if (data.interactives) {
        interactiveHTML = data.interactives;
        console.log(interactiveHTML);
      }
      const wrapper = document.createElement("div");
      wrapper.classList.add("wrap");
      wrapper.innerHTML = `
      
      <ul class="sidebar">
        <h2 class="sidebar-title">HTML Visuals</h2>
        <a href="html-tables.html">
          <li>HTML Tables</li>
        </a>
        <a href="html-multimedia.html">
          <li>HTML Multimedia</li>
        </a>
        <a href="html-embed.html">
          <li>HTML Embed</li>
        </a>
        <a href="html-svg.html">
          <li>HTML SVG</li>
        </a>
        <a href="visuals-quiz.html">
          <li>Unit Quiz</li>
        </a>
        <h2 class="sidebar-title">Efficient Code</h2>
        <a href="html-semantics.html">
          <li>HTML Semantics</li>
        </a>
        <a href="html-special-characters.html">
          <li>HTML Special Characters</li>
        </a>
        <a href="efficient-quiz.html">
          <li>Unit Quiz</li>
        </a>
        <h2 class="sidebar-title">Handling Users</h2>
        <a href="html-forms.html">
          <li>HTML Forms</li>
        </a>
        <a href="html-meta.html">
          <li>HTML Meta Tag</li>
        </a>
        <a href="user-quiz.html">
          <li>Unit Quiz</li>
        </a>
        <div class="sidebtns">
          <a href="what-is-coding.html" class="sidebtn">Back</a>
          <a href="finish.html" class="sidebtn">Next</a>
        </div>
      </ul>
      <!--<div class="tbar" id="tbar">
        <h2 class="bart">${articleName}</h2>
        <div class="bard">${articleDate}</div>
      </div>-->
      <script src="app.js"></script>
      <div class="content">
      <article class="article">
       <!-- <div class="entire">
          <div class="sharepanel">
            <div class="sharethis-inline-share-buttons"></div>
            <div class="copy">
              <div class="clink" id="clink"></div>
              <div class="cbtn" id="cbtn">Copy</div>
            </div>
          </div>
        </div>-->
        <h1 class="article-title">${articleName}</h1>
        <h3 class="author">By ${author} <span class="date">${articleDate}</span></h3>
        <!--<span class="date">${articleRelease}</span>-->
        <!--
          <div class="icons">
            <img
              src="/maclearn/media/icons/star-regular.svg"
              alt="Favorite"
              id="favorite"
              class="icon"
            />
            <img
              src="/maclearn/media/icons/share-solid.svg"
              alt="Share"
              id="share"
              class="icon"
            />
            <img
              src="/maclearn/media/icons/flag.svg"
              alt="Report"
              id="flag"
              class="icon"
            />
          </div>-->
        <hr />
        ${paragraph}
        <div class="buttons">
          <a href="${prevLink}" class="button">Back</a>
          <a href="${nextLink}" class="button">Next</a>
        </div>
        <footer class="footer">
          <div>
            © <span id="year">2025</span>
            <a
              href="/"
              target="_blank"
              style="text-decoration: underline; color: white"
              >MacWeb</a
            >
          </div>
        </footer>
      </article>
      </div>`;
      //Above is code for the main content of the page

      document.body.appendChild(nav);
      document.body.appendChild(wrapper);

      const helpMenuItems = document.getElementById("cats");
      const helpMenu = document.getElementById("help-menu");
      const helpCaret = document.getElementById("caret");
      let helpOpen = false;
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

      const sideItems = document.querySelector(".sidebar").querySelectorAll("li");
      console.log(sideItems);
      sideItems.forEach((item) => {
        let itemText = item.innerHTML;
        if (itemText === articleName) {
          item.parentElement.style.color = "rgb(89, 137, 227)";
          item.parentElement.style.fontWeight = "bold";
        }
      });
      if (interactiveHTML != null) {
        if (interactiveHTML.count) {
          for (let i = 1; i <= interactiveHTML.count; i++) {
            let htmlCodeLabs = i == 1 ? document.getElementById("htmlEdit") : document.getElementById("htmlEdit2");
            htmlCodeLabs.value = interactiveHTML[`interactiveHTML${i}`];
          }
        } else {
          let htmlCodeLabs = document.getElementById("htmlEdit");
          htmlCodeLabs.value = interactiveHTML;
        }
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
      const authorr = document.querySelector(".author");
      const page = document.getElementById("page").getAttribute("data");
      /*clink.innerHTML = window.location.href;
      window.addEventListener("scroll", function () {
        if (window.scrollY > 150) {
          bar.classList.add("tbar-v");
          bar.appendChild(icons);
        } else {
          bar.classList.remove("tbar-v");
          authorr.appendChild(icons);
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
      });*/
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
      code(htmlTab, htmlEdit);
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

      const htmlTab2 = document.getElementById("html2");
      const cssTab2 = document.getElementById("css2");
      const jsTab2 = document.getElementById("js2");
      const outputTab2 = document.getElementById("output2");
      const htmlEdit2 = document.getElementById("htmlEdit2");
      const cssEdit2 = document.getElementById("cssEdit2");
      const jsEdit2 = document.getElementById("jsEdit2");
      const outputEdit2 = document.getElementById("outputEdit2");
      const tabs2 = [htmlTab2, cssTab2, jsTab2, outputTab2];
      const edits2 = [htmlEdit2, cssEdit2, jsEdit2, outputEdit2];
      const outputWindow2 = outputEdit2.contentWindow.document;
      htmlTab2.addEventListener("click", function () {
        code2(htmlTab2, htmlEdit2);
      });
      cssTab2.addEventListener("click", function () {
        code2(cssTab2, cssEdit2);
      });
      jsTab2.addEventListener("click", function () {
        code2(jsTab2, jsEdit2);
      });
      outputTab2.addEventListener("click", function () {
        code2(outputTab2, outputEdit2);
        output2();
      });
      function code2(tab, edit) {
        tabs2.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        edits2.forEach((e) => e.classList.remove("show"));
        edit.classList.add("show");
      }
      function output2() {
        let html = htmlEdit2.value;
        let css = cssEdit2.value;
        let js = jsEdit2.value;
        let documentHTML = outputWindow2.getElementsByTagName("html")[0];
        documentHTML.innerHTML = "";
        outputWindow2.open();
        outputWindow2.write(
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
        outputWindow2.close();
      }
    });
});
