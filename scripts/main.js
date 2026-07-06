(function () {
  const config = window.SITE_CONFIG || (typeof SITE_CONFIG !== "undefined" ? SITE_CONFIG : {});

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((node) => {
      node.textContent = value;
    });
  }

  function setupNavigation() {
    const page = document.documentElement.dataset.page || "home";
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === page) {
        link.setAttribute("aria-current", "page");
      }
    });

    const toggle = document.querySelector("[data-menu-toggle]");
    const nav = document.querySelector("[data-site-nav]");
    if (!toggle || !nav) return;

    const closeMenu = () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const handleDesktopChange = (event) => {
      if (event.matches) {
        closeMenu();
      }
    };
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", handleDesktopChange);
    } else {
      desktopQuery.addListener(handleDesktopChange);
    }
  }

  function setupConfigText() {
    document.querySelectorAll("[data-config]").forEach((node) => {
      const key = node.getAttribute("data-config");
      if (key && Object.prototype.hasOwnProperty.call(config, key)) {
        node.textContent = config[key] || "待发布";
      }
    });

    const emailTargets = document.querySelectorAll("[data-feedback-target]");
    emailTargets.forEach((target) => {
      if (config.feedbackEmail) {
        const link = document.createElement("a");
        link.href = `mailto:${config.feedbackEmail}`;
        link.textContent = config.feedbackEmail;
        target.replaceChildren(link);
      } else {
        target.textContent = "反馈邮箱暂未配置";
      }
    });
  }

  function setupDownloadButton() {
    const button = document.querySelector("[data-download-button]");
    const note = document.querySelector("[data-download-note]");
    if (!button) return;

    if (config.apkDownloadUrl) {
      button.setAttribute("href", config.apkDownloadUrl);
      button.removeAttribute("aria-disabled");
      button.textContent = "下载 APK";
      if (note) note.textContent = "下载后请核对页面公布的版本和 SHA-256 校验值。";
      return;
    }

    button.setAttribute("href", "#");
    button.setAttribute("aria-disabled", "true");
    button.textContent = "下载链接暂未配置";
    if (note) note.textContent = "正式安装包发布后将在此提供下载。";
    button.addEventListener("click", (event) => {
      event.preventDefault();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupConfigText();
    setupDownloadButton();
    setText("[data-current-year]", String(new Date().getFullYear()));
  });
})();
