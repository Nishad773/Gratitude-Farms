/**
 * Runtime for the exported single-file review copy.
 *
 * The markup comes from the real, hydrated React app; this restores the
 * behaviour that React was providing — routing between the captured pages,
 * menus, scroll reveal, counters, the gallery, the map, the FAQ, and the forms.
 * No dependencies, no network.
 */
(function () {
  "use strict";

  var reduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches === true;

  var $ = function (selector, scope) {
    return (scope || document).querySelector(selector);
  };
  var $$ = function (selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  };

  /* ---------------------------------------------------------------- */
  /* Review banner                                                     */
  /* ---------------------------------------------------------------- */

  var banner = $("#gt-review-bar");
  var dismiss = $("#gt-review-dismiss");
  if (banner && dismiss) {
    dismiss.addEventListener("click", function () {
      banner.hidden = true;
    });
  }

  /* ---------------------------------------------------------------- */
  /* Routing                                                           */
  /* ---------------------------------------------------------------- */

  var pages = $$(".gt-page");
  var routes = {};
  pages.forEach(function (page) {
    routes[page.getAttribute("data-route")] = page;
  });

  function normalise(href) {
    if (!href) return null;
    // Anything that isn't one of our captured routes is left to the browser.
    var path = href.split("#")[0].split("?")[0];
    if (path === "") path = location.pathname;
    if (routes[path]) return path;
    return null;
  }

  var current = "/";

  function show(path, options) {
    var opts = options || {};
    var next = routes[path];
    if (!next) return;

    pages.forEach(function (page) {
      if (page !== next) page.hidden = true;
    });
    next.hidden = false;

    // Replay the page entrance the real site uses.
    next.classList.remove("page-enter");
    if (!reduced) {
      void next.offsetWidth;
      next.classList.add("page-enter");
    }

    current = path;
    document.title = next.getAttribute("data-title") || document.title;
    if (!opts.keepScroll) window.scrollTo(0, 0);
    if (location.hash !== "#" + path) history.pushState({ path: path }, "", "#" + path);

    markActiveNav(path);
    primeReveal(next);
    primeCounters(next);
    closeMenus();
  }

  function markActiveNav(path) {
    $$("a[href]").forEach(function (link) {
      var target = normalise(link.getAttribute("href"));
      if (!target) return;
      var active = target === path || (target !== "/" && path.indexOf(target + "/") === 0);
      link.classList.toggle("nav-link-active", active && link.classList.contains("nav-link"));
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });

    // The desktop "Programmes" group is a button, not a link.
    $$('nav[aria-label="Primary"] button[aria-haspopup="true"]').forEach(function (button) {
      var inGroup = path.indexOf("/programmes") === 0;
      button.classList.toggle("nav-link-active", inGroup);
      button.classList.toggle("text-brand", inGroup);
      button.classList.toggle("text-ink-soft", !inGroup);
    });
  }

  document.addEventListener("click", function (event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey) return;
    var anchor = event.target.closest && event.target.closest("a[href]");
    if (!anchor) return;

    var href = anchor.getAttribute("href");

    // In-page anchor: smooth scroll, matching the real site.
    if (href && href.charAt(0) === "#" && href.length > 1 && !routes[href.slice(1)]) {
      var target = document.getElementById(href.slice(1));
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
      }
      return;
    }

    var path = normalise(href);
    if (!path) return;
    event.preventDefault();
    show(path);
  });

  window.addEventListener("popstate", function () {
    var path = location.hash ? location.hash.slice(1) : "/";
    if (routes[path]) show(path, { keepScroll: false });
  });

  /* ---------------------------------------------------------------- */
  /* Header                                                            */
  /* ---------------------------------------------------------------- */

  var header = $("header");
  if (header) {
    var onScroll = function () {
      var scrolled = window.scrollY > 12;
      header.classList.toggle("border-line-soft/80", scrolled);
      header.classList.toggle("shadow-lg", scrolled);
      header.classList.toggle("shadow-brand-strong/10", scrolled);
      header.classList.toggle("border-transparent", !scrolled);
      header.classList.toggle("shadow-none", !scrolled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var mobileNav = $("#mobile-nav");
  var menuButton = $('button[aria-controls="mobile-nav"]');
  var dropdownButton = $('nav[aria-label="Primary"] button[aria-haspopup="true"]');
  var dropdownPanel = dropdownButton && dropdownButton.parentElement
    ? $(".menu-enter", dropdownButton.parentElement)
    : null;
  var dropdownWrapper = dropdownPanel ? dropdownPanel.parentElement : null;

  function closeMenus() {
    if (mobileNav) mobileNav.hidden = true;
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
    setDropdown(false);
  }

  function setDropdown(open) {
    if (!dropdownWrapper || !dropdownButton) return;
    dropdownWrapper.hidden = !open;
    dropdownButton.setAttribute("aria-expanded", open ? "true" : "false");
    var chevron = dropdownButton.querySelector("svg");
    if (chevron) chevron.classList.toggle("rotate-180", open);
    if (open && dropdownPanel && !reduced) {
      dropdownPanel.classList.remove("menu-enter");
      void dropdownPanel.offsetWidth;
      dropdownPanel.classList.add("menu-enter");
    }
  }

  if (mobileNav && menuButton) {
    mobileNav.hidden = true;
    var icons = menuButton.querySelectorAll("svg");
    menuButton.addEventListener("click", function () {
      var open = mobileNav.hidden;
      mobileNav.hidden = !open;
      menuButton.setAttribute("aria-expanded", open ? "true" : "false");
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      // The captured markup ships the menu icon; swap it for a cross when open.
      if (icons.length === 1) icons[0].style.transform = open ? "rotate(90deg)" : "";
      if (open && !reduced) {
        mobileNav.classList.remove("menu-enter");
        void mobileNav.offsetWidth;
        mobileNav.classList.add("menu-enter");
      }
    });
  }

  if (dropdownWrapper && dropdownButton) {
    setDropdown(false);
    dropdownButton.addEventListener("click", function (event) {
      event.stopPropagation();
      setDropdown(dropdownWrapper.hidden);
    });
    var group = dropdownButton.parentElement;
    group.addEventListener("mouseenter", function () {
      setDropdown(true);
    });
    group.addEventListener("mouseleave", function () {
      setDropdown(false);
    });
    document.addEventListener("click", function (event) {
      if (!group.contains(event.target)) setDropdown(false);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenus();
  });

  /* ---------------------------------------------------------------- */
  /* Scroll reveal                                                     */
  /* ---------------------------------------------------------------- */

  var revealObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.setAttribute("data-reveal", "shown");
                revealObserver.unobserve(entry.target);
              }
            });
          },
          { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
        )
      : null;

  function primeReveal(scope) {
    if (reduced || !revealObserver) return;
    $$("section > div", scope).forEach(function (el) {
      if (el.getAttribute("data-reveal") === "shown") return;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.setAttribute("data-reveal", "shown");
        return;
      }
      el.setAttribute("data-reveal", "hidden");
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Count-up figures                                                  */
  /* ---------------------------------------------------------------- */

  function groupIndian(value, decimals, grouped) {
    var fixed = value.toFixed(decimals);
    if (!grouped) return fixed;
    var parts = fixed.split(".");
    var whole = parts[0];
    var last3 = whole.slice(-3);
    var rest = whole.slice(0, -3);
    var head = rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," : "";
    return parts[1] ? head + last3 + "." + parts[1] : head + last3;
  }

  function animateCount(el) {
    var raw = el.getAttribute("data-count-value") || el.textContent.trim();
    el.setAttribute("data-count-value", raw);
    var match = raw.match(/^(\D*?)([\d,.]+)(.*)$/);
    if (!match) return;

    var prefix = match[1] || "";
    var digits = match[2] || "";
    var suffix = match[3] || "";
    var numeric = Number(digits.replace(/,/g, ""));
    if (!isFinite(numeric)) return;
    var decimals = digits.indexOf(".") > -1 ? digits.split(".")[1].length : 0;
    var grouped = digits.indexOf(",") > -1;

    var start = performance.now();
    var duration = 1400;
    function tick(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = prefix + groupIndian(numeric * eased, decimals, grouped) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var countObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                animateCount(entry.target);
                countObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.25 },
        )
      : null;

  function primeCounters(scope) {
    if (reduced || !countObserver) return;
    $$(".display-face", scope).forEach(function (el) {
      if (el.children.length || el.getAttribute("data-count-bound")) return;
      if (!/^\D{0,3}[\d,.]+\D{0,12}$/.test(el.textContent.trim())) return;
      el.setAttribute("data-count-bound", "1");
      countObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------------- */
  /* FAQ accordion                                                     */
  /* ---------------------------------------------------------------- */

  $$("[data-faq-trigger]").forEach(function (trigger) {
    var panel = document.getElementById(trigger.getAttribute("aria-controls"));
    if (!panel) return;
    trigger.addEventListener("click", function () {
      var open = trigger.getAttribute("aria-expanded") === "true";
      $$("[data-faq-trigger]").forEach(function (other) {
        if (other === trigger) return;
        other.setAttribute("aria-expanded", "false");
        var otherPanel = document.getElementById(other.getAttribute("aria-controls"));
        if (otherPanel) otherPanel.hidden = true;
        var otherIcon = other.querySelector("svg");
        if (otherIcon) otherIcon.classList.remove("rotate-180");
      });
      trigger.setAttribute("aria-expanded", open ? "false" : "true");
      panel.hidden = open;
      var icon = trigger.querySelector("svg");
      if (icon) icon.classList.toggle("rotate-180", !open);
    });
  });

  /* ---------------------------------------------------------------- */
  /* Gallery                                                           */
  /* ---------------------------------------------------------------- */

  var galleryPage = routes["/gallery"];
  if (galleryPage) {
    var figures = $$("figure[data-category]", galleryPage);
    var galleryButtons = $$("button[data-filter]", galleryPage);

    var visibleFigures = figures.slice();

    galleryButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-filter");
        galleryButtons.forEach(function (other) {
          var active = other === button;
          other.setAttribute("aria-pressed", active ? "true" : "false");
          other.classList.toggle("border-brand", active);
          other.classList.toggle("bg-brand", active);
          other.classList.toggle("text-primary-foreground", active);
          other.classList.toggle("border-line-soft", !active);
          other.classList.toggle("bg-paper", !active);
          other.classList.toggle("text-ink-soft", !active);
        });
        visibleFigures = [];
        figures.forEach(function (figure) {
          var match = filter === "all" || figure.getAttribute("data-category") === filter;
          figure.hidden = !match;
          if (match) visibleFigures.push(figure);
        });
      });
    });

    // Lightbox — rebuilt here because the React one only exists while open.
    var lightbox = document.createElement("div");
    lightbox.className =
      "lightbox-enter fixed inset-0 z-[60] flex flex-col bg-brand-strong/95 p-4 backdrop-blur-sm sm:p-8";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.hidden = true;
    lightbox.innerHTML =
      '<div class="flex justify-end"><button type="button" data-lb-close aria-label="Close"' +
      ' class="grid size-10 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>' +
      "</button></div>" +
      '<div class="flex min-h-0 flex-1 items-center gap-2 sm:gap-4">' +
      '<button type="button" data-lb-prev aria-label="Previous photo" class="grid size-10 shrink-0 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg></button>' +
      '<figure class="flex min-h-0 flex-1 flex-col items-center">' +
      '<img data-lb-image alt="" class="lightbox-image max-h-[70vh] w-auto max-w-full rounded-xl object-contain" />' +
      '<figcaption data-lb-caption class="mt-4 max-w-2xl text-center text-sm leading-relaxed text-primary-foreground/85"></figcaption>' +
      "</figure>" +
      '<button type="button" data-lb-next aria-label="Next photo" class="grid size-10 shrink-0 place-items-center rounded-full bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20">' +
      '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg></button>' +
      "</div>";
    document.body.appendChild(lightbox);

    var lbImage = $("[data-lb-image]", lightbox);
    var lbCaption = $("[data-lb-caption]", lightbox);
    var lbIndex = 0;

    function renderLightbox() {
      var figure = visibleFigures[lbIndex];
      if (!figure) return;
      var image = figure.querySelector("img");
      var caption = figure.querySelector("figcaption");
      lbImage.src = image.src;
      lbImage.alt = image.alt;
      lbCaption.textContent =
        (caption ? caption.textContent.trim() : "") +
        "  ·  " +
        (lbIndex + 1) +
        " of " +
        visibleFigures.length;
      if (!reduced) {
        lbImage.classList.remove("lightbox-image");
        void lbImage.offsetWidth;
        lbImage.classList.add("lightbox-image");
      }
    }

    function openLightbox(figure) {
      lbIndex = visibleFigures.indexOf(figure);
      if (lbIndex < 0) lbIndex = 0;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
      renderLightbox();
    }

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = "";
    }

    function stepLightbox(delta) {
      if (!visibleFigures.length) return;
      lbIndex = (lbIndex + delta + visibleFigures.length) % visibleFigures.length;
      renderLightbox();
    }

    figures.forEach(function (figure) {
      var button = figure.querySelector("button");
      if (!button) return;
      button.addEventListener("click", function () {
        openLightbox(figure);
      });
    });

    $("[data-lb-close]", lightbox).addEventListener("click", closeLightbox);
    $("[data-lb-prev]", lightbox).addEventListener("click", function () {
      stepLightbox(-1);
    });
    $("[data-lb-next]", lightbox).addEventListener("click", function () {
      stepLightbox(1);
    });
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (event) {
      if (lightbox.hidden) return;
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") stepLightbox(1);
      if (event.key === "ArrowLeft") stepLightbox(-1);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Locations map (appears on several pages)                          */
  /* ---------------------------------------------------------------- */

  $$('[aria-label="Filter locations by status"]').forEach(function (filterGroup) {
    var root = filterGroup.closest(".grid");
    if (!root) return;

    var filterButtons = $$("button[data-filter]", filterGroup);
    var pins = $$("circle[data-location]", root);
    var cards = $$("li[data-location]", root);
    var panel = $(".swap-enter", root) || root.querySelector(".rounded-2xl");
    var count = $$("p", root).filter(function (p) {
      return /\d+\s+locations?$/i.test(p.textContent.trim());
    })[0];

    // Detail copy lives in the cards' sibling data; rebuild it from the page.
    var details = {};
    cards.forEach(function (card) {
      var id = card.getAttribute("data-location");
      var button = card.querySelector("button");
      details[id] = {
        status: card.getAttribute("data-status"),
        name: button.querySelector("span span").textContent.trim(),
        state: button.querySelectorAll("span span")[1].textContent.trim(),
      };
    });

    var statusLabel = { delivered: "Delivered", launching: "Launching", planned: "Planned" };
    var activeId = cards.length ? cards[0].getAttribute("data-location") : null;
    var captured = {};

    // Capture the panel copy for the location the export was taken on, so at
    // least one entry keeps its full description; the rest fall back to the
    // card summary. (The real site renders all of them from data.)
    if (panel) {
      var heading = panel.querySelector("h3");
      if (heading) captured[heading.textContent.trim()] = panel.innerHTML;
    }

    function select(id) {
      activeId = id;
      cards.forEach(function (card) {
        var isActive = card.getAttribute("data-location") === id;
        var button = card.querySelector("button");
        button.classList.toggle("border-brand", isActive);
        button.classList.toggle("bg-mist/50", isActive);
        button.classList.toggle("border-line-soft", !isActive);
        button.classList.toggle("bg-warm-white", !isActive);
      });
      pins.forEach(function (pin) {
        var isActive = pin.getAttribute("data-location") === id;
        pin.setAttribute("r", isActive ? "2.4" : "1.7");
      });

      var detail = details[id];
      if (!panel || !detail) return;
      var saved = captured[detail.name];
      if (saved) {
        panel.innerHTML = saved;
      } else {
        panel.innerHTML =
          '<span class="inline-block rounded-full border px-3 py-1 text-[0.62rem] font-extrabold uppercase tracking-[0.12em] ' +
          (detail.status === "planned"
            ? "bg-mist/50 text-brand-strong border-line-soft"
            : "bg-sun/20 text-brand-strong border-sun/50") +
          '">' +
          statusLabel[detail.status] +
          "</span>" +
          '<h3 class="display-face mt-4 text-2xl text-brand-strong">' +
          detail.name +
          "</h3>" +
          '<p class="mt-1 text-xs font-extrabold uppercase tracking-[0.12em] text-ink-soft">' +
          detail.state +
          "</p>";
      }
      if (!reduced) {
        panel.classList.remove("swap-enter");
        void panel.offsetWidth;
        panel.classList.add("swap-enter");
      }
    }

    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var filter = button.getAttribute("data-filter");
        filterButtons.forEach(function (other) {
          var active = other === button;
          other.setAttribute("aria-pressed", active ? "true" : "false");
          other.classList.toggle("border-brand", active);
          other.classList.toggle("bg-brand", active);
          other.classList.toggle("text-primary-foreground", active);
          other.classList.toggle("border-line-soft", !active);
          other.classList.toggle("bg-warm-white", !active);
          other.classList.toggle("text-ink-soft", !active);
        });

        var shown = 0;
        cards.forEach(function (card) {
          var match = filter === "all" || card.getAttribute("data-status") === filter;
          card.hidden = !match;
          if (match) shown++;
        });
        pins.forEach(function (pin) {
          var match = filter === "all" || pin.getAttribute("data-status") === filter;
          pin.style.display = match ? "" : "none";
        });
        if (count) count.textContent = shown + (shown === 1 ? " location" : " locations");

        var stillVisible = cards.filter(function (card) {
          return !card.hidden;
        });
        if (stillVisible.length && !stillVisible.some(function (card) {
          return card.getAttribute("data-location") === activeId;
        })) {
          select(stillVisible[0].getAttribute("data-location"));
        }
      });
    });

    cards.forEach(function (card) {
      card.querySelector("button").addEventListener("click", function () {
        select(card.getAttribute("data-location"));
      });
    });
    pins.forEach(function (pin) {
      pin.addEventListener("click", function () {
        select(pin.getAttribute("data-location"));
      });
      pin.style.cursor = "pointer";
    });
  });

  /* ---------------------------------------------------------------- */
  /* Forms                                                             */
  /* ---------------------------------------------------------------- */

  function reference(prefix) {
    var now = new Date();
    var stamp =
      String(now.getFullYear()).slice(-2) +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      ("0" + now.getDate()).slice(-2);
    return prefix + "-" + stamp + "-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  }

  $$("form").forEach(function (form) {
    var isNewsletter = !!$("#newsletter-email", form);

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Same rules the server applies, so the manager sees real validation.
      var problems = [];
      var email = $('input[type="email"]', form);
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        problems.push("Enter a valid email address.");
      }
      if (!isNewsletter) {
        var name = $("#name", form);
        var phone = $("#phone", form);
        var message = $("#message", form);
        var consent = $("#consent", form);
        if (name && name.value.trim().length < 2) problems.push("Please tell us your name.");
        if (phone && phone.value.trim().length < 7)
          problems.push("Enter a phone number we can reach you on.");
        if (message && message.value.trim().length < 10)
          problems.push("A sentence or two about what you have in mind helps us route this.");
        if (consent && consent.getAttribute("data-checked") !== "true")
          problems.push("Please confirm we may contact you about this enquiry.");
      }

      var existing = $(".gt-form-errors", form);
      if (existing) existing.remove();

      if (problems.length) {
        var box = document.createElement("div");
        box.className =
          "gt-form-errors mt-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive";
        box.setAttribute("role", "alert");
        box.innerHTML =
          "<ul>" +
          problems
            .map(function (problem) {
              return "<li>• " + problem + "</li>";
            })
            .join("") +
          "</ul>";
        form.appendChild(box);
        return;
      }

      var confirmation = document.createElement("div");
      confirmation.setAttribute("role", "status");
      if (isNewsletter) {
        confirmation.className =
          "flex items-start gap-2 rounded-xl border border-sun/40 bg-sun/10 px-4 py-3 text-sm text-primary-foreground";
        confirmation.textContent =
          "You're on the list. Quarterly impact updates will land in your inbox.";
      } else {
        var interest = $("#interest", form);
        confirmation.className =
          "rounded-2xl border border-leaf/40 bg-leaf/10 p-7 text-center sm:p-10";
        confirmation.innerHTML =
          '<h3 class="display-face text-2xl text-brand-strong">Thank you — that’s with us.</h3>' +
          '<p class="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">Your enquiry about <strong class="text-brand-strong">' +
          (interest ? interest.value : "this") +
          "</strong> has been logged. Someone from the Trust will come back to you within two working days.</p>" +
          '<p class="mt-5 text-xs font-extrabold uppercase tracking-[0.14em] text-ink-soft">Your reference</p>' +
          '<p class="display-face mt-1 text-2xl text-brand">' +
          reference("GT") +
          "</p>" +
          '<p class="mt-6 text-xs text-ink-soft">This is the static review copy — nothing was sent.</p>';
      }
      form.replaceWith(confirmation);
    });
  });

  // The consent control is a styled button, not a native checkbox.
  $$("#consent").forEach(function (box) {
    box.setAttribute("data-checked", "false");
    box.addEventListener("click", function () {
      var checked = box.getAttribute("data-checked") === "true";
      box.setAttribute("data-checked", checked ? "false" : "true");
      box.setAttribute("data-state", checked ? "unchecked" : "checked");
      box.setAttribute("aria-checked", checked ? "false" : "true");
      var mark = box.querySelector("span");
      if (mark) mark.style.opacity = checked ? "0" : "1";
    });
  });

  /* ---------------------------------------------------------------- */
  /* Back to top                                                       */
  /* ---------------------------------------------------------------- */

  var toTop = $('button[aria-label="Back to top"]');
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });
    var toggleToTop = function () {
      var visible = window.scrollY > 900;
      toTop.classList.toggle("opacity-100", visible);
      toTop.classList.toggle("translate-y-0", visible);
      toTop.classList.toggle("opacity-0", !visible);
      toTop.classList.toggle("translate-y-3", !visible);
      toTop.classList.toggle("pointer-events-none", !visible);
    };
    toggleToTop();
    window.addEventListener("scroll", toggleToTop, { passive: true });
  }

  /* ---------------------------------------------------------------- */
  /* Boot                                                              */
  /* ---------------------------------------------------------------- */

  var initial = location.hash ? location.hash.slice(1) : "/";
  show(routes[initial] ? initial : "/", { keepScroll: true });
})();
