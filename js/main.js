document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
  }

  var inquirySelect = document.querySelector("#inquiry-type");
  if (inquirySelect) {
    var params = new URLSearchParams(window.location.search);
    var pre = params.get("inquiry");
    if (pre) {
      var match = Array.prototype.find.call(inquirySelect.options, function (opt) {
        return opt.value === pre;
      });
      if (match) inquirySelect.value = pre;
    }
  }

  var form = document.querySelector(".request-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = document.querySelector(".form-status");
      if (status) {
        status.textContent = "Thank you. Your request has been received — a member of the FTE team will contact you shortly.";
        status.style.display = "block";
      }
      form.reset();
    });
  }
});
