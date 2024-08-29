document.addEventListener("DOMContentLoaded", function () {
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
  runCode();
  const cssTextArea = document.getElementById("css");
  cssTextArea.addEventListener("input", function () {
    runCode();
  });
  function runCode() {
    const html = document.getElementById("html").value;
    const css = document.getElementById("css").value;
    const output = document.getElementById("output").contentWindow.document;
    output.open();
    output.writeln("<body>" + "<style>" + css + "</style>" + html + "</body>");
    output.close();
  }
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
