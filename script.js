document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lightboxImg = lightbox.querySelector("img");
    document.querySelectorAll(".gallery-grid figure").forEach(function (fig) {
      fig.addEventListener("click", function () {
        var src = fig.querySelector("img").getAttribute("src");
        lightboxImg.setAttribute("src", src);
        lightbox.classList.add("open");
      });
    });
    lightbox.addEventListener("click", function () {
      lightbox.classList.remove("open");
      lightboxImg.setAttribute("src", "");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        lightbox.classList.remove("open");
        lightboxImg.setAttribute("src", "");
      }
    });
  }

  var isHomePage = /(^|\/)(index\.html)?$/.test(window.location.pathname);
  if (isHomePage) {
    var today = new Date().toDateString();
    var lastShown = localStorage.getItem("swagClinicPopupLastShown");
    if (lastShown !== today) {
      var overlay = document.createElement("div");
      overlay.className = "clinic-popup-overlay";
      overlay.innerHTML =
        '<div class="clinic-popup-card" role="dialog" aria-modal="true" aria-label="Clinic update">' +
          '<button class="clinic-popup-close" aria-label="Close">&times;</button>' +
          '<p class="eyebrow">Clinic Update</p>' +
          '<h2>See you in the spring!</h2>' +
          '<p>The Davis Community Pool is closed for the season due to weather, and the heater has been turned off. We\'re looking forward to clinics in the spring and looking into other options now.</p>' +
          '<div class="btn-row"><a class="btn btn-primary" href="water-safety-clinics.html#fall-schedule">Read the Update</a></div>' +
        '</div>';
      document.body.appendChild(overlay);

      var closePopup = function () {
        overlay.classList.remove("open");
        overlay.remove();
      };
      overlay.querySelector(".clinic-popup-close").addEventListener("click", closePopup);
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closePopup();
      });
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closePopup();
      });

      requestAnimationFrame(function () { overlay.classList.add("open"); });
      localStorage.setItem("swagClinicPopupLastShown", today);
    }
  }
});
