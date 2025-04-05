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
  const navSearch = document.getElementById("nav-search");

  navSearch.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && navSearch.value.trim().length > 0) {
      window.location.href = `/maclearn/search.html?query=${navSearch.value.trim().toLowerCase()}`;
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelector(".pages");
  const recentt = document.getElementById("recent");
  const achievementt = document.getElementById("achievement");
  const status = document.getElementById("achievement-status");
  const noPage =
    '<p class="no-saved">You don\'t have any saved pages right now. Click on the star icon on the page if you want to save it here!</p>';
  const noRecent =
    '<p class="no-saved">You haven\'t visited any pages recently. Click on the tabs above to explore our courses!</p>';
  const noAchievement = '<p class="no-saved">You haven\'t collected any achievements. Read some articles to get started!</p>';
  let pagesf = Array.from(pages.children);
  if (localStorage.macLearnFavorites) {
    let favoritesl = localStorage.macLearnFavorites.split(",");
    let favorites = Array.from(favoritesl);
    pagesf.forEach((pagef) => {
      favorites.forEach((favorite) => {
        if (pagef.getAttribute("name") === favorite) {
          pagef.style.display = "block";
        }
      });
    });
  } else {
    pages.innerHTML = noPage;
  }
  const clear = document.getElementById("clear");
  clear.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all your saved pages and data on MacLearn? This action can not be undone.")) {
      localStorage.removeItem("macLearnFavorites");
      localStorage.removeItem("maclearnRecent");
      localStorage.removeItem("achievements");
      pages.innerHTML = noPage;
      recentt.innerHTML = noRecent;
      achievementt.innerHTML = noAchievement;
      status.innerHTML = "0/2";
    }
  });
  let recents = localStorage.getItem("maclearnRecent") ? JSON.parse(localStorage.getItem("maclearnRecent")) : [];
  if (recents.length > 0) {
    recents.reverse().forEach((recent) => {
      let recentPage = document.createElement("a");
      let name = recent.split(":")[1];
      switch (recent.split(":")[0]) {
        case "html":
          recentPage.href = "/maclearn/html/article.html?page=" + name;
          break;
        case "css":
          recentPage.href = "/maclearn/css/article.html?page=" + name;
          break;
        case "dev":
          recentPage.href = "/maclearn/references/development/article.html?page=" + name;
          break;
        case "tag":
          recentPage.href = "/maclearn/references/tags/article.html?page=" + name;
          break;
      }
      recentPage.classList.add("recent");
      recentPage.style.display = "flex";
      let lower = name.split("-").join(" ");
      recentPage.innerHTML = lower[0].toUpperCase() + lower.slice(1);
      recentt.appendChild(recentPage);
    });
  } else {
    recentt.innerHTML = noRecent;
  }

  let achievements = localStorage.getItem("achievements") ? JSON.parse(localStorage.getItem("achievements")) : [];
  if (achievements.length > 0) {
    achievements.forEach((achievement) => {
      let item = document.createElement("div");
      item.classList.add("achievement");
      item.innerHTML = achievement;
      achievementt.appendChild(item);
    });
  } else {
    achievementt.innerHTML = noAchievement;
  }
  status.innerHTML = achievements.length + "/2";
});
