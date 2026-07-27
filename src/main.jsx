import React from "react";
import ReactDOM from "react-dom/client";

// `vite build` runs in production mode by default, `vite dev` in development —
// so this automatically renders the release build when deployed and the dev
// build (with its tier switcher etc.) when running locally, with no extra flag
// to remember. Both files already export the same default component name.
// Wrapped in an async function (rather than a top-level await) since top-level
// await needs a newer JS target than Vite's default browser-compatibility target.
async function mount() {
  const App = import.meta.env.PROD
    ? (await import("./IntraSelf-Web-Release.jsx")).default
    : (await import("./IntraSelf-Web.jsx")).default;

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

mount();
