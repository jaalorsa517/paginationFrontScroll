import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { j5Carousel } from "@jaalorsa/j5-components";
import { useRoot } from "@/store/useRoot.store";

function initFirebase() {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  const app = initializeApp(firebaseConfig);
  getAnalytics(app);
}

function scrolling({ target }) {
  const { scrollingElement } = target;
  const gap = 60;
  if (scrollingElement.scrollTop + scrollingElement.clientHeight + gap >= scrollingElement.scrollHeight) {
    const button = document.querySelector(".click__button");
    button?.click();
  }
}

export function init() {
  initFirebase()
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
