document.addEventListener("DOMContentLoaded", function () {
  const beginnerArticles = [
    "whats-coding",
    "whats-html",
    "html-tags",
    "0",
    "html-basic",
    "html-article",
    "html-attributes",
    "1",
    "html-img",
    "html-hyperlink",
    "html-list",
    "html-formatting",
    "2",
  ];
  const advancedArticles = [
    "html-tables",
    "html-multimedia",
    "html-embed",
    "html-svg",
    "3",
    "html-semantics",
    "html-special",
    "4",
    "html-forms",
    "html-meta",
    "5",
  ];
  //Above is every article in HTML course

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
        <input type="text" placeholder="Search articles" class="nav-search" id="nav-search">
        <div class="select help-menu" id="help-menu">
          <span class="help-menu">Help</span>
          <img src="/maclearn/media/icons/caret.svg" class="caret help-menu" id="caret" />
          <ul id="cats" class="help-menu">
            <a href="/macblog/apps/maclearn/">About</a>
            <a href="/macblog/updates/maclearn/">Updates</a>
            <a href="/macblog/apps/maclearn/">Docs</a>
            <a href="https://forms.gle/P5QfiZFgZ3KURdbJ8" target="_blank"> Feedback </a>
          </ul>
        </div>
        <a href="/maclearn/me/" class="profile">
          <img src="/maclearn/media/icons/profile.svg" />
        </a>
      </div>`;
  //Above is code for nav bar

  const params = new URLSearchParams(window.location.search);
  const targetUrl = params.get("page");
  const currentPage = targetUrl;
  const pageTitle = document.getElementById("title");
  let achievements = localStorage.getItem("achievements") ? JSON.parse(localStorage.getItem("achievements")) : [];
  let recents = localStorage.getItem("maclearnRecent") ? JSON.parse(localStorage.getItem("maclearnRecent")) : [];
  let recentIndex = recents.indexOf("html:" + currentPage);
  if (recentIndex > -1) {
    recents.splice(recentIndex, 1);
    recents.push("html:" + currentPage);
  } else {
    if (recents.length === 5) {
      recents.shift();
      if (!achievements.includes("Dedicated Learner: Read 6 articles from any course")) {
        achievements.push("Dedicated Learner: Read 6 articles from any course");
        localStorage.setItem("achievements", JSON.stringify(achievements));
        createNotification("Achievement earned: Dedicated Learner! Go to your learner profile on the top right to learn more.");
      }
    }
    recents.push("html:" + currentPage);
  }
  localStorage.setItem("maclearnRecent", JSON.stringify(recents));
  let beginnerFlag = beginnerArticles.includes(targetUrl);
  let articleIndex = beginnerFlag ? beginnerArticles.indexOf(targetUrl) : advancedArticles.indexOf(targetUrl);
  let paragraph,
    articleName,
    articleDate,
    articleRelease,
    author,
    prevLink,
    nextLink,
    interactiveHTML = null;
  const dataFile = "articles.json";
  fetch(dataFile)
    .then((response) => response.json())
    .then((dataa) => {
      let data = dataa[dataa.findIndex((answer) => answer.id === currentPage)];
      paragraph = data.paragraph;
      articleName = data.articleName;
      articleDate = data.articleDate;
      articleRelease = data.articleRelease;
      author = data.author;
      if (beginnerFlag) {
        if (Number(beginnerArticles[articleIndex - 1]) % 1 == 0) {
          prevLink = "quiz.html?id=" + beginnerArticles[articleIndex - 1];
        } else {
          prevLink = articleIndex == 0 ? "/maclearn/" : `article.html?page=${beginnerArticles[articleIndex - 1]}`;
        }
        if (Number(beginnerArticles[articleIndex + 1]) % 1 == 0) {
          nextLink = "quiz.html?id=" + beginnerArticles[articleIndex + 1];
        } else {
          nextLink = "article.html?page=" + beginnerArticles[articleIndex + 1];
        }
      } else {
        if (Number(advancedArticles[articleIndex - 1]) % 1 == 0) {
          prevLink = "quiz.html?id=" + advancedArticles[articleIndex - 1];
        } else {
          prevLink = articleIndex == 0 ? "quiz.html?id=2" : `article.html?page=${advancedArticles[articleIndex - 1]}`;
        }
        if (Number(advancedArticles[articleIndex + 1]) % 1 == 0) {
          nextLink = "quiz.html?id=" + advancedArticles[articleIndex + 1];
        } else {
          nextLink = "article.html?page=" + advancedArticles[articleIndex + 1];
        }
      }
      pageTitle.innerHTML = articleName + " | MacLearn";
      if (data.interactiveHTML) {
        interactiveHTML = data.interactiveHTML;
      }
      if (data.interactives) {
        interactiveHTML = data.interactives;
      }
      if (data.interactives) {
        interactiveHTML = data.interactives;
      }
      const wrapper = document.createElement("div");
      wrapper.classList.add("wrap");
      wrapper.innerHTML = `
      ${
        beginnerFlag
          ? `<ul class="sidebar">
        <h2 class="sidebar-title">The Very Basics</h2>
        <a href="article.html?page=whats-coding"><li>What is Coding?</li></a>
        <a href="article.html?page=whats-html"><li>What is HTML?</li></a>
        <a href="article.html?page=html-tags"><li>More HTML Tags!</li></a>
        <a href="quiz.html?id=0"><li>Unit Quiz</li></a>
        <h2 class="sidebar-title">HTML Foundations</h2>
        <a href="article.html?page=html-basic"><li>HTML Basic Structure</li></a>
        <a href="article.html?page=html-article"><li>HTML Article Structure</li></a>
        <a href="article.html?page=html-attributes"><li>HTML Attributes</li></a>
        <a href="quiz.html?id=1"><li>Unit Quiz</li></a>
        <h2 class="sidebar-title">Common Tags</h2>
        <a href="article.html?page=html-img"><li>HTML Image</li></a>
        <a href="article.html?page=html-hyperlink"><li>HTML Hyperlink</li></a>
        <a href="article.html?page=html-list"><li>HTML List</li></a>
        <a href="article.html?page=html-formatting"><li>HTML Formatting</li></a>
        <a href="quiz.html?id=2"><li>Unit Quiz</li></a>
        <div class="sidebtns">
          <a href="/maclearn/" class="sidebtn">Back</a>
          <a href="article.html?page=html-tables" class="sidebtn">Next</a>
        </div>
      </ul>`
          : `<ul class="sidebar">
        <h2 class="sidebar-title">HTML Visuals</h2>
        <a href="article.html?page=html-tables">
          <li>HTML Tables</li>
        </a>
        <a href="article.html?page=html-multimedia">
          <li>HTML Multimedia</li>
        </a>
        <a href="article.html?page=html-embed">
          <li>HTML Embed</li>
        </a>
        <a href="article.html?page=html-svg">
          <li>HTML SVG</li>
        </a>
        <a href="quiz.html?id=3">
          <li>Unit Quiz</li>
        </a>
        <h2 class="sidebar-title">Efficient Code</h2>
        <a href="article.html?page=html-semantics">
          <li>HTML Semantics</li>
        </a>
        <a href="article.html?page=html-special">
          <li>HTML Special Characters</li>
        </a>
        <a href="quiz.html?id=4">
          <li>Unit Quiz</li>
        </a>
        <h2 class="sidebar-title">Handling Users</h2>
        <a href="article.html?page=html-forms">
          <li>HTML Forms</li>
        </a>
        <a href="article.html?page=html-meta">
          <li>HTML Meta Tag</li>
        </a>
        <a href="quiz.html?id=5">
          <li>Unit Quiz</li>
        </a>
        <div class="sidebtns">
          <a href="article.html?page=whats-coding" class="sidebtn">Back</a>
          <a href="finish.html" class="sidebtn">Next</a>
        </div>
      </ul>`
      }
      <script src="app.js"></script>
      <div class="content">
      <article class="article">
       <div class="entire">
        <h1 class="article-title">${articleName}</h1>
        <div class="article-info">
        <h3 class="author">By ${author} <span class="date">${articleDate}</span></h3>
        <!--<span class="date">${articleRelease}</span>-->
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
          </div>
          </div>
        <hr />
        
        <div class="ad-container">
        </div>
        ${paragraph}
        
        <div class="ad-container">
          <ins
      class="adsbygoogle"
      data-ad-client="ca-pub-5598129470490010"
      data-ad-slot="2392383134"
      data-ad-format="auto"
      data-full-width-responsive="true"
          ></ins>
        </div>
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
      const ad = document.createElement("ins");
      ad.className = "adsbygoogle";
      ad.style.display = "block";
      ad.setAttribute("data-ad-client", "ca-pub-5598129470490010");
      ad.setAttribute("data-ad-slot", "3087664545");
      ad.setAttribute("data-ad-format", "auto");
      ad.setAttribute("data-full-width-responsive", "true");
      document.querySelector(".ad-container").appendChild(ad);

      (adsbygoogle = window.adsbygoogle || []).push({});
      const observer = new MutationObserver(() => {
        wrapper.style.height = "calc(100vh - 50px)";
        wrapper.style.minHeight = "calc(100vh - 50px)";
      });
      observer.observe(wrapper, {
        attributes: true,
        attributeFilter: ["style"],
      });
      //Above is code for getting rid of AdSense's height:auto rule on the wrapper

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
      const navSearch = document.getElementById("nav-search");

      navSearch.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && navSearch.value.trim().length > 0) {
          window.location.href = `/maclearn/search.html?query=${navSearch.value.trim().toLowerCase()}`;
        }
      });
      const sideItems = document.querySelector(".sidebar").querySelectorAll("li");
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

      const favorite = document.getElementById("favorite");
      const share = document.getElementById("share");
      const report = document.getElementById("flag");
      const params = new URLSearchParams(window.location.search);
      const targetUrl = params.get("page");
      const page = targetUrl;
      if (!targetUrl) window.location.href = "/maclearn/";
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
              things.splice(index, 1);
            }
          });
          localStorage.setItem("macLearnFavorites", things.join(","));
          createNotification("Page removed from your saved pages!");
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
          createNotification("Page added to your saved pages!");
          return;
        }
      });
      share.addEventListener("click", function () {
        navigator.clipboard.writeText(window.location.href);
        createNotification("Link copied to clipboard!");
      });
      report.addEventListener("click", function () {
        window.open("https://forms.gle/GrNw79oqWgr2u9aLA", "_blank");
      });
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
            " html {background-color: white;}" +
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
      const htmlTab3 = document.getElementById("html3");
      const cssTab3 = document.getElementById("css3");
      const jsTab3 = document.getElementById("js3");
      const outputTab3 = document.getElementById("output3");
      const htmlEdit3 = document.getElementById("htmlEdit3");
      const cssEdit3 = document.getElementById("cssEdit3");
      const jsEdit3 = document.getElementById("jsEdit3");
      const outputEdit3 = document.getElementById("outputEdit3");
      const tabs3 = [htmlTab3, cssTab3, jsTab3, outputTab3];
      const edits3 = [htmlEdit3, cssEdit3, jsEdit3, outputEdit3];
      const outputWindow3 = outputEdit3.contentWindow.document;
      htmlTab3.addEventListener("click", function () {
        code3(htmlTab3, htmlEdit3);
      });
      cssTab3.addEventListener("click", function () {
        code3(cssTab3, cssEdit3);
      });
      jsTab3.addEventListener("click", function () {
        code3(jsTab3, jsEdit3);
      });
      outputTab3.addEventListener("click", function () {
        code3(outputTab3, outputEdit3);
        output3();
      });
      function code3(tab, edit) {
        tabs3.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        edits3.forEach((e) => e.classList.remove("show"));
        edit.classList.add("show");
      }
      function output3() {
        let html = htmlEdit3.value;
        let css = cssEdit3.value;
        let js = jsEdit3.value;
        let documentHTML = outputWindow3.getElementsByTagName("html")[0];
        documentHTML.innerHTML = "";
        outputWindow3.open();
        outputWindow3.write(
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
        outputWindow3.close();
      }
    });

  function createNotification(message) {
    if (document.querySelector(".notification")) {
      document.body.removeChild(document.querySelector(".notification"));
    }
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerHTML = "<img src='/maclearn/media/icons/notification.svg'>" + message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }
});
