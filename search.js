const results = document.getElementById("result");
const header = document.getElementById("header");
const params = new URLSearchParams(window.location.search);
const query = params.get("query");
header.innerHTML += ` for "${query}"`;
let lessons = [];
async function fetchLessons() {
  try {
    const htmlData = await fetch("html/articles.json");
    const cssData = await fetch("css/articles.json");
    const tagReferenceData = await fetch("references/tags/articles.json");

    const htmlJson = await htmlData.json();
    const cssJson = await cssData.json();
    const tagJson = await tagReferenceData.json();

    lessons = [...htmlJson, ...cssJson, ...tagJson];
  } catch (error) {
    console.error("Error fetching lessons:", error);
  }
}

fetchLessons().then(() => {
  const filteredLessons = lessons.filter(
    (lesson) => lesson.articleName.toLowerCase().includes(query) || lesson.paragraph.toLowerCase().includes(query)
  );
  if (filteredLessons.length > 0) {
    results.innerHTML = "";
    filteredLessons.forEach((lesson) => {
      let course = "";
      const lessonElement = document.createElement("a");
      lessonElement.classList.add("result-lesson");
      if (lesson.sidebarText) {
        course = "references/tags";
      } else if (lesson.interactiveCSS) {
        course = "css";
      } else {
        course = "html";
      }
      lessonElement.setAttribute("href", `${course}/article.html?page=${lesson.id}`);
      lessonElement.innerHTML = `<h2 class="lesson-title">${lesson.articleName}</h2>`;
      const lessonPreview = document.createElement("p");
      lessonPreview.classList.add("lesson-preview");
      lessonPreview.innerHTML = lesson.paragraph.slice(0, 200) + "...";
      lessonElement.appendChild(lessonPreview);
      results.appendChild(lessonElement);
    });
  } else {
    results.innerHTML = "No results found! Try searching with a different keyword?";
  }
});
