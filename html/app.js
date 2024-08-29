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
