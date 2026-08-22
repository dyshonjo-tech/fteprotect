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
      var submitBtn = form.querySelector('button[type="submit"]');
      var formData = new FormData(form);

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      function showStatus(message, isError) {
        if (!status) return;
        status.textContent = message;
        status.style.color = isError ? "#e0736b" : "var(--color-gold-bright)";
        status.style.display = "block";
      }

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            showStatus("Thank you. Your request has been received — a member of the FTE team will contact you shortly.", false);
            form.reset();
          } else {
            response.json()
              .then(function (data) {
                var msg = (data && data.errors)
                  ? data.errors.map(function (err) { return err.message; }).join(", ")
                  : "Something went wrong submitting your request. Please try again or email us directly.";
                showStatus(msg, true);
              })
              .catch(function () {
                showStatus("Something went wrong submitting your request. Please try again or email us directly.", true);
              });
          }
        })
        .catch(function () {
          showStatus("Something went wrong. Please check your connection and try again.", true);
        })
        .finally(function () {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Request";
          }
        });
    });
  }
});
