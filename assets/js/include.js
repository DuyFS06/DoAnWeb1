function includeHTML(id, filePath) {
  const placeholder = document.getElementById(id);
  if (placeholder) {
    fetch(filePath)
      .then(res => res.text())
      .then(data => placeholder.innerHTML = data)
<<<<<<< HEAD
      .catch(err => console.error("Không tải được file:", filePath, err));
  }
}

// Tự động include header, footer, banner
document.addEventListener("DOMContentLoaded", () => {
  includeHTML("header-html", "./includes/header/header.html");
  includeHTML("footer-html", "./includes/footer/footer.html");
  includeHTML("banner-html", "./includes/banner/banner.html");
});
=======
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
>>>>>>> origin/main
