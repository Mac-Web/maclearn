document.addEventListener("DOMContentLoaded", function () {
  const logo = document.querySelector("[alt='MacLearn Logo']");
  setInterval(function () {
    if (window.innerWidth <= 768) {
      logo.setAttribute("src","/MacLearn Logo.png");
    } else {
      logo.setAttribute("src","maclearn-logo.png");
    }
  }, 500)
  const wrap = document.getElementById("wrap");
  const bar = document.getElementById("sidebar");
  const close = document.getElementById("closea");
  close.addEventListener("click", function () {
    close.parentElement.parentElement.style.display = "none";
    localStorage.setItem("maclearnclosee","closed");
  })
  document.addEventListener("mousemove", function (event) {
    if (event.clientX <= 5 && bar.classList.contains("movingbar") !== true) {
      bar.classList.add("movingbar");
    }
  });

  document.addEventListener("click", function () {
    bar.classList.remove("movingbar");
  })

  wrap.addEventListener("click", function () {
    console.log("sl");
  });
});