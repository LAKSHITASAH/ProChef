import React from "react";

export default function Footer() {
  return (
    <footer className="py-4 mt-5 text-center text-secondary">
      <div className="fw-semibold text-light">ProChef</div>
      <div>
        ProChef recipe app made by Lakshita Sah — gmail:{" "}
        <a className="text-decoration-none" href="mailto:sahlakshita420@gmail.com">
          sahlakshita420@gmail.com
        </a>
      </div>
      <div>Hope you like it 💛</div>
      <div className="small mt-2">Recipes powered by TheMealDB • Built with React + Bootstrap</div>
    </footer>
  );
}
