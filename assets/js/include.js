function includeHTML(id, filePath) {
  const placeholder = document.getElementById(id);
  if (placeholder) {
    fetch(filePath)
      .then(res => res.text())
      .then(data => placeholder.innerHTML = data)
      .catch(err => console.error("Không tải được file:", filePath, err));
  }
}

// Tự động include header, footer, banner
document.addEventListener("DOMContentLoaded", () => {
  includeHTML("header-html", "./includes/header/header.html");
  includeHTML("footer-html", "./includes/footer/footer.html");
  includeHTML("banner-html", "./includes/banner/banner.html");
});
