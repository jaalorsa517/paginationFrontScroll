function scrolling({ target }) {
  const { scrollingElement } = target;
  const gap = 60;
  if (scrollingElement.scrollTop + scrollingElement.clientHeight + gap >= scrollingElement.scrollHeight) {
    const button = document.querySelector(".click__button");
    button?.click();
  }
}

export function init() {
  window.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", scrolling);
  });

  window.addEventListener("beforeunload", () => {
    window.removeEventListener("scroll", scrolling);
  });
}
