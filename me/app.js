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

document.addEventListener("DOMContentLoaded", function () {
  const pages = document.querySelector(".pages");
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
  }
});
