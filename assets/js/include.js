function includeHTML(id, filePath) {
  const placeholder = document.getElementById(id);
  if (placeholder) {
    fetch(filePath)
      .then(res => res.text())
      .then(data => {
        placeholder.innerHTML = data;

        // Khi include footer xong, gắn sự kiện click danh mục
        if (id === "footer-html") {
          attachCatalogEvents(); // gọi hàm từ products.js
        }
      })
      .catch(err => console.error("Không tải được file:", err));
  }
}


// Tự động include header và footer
document.addEventListener("DOMContentLoaded", () => {
  // header
  includeHTML("header-html", "includes/header.html");
  // footer
  includeHTML("footer-html", "includes/footer.html");
  //banner
  includeHTML("banner-html", "includes/banner.html");
});