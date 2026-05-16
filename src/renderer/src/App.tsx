import "./styles/app.css";

export default function App(): JSX.Element {
  return (
    <main className="empty-shell">
      <h1>Wrytedown</h1>
      <p>
        Markdown-first writing projects with binder, corkboard, and compile
        workflows.
      </p>
      <button type="button">Open a project</button>
    </main>
  );
}
