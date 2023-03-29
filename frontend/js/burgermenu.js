<script>
  document.querySelector("nav").addEventListener("click", function () {
    this.classList.toggle("active");
    const navLinks = document.querySelectorAll("nav a");
    navLinks.forEach((link) => {
      link.style.display === "block" ? (link.style.display = "none") : (link.style.display = "block");
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 576) {
      document.querySelector("nav").classList.remove("active");
      const navLinks = document.querySelectorAll("nav a");
      navLinks.forEach((link) => {
        link.style.display = "block";
      });
    }
  });
</script>