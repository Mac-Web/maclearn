document.addEventListener("DOMContentLoaded", function () {
  const articles = ["installing-vscode"];
  //Above is every article in web developement reference

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
  let articleIndex = articles.indexOf(targetUrl);
  let paragraph, articleName, articleDate, articleRelease, author, prevLink, nextLink, sidebarText;
  const dataFile = "articles.json";
  fetch(dataFile)
    .then((response) => response.json())
    .then((dataa) => {
      let data = dataa[dataa.findIndex((answer) => answer.id === currentPage)];
      paragraph = data.paragraph;
      articleName = data.articleName;
      articleDate = data.articleDate;
      articleRelease = data.articleRelease;
      sidebarText = data.sidebarText;
      author = data.author;
      prevLink = articleIndex == 0 ? "/maclearn/references/" : "article.html?page=" + articles[articleIndex - 1];
      nextLink =
        articleIndex == articles.length - 1 ? "/maclearn/references/" : "article.html?page=" + articles[articleIndex + 1];
      pageTitle.innerHTML = articleName + " | MacLearn";
      const wrapper = document.createElement("div");
      wrapper.classList.add("wrap");
      wrapper.innerHTML = `<ul class="sidebar">
            
        <h2 class="sidebar-title">Web Development</h2>
        <a href="article.html?page=installing-vscode">
          <li>Installing VS Code</li>
        </a>
          </ul>
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
          <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-5598129470490010"
      data-ad-slot="2392383134"
      data-ad-format="auto"
      data-full-width-responsive="true"
          ></ins>
        </div>
              ${paragraph}
        
              <div class="ad-container">
                <ins
            class="adsbygoogle"
            style="display: block"
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
            </div>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
    </script>`;
      //Above is code for the main content of the page

      document.body.appendChild(nav);
      document.body.appendChild(wrapper);

      (adsbygoogle = window.adsbygoogle || []).push({});

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
        let itemText = item.innerText;
        if (itemText === sidebarText) {
          item.parentElement.style.color = "rgb(89, 137, 227)";
          item.parentElement.style.fontWeight = "bold";
        }
      });

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
      report.addEventListener("click", function () {
        window.open("https://forms.gle/GrNw79oqWgr2u9aLA", "_blank");
      });
    });
});
