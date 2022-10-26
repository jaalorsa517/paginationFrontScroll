import { j5Carousel } from "@jaalorsa/j5-components";
import { useRoot } from "@/store/useRoot.store";

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
    j5Carousel();
  });

  window.addEventListener("beforeunload", () => {
    window.removeEventListener("scroll", scrolling);
  });

  window.addEventListener("resize", () => {
    useRoot().$patch({ isMobile: window.innerWidth < 768 });
  });
}
