(function () {
  const storageKey = "kuma-theme";
  const root = document.documentElement;
  const buttons = () => Array.from(document.querySelectorAll("[data-theme-toggle]"));

  function readTheme() {
    try {
      return localStorage.getItem(storageKey) || "system";
    } catch (error) {
      return "system";
    }
  }

  function writeTheme(theme) {
    try {
      if (theme === "system") {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, theme);
      }
    } catch (error) {
      return;
    }
  }

  function applyTheme(theme) {
    if (theme === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }

    buttons().forEach((button) => {
      const label = button.querySelector("[data-theme-label]");
      if (label) {
        label.textContent = theme === "light" ? "浅色" : theme === "dark" ? "深色" : "系统";
      }
      button.setAttribute("aria-label", `当前为${label ? label.textContent : "系统"}模式，点击切换`);
    });
  }

  function nextTheme(theme) {
    if (theme === "system") return "dark";
    if (theme === "dark") return "light";
    return "system";
  }

  document.addEventListener("DOMContentLoaded", () => {
    let theme = readTheme();
    applyTheme(theme);

    buttons().forEach((button) => {
      button.addEventListener("click", () => {
        theme = nextTheme(theme);
        writeTheme(theme);
        applyTheme(theme);
      });
    });
  });
})();
