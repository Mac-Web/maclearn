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
  const noPage =
    '<p class="no-saved">You don\'t have any saved pages right now. Click on the star icon on the page if you want to save it here!</p>';
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
    if (confirm("Are you sure you want to clear all your saved pages on MacLearn? This action can not be undone.")) {
      localStorage.removeItem("macLearnFavorites");
      pages.innerHTML = noPage;
    }
  });
});
