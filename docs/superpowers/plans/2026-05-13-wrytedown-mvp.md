# Wrytedown MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use
> superpowers:subagent-driven-development (recommended) or
> superpowers:executing-plans to implement this plan task-by-task. Steps use
> checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local-first desktop MVP that can open a plain-text project,
edit Markdown documents, organize them in a binder and corkboard, search them
locally, and export them through Pandoc.

**Architecture:** Use an Electron + React + TypeScript shell with a
filesystem-backed project model (`project.wryte.yaml` plus Markdown files with
YAML front matter). Keep search indexes, previews, and UI state rebuildable, and
isolate export and language tooling behind service interfaces so canonical
author content remains plain text.

**Tech Stack:** Electron, electron-vite, React, TypeScript, Zustand, CodeMirror
6, gray-matter, Zod, Vitest, Playwright, unified/retext, Pandoc CLI

---

## Scope check

The approved spec covers the whole product, but this repository is still at the
idea stage. This plan therefore targets the **first end-to-end MVP** rather than
every future enhancement. It still covers each required subsystem from the spec:

- project model and manifest
- binder/outliner
- corkboard
- Markdown editor
- metadata inspector
- local search/indexing
- offline language assistance
- Pandoc-based compile/export
- cross-platform desktop shell and tests

It intentionally implements **offline spelling plus grammar/style lint
suggestions**, not cloud-grade proofreading. That satisfies the spec’s “good
enough” drafting-time language assistance without violating the
offline/open-source constraint.

## File structure map

### Root and toolchain

- Create: `package.json` - scripts, dependencies, packaging metadata
- Create: `electron.vite.config.ts` - Electron/Vite build configuration
- Create: `tsconfig.json` - top-level TypeScript project references
- Create: `tsconfig.node.json` - Node/Electron TypeScript settings
- Create: `tsconfig.web.json` - renderer TypeScript settings
- Create: `.gitignore` - ignore build output, app data, and test artifacts

### Desktop shell and shared contracts

- Create: `src/main/index.ts` - Electron app bootstrap and window lifecycle
- Create: `src/main/ipc/workspaceIpc.ts` - typed IPC handlers for workspace
  commands
- Create: `src/preload/index.ts` - safe renderer bridge
- Create: `src/shared/workspace.ts` - shared types and Zod schemas

### Workspace services

- Create: `src/main/workspace/projectService.ts` - load/save project manifest
  and Markdown documents
- Create: `src/main/workspace/fileStore.ts` - atomic file IO helpers and file
  watching
- Create: `src/main/workspace/indexer.ts` - local search and derived project
  index
- Create: `src/main/workspace/exportService.ts` - Pandoc invocation and compile
  job assembly
- Create: `src/main/workspace/languageService.ts` - spellcheck dictionary +
  retext grammar/style checks

### Renderer application

- Create: `src/renderer/src/main.tsx` - renderer entrypoint
- Create: `src/renderer/src/App.tsx` - workspace layout shell
- Create: `src/renderer/src/store/workspaceStore.ts` - client state and async
  actions
- Create: `src/renderer/src/features/binder/BinderTree.tsx` - binder/outliner
  tree
- Create: `src/renderer/src/features/editor/MarkdownEditor.tsx` - CodeMirror
  editor and preview toggle
- Create: `src/renderer/src/features/corkboard/CorkboardView.tsx` - corkboard
  cards
- Create: `src/renderer/src/features/inspector/InspectorPanel.tsx` - metadata
  editor
- Create: `src/renderer/src/features/search/SearchPanel.tsx` - project search
  results
- Create: `src/renderer/src/features/compile/CompilePanel.tsx` - export controls
  and job status
- Create: `src/renderer/src/styles/app.css` - layout and feature styling

### Fixtures and tests

- Create: `fixtures/sample-project/project.wryte.yaml` - fixture manifest
- Create: `fixtures/sample-project/manuscript/chapter-01.md` - fixture
  manuscript doc
- Create: `fixtures/sample-project/manuscript/chapter-02.md` - fixture
  manuscript doc
- Create: `tests/unit/workspace.test.ts` - manifest and file round-trip tests
- Create: `tests/unit/indexer.test.ts` - local indexing and search tests
- Create: `tests/unit/exportService.test.ts` - compile-command assembly tests
- Create: `tests/unit/languageService.test.ts` - grammar/style suggestion tests
- Create: `tests/e2e/workspace.spec.ts` - open/edit/search/export UI smoke test

## Task 1: Bootstrap the desktop workspace

**Files:**

- Create: `package.json`
- Create: `electron.vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `tsconfig.web.json`
- Create: `.gitignore`
- Test: `tests/e2e/workspace.spec.ts`

- [ ] **Step 1: Write the failing smoke test**

```ts
import { test, expect, _electron as electron } from "@playwright/test";

test("launches the empty Wrytedown shell", async () => {
  const app = await electron.launch({ args: ["."] });
  const page = await app.firstWindow();

  await expect(page.getByText("Open a project")).toBeVisible();
  await app.close();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/e2e/workspace.spec.ts` Expected: FAIL with an
error that Electron or the app entrypoint is missing.

- [ ] **Step 3: Bootstrap the app with electron-vite and add test scripts**

Run:

```bash
npm create electron-vite@latest . -- --template react-ts
npm install
npm install -D vitest @vitest/coverage-v8 @playwright/test happy-dom
npm install zustand zod gray-matter yaml @codemirror/state @codemirror/view @codemirror/lang-markdown unified retext-english retext-repeated-words
```

Replace `package.json` with:

```json
{
  "name": "wrytedown",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "out/main/index.js",
  "scripts": {
    "dev": "electron-vite dev",
    "build": "electron-vite build",
    "preview": "electron-vite preview",
    "test:unit": "vitest run",
    "test:e2e": "playwright test",
    "test": "npm run test:unit && npm run test:e2e"
  },
  "dependencies": {
    "@codemirror/lang-markdown": "^6.3.0",
    "@codemirror/state": "^6.5.2",
    "@codemirror/view": "^6.38.6",
    "gray-matter": "^4.0.3",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "retext-english": "^5.0.0",
    "retext-repeated-words": "^3.0.0",
    "unified": "^11.0.5",
    "yaml": "^2.5.1",
    "zod": "^3.24.4",
    "zustand": "^5.0.4"
  },
  "devDependencies": {
    "@playwright/test": "^1.54.0",
    "@vitejs/plugin-react": "^5.0.0",
    "@vitest/coverage-v8": "^3.2.4",
    "electron": "^36.2.0",
    "electron-vite": "^3.1.0",
    "happy-dom": "^17.6.3",
    "playwright": "^1.54.0",
    "typescript": "^5.8.3",
    "vite": "^6.3.5",
    "vitest": "^3.2.4"
  }
}
```

- [ ] **Step 4: Replace the default shell with an explicit empty-state app**

Set `src/renderer/src/App.tsx` to:

```tsx
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
```

Create `src/renderer/src/styles/app.css`:

```css
.empty-shell {
  min-height: 100vh;
  display: grid;
  place-content: center;
  gap: 1rem;
  padding: 2rem;
  font-family: system-ui, sans-serif;
}
```

- [ ] **Step 5: Run the smoke test and commit**

Run: `npm run test:e2e -- tests/e2e/workspace.spec.ts` Expected: PASS with
`1 passed`

Commit:

```bash
git add package.json electron.vite.config.ts tsconfig*.json .gitignore src tests
git commit -m "chore: bootstrap desktop shell"
```

## Task 2: Define the project model and sample fixture

**Files:**

- Create: `src/shared/workspace.ts`
- Create: `fixtures/sample-project/project.wryte.yaml`
- Create: `fixtures/sample-project/manuscript/chapter-01.md`
- Create: `fixtures/sample-project/manuscript/chapter-02.md`
- Test: `tests/unit/workspace.test.ts`

- [ ] **Step 1: Write the failing schema and round-trip test**

```ts
import { describe, expect, it } from "vitest";
import {
  parseProjectManifest,
  parseDocumentFile,
} from "../../src/shared/workspace";

describe("workspace schema", () => {
  it("parses a manifest and manuscript document", () => {
    const manifest = parseProjectManifest(`
projectId: novel
title: Demo Novel
binder:
  - id: chapter-01
    path: manuscript/chapter-01.md
`);

    const document = parseDocumentFile(`---
id: chapter-01
title: Chapter 1
synopsis: Opening scene
status: draft
---

# Chapter 1

First words.`);

    expect(manifest.title).toBe("Demo Novel");
    expect(document.metadata.synopsis).toBe("Opening scene");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- tests/unit/workspace.test.ts` Expected: FAIL with
`Cannot find module '../../src/shared/workspace'`

- [ ] **Step 3: Implement shared types and parsing helpers**

Create `src/shared/workspace.ts`:

```ts
import matter from "gray-matter";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

export const BinderNodeSchema = z.object({
  id: z.string(),
  path: z.string(),
  title: z.string().optional(),
});

export const ProjectManifestSchema = z.object({
  projectId: z.string(),
  title: z.string(),
  binder: z.array(BinderNodeSchema),
});

export const DocumentMetadataSchema = z.object({
  id: z.string(),
  title: z.string(),
  synopsis: z.string().default(""),
  status: z.enum(["draft", "revised", "final"]).default("draft"),
  labels: z.array(z.string()).default([]),
});

export type ProjectManifest = z.infer<typeof ProjectManifestSchema>;
export type DocumentMetadata = z.infer<typeof DocumentMetadataSchema>;

export function parseProjectManifest(input: string): ProjectManifest {
  return ProjectManifestSchema.parse(parseYaml(input));
}

export function parseDocumentFile(input: string): {
  metadata: DocumentMetadata;
  body: string;
} {
  const parsed = matter(input);
  return {
    metadata: DocumentMetadataSchema.parse(parsed.data),
    body: parsed.content.trim(),
  };
}
```

- [ ] **Step 4: Create the fixture project**

Create `fixtures/sample-project/project.wryte.yaml`:

```yaml
projectId: novel
title: Demo Novel
binder:
  - id: chapter-01
    path: manuscript/chapter-01.md
    title: Chapter 1
  - id: chapter-02
    path: manuscript/chapter-02.md
    title: Chapter 2
```

Create `fixtures/sample-project/manuscript/chapter-01.md`:

```md
---
id: chapter-01
title: Chapter 1
synopsis: Opening scene
status: draft
labels:
  - opener
---

# Chapter 1

First words.
```

Create `fixtures/sample-project/manuscript/chapter-02.md`:

```md
---
id: chapter-02
title: Chapter 2
synopsis: Escalation
status: draft
labels:
  - middle
---

# Chapter 2

Second scene.
```

- [ ] **Step 5: Run the unit test and commit**

Run: `npm run test:unit -- tests/unit/workspace.test.ts` Expected: PASS with
`1 passed`

Commit:

```bash
git add src/shared/workspace.ts fixtures/sample-project tests/unit/workspace.test.ts
git commit -m "feat: define workspace schema"
```

## Task 3: Implement filesystem-backed project loading and saving

**Files:**

- Create: `src/main/workspace/fileStore.ts`
- Create: `src/main/workspace/projectService.ts`
- Modify: `src/shared/workspace.ts`
- Test: `tests/unit/workspace.test.ts`

- [ ] **Step 1: Write the failing filesystem test**

```ts
import { describe, expect, it } from "vitest";
import { copyFileSync, mkdtempSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  loadWorkspace,
  saveDocumentBody,
} from "../../src/main/workspace/projectService";

describe("projectService", () => {
  it("loads a workspace and saves Markdown atomically", async () => {
    const root = join(process.cwd(), "fixtures/sample-project");
    const workspace = await loadWorkspace(root);

    expect(workspace.documents).toHaveLength(2);

    const tempDir = mkdtempSync(join(tmpdir(), "wryte-"));
    const sourcePath = join(root, "manuscript/chapter-01.md");
    const copyPath = join(tempDir, "chapter-01.md");
    copyFileSync(sourcePath, copyPath);
    await saveDocumentBody(copyPath, "# Updated\n\nBody");

    expect(readFileSync(copyPath, "utf8")).toContain("Updated");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- tests/unit/workspace.test.ts` Expected: FAIL with
`Cannot find module '../../src/main/workspace/projectService'`

- [ ] **Step 3: Implement atomic file IO and workspace loading**

Create `src/main/workspace/fileStore.ts`:

```ts
import { mkdir, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

export async function writeFileAtomic(
  targetPath: string,
  contents: string,
): Promise<void> {
  const tempPath = `${targetPath}.tmp`;
  await mkdir(dirname(targetPath), { recursive: true });
  await writeFile(tempPath, contents, "utf8");
  await rename(tempPath, targetPath);
}
```

Create `src/main/workspace/projectService.ts`:

```ts
import matter from "gray-matter";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  parseDocumentFile,
  parseProjectManifest,
} from "../../shared/workspace";
import { writeFileAtomic } from "./fileStore";

export async function loadWorkspace(rootPath: string) {
  const manifestText = await readFile(
    join(rootPath, "project.wryte.yaml"),
    "utf8",
  );
  const manifest = parseProjectManifest(manifestText);

  const documents = await Promise.all(
    manifest.binder.map(async (node) => {
      const raw = await readFile(join(rootPath, node.path), "utf8");
      const parsed = parseDocumentFile(raw);
      return { ...node, ...parsed };
    }),
  );

  return { rootPath, manifest, documents };
}

export async function saveDocumentBody(
  targetPath: string,
  body: string,
): Promise<void> {
  const existing = await readFile(targetPath, "utf8");
  const { metadata } = parseDocumentFile(existing);
  const nextFile = matter.stringify(body, metadata);
  await writeFileAtomic(targetPath, nextFile);
}
```

- [ ] **Step 4: Extend the test to prove body saves preserve front matter**

Extend `tests/unit/workspace.test.ts` with:

```ts
const sourcePath = join(
  process.cwd(),
  "fixtures/sample-project/manuscript/chapter-01.md",
);
const tempDir = mkdtempSync(join(tmpdir(), "wryte-"));
const copyPath = join(tempDir, "chapter-01.md");
copyFileSync(sourcePath, copyPath);

await saveDocumentBody(copyPath, "# Updated\n\nBody");

const saved = readFileSync(copyPath, "utf8");
expect(saved).toContain("synopsis: Opening scene");
expect(saved).toContain("# Updated");
```

- [ ] **Step 5: Run the unit test and commit**

Run: `npm run test:unit -- tests/unit/workspace.test.ts` Expected: PASS with
`2 passed`

Commit:

```bash
git add src/main/workspace/fileStore.ts src/main/workspace/projectService.ts src/shared/workspace.ts fixtures/sample-project/project.wryte.yaml tests/unit/workspace.test.ts
git commit -m "feat: load and save plain-text workspaces"
```

## Task 4: Wire the preload bridge, IPC, and renderer store

**Files:**

- Create: `src/main/ipc/workspaceIpc.ts`
- Modify: `src/main/index.ts`
- Modify: `src/preload/index.ts`
- Create: `src/renderer/src/store/workspaceStore.ts`
- Modify: `src/renderer/src/App.tsx`
- Test: `tests/unit/workspace.test.ts`

- [ ] **Step 1: Write the failing store test**

```ts
import { describe, expect, it, vi } from "vitest";
import { createWorkspaceStore } from "../../src/renderer/src/store/workspaceStore";

describe("workspaceStore", () => {
  it("loads a workspace through the preload bridge", async () => {
    const loadWorkspace = vi
      .fn()
      .mockResolvedValue({ manifest: { title: "Demo Novel" }, documents: [] });
    const store = createWorkspaceStore({ loadWorkspace });

    await store.getState().openWorkspace("/tmp/demo");

    expect(loadWorkspace).toHaveBeenCalledWith("/tmp/demo");
    expect(store.getState().workspace?.manifest.title).toBe("Demo Novel");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- tests/unit/workspace.test.ts` Expected: FAIL with
`Cannot find module '../../src/renderer/src/store/workspaceStore'`

- [ ] **Step 3: Add the typed bridge and IPC handlers**

Create `src/main/ipc/workspaceIpc.ts`:

```ts
import { ipcMain } from "electron";
import { loadWorkspace } from "../workspace/projectService";

export function registerWorkspaceIpc(): void {
  ipcMain.handle("workspace:load", async (_event, rootPath: string) =>
    loadWorkspace(rootPath),
  );
}
```

Set `src/preload/index.ts` to:

```ts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("wrytedown", {
  loadWorkspace: (rootPath: string) =>
    ipcRenderer.invoke("workspace:load", rootPath),
});
```

Update `src/main/index.ts` to call `registerWorkspaceIpc()` and enable desktop
spellcheck:

```ts
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload,
    spellcheck: true,
  },
});
```

- [ ] **Step 4: Create the renderer store and empty workspace shell**

Create `src/renderer/src/store/workspaceStore.ts`:

```ts
import { create } from "zustand";

type WorkspaceBridge = {
  loadWorkspace(rootPath: string): Promise<unknown>;
};

type WorkspaceState = {
  workspace: any | null;
  openWorkspace(rootPath: string): Promise<void>;
};

export const createWorkspaceStore = (bridge: WorkspaceBridge) =>
  create<WorkspaceState>((set) => ({
    workspace: null,
    openWorkspace: async (rootPath) => {
      const workspace = await bridge.loadWorkspace(rootPath);
      set({ workspace });
    },
  }));
```

Set `src/renderer/src/App.tsx` to:

```tsx
import { createWorkspaceStore } from "./store/workspaceStore";

const store = createWorkspaceStore(window.wrytedown);

export default function App(): JSX.Element {
  const workspace = store((state) => state.workspace);

  return (
    <main className="empty-shell">
      <h1>{workspace?.manifest.title ?? "Wrytedown"}</h1>
      <button
        type="button"
        onClick={() =>
          void store.getState().openWorkspace("fixtures/sample-project")
        }
      >
        Open sample project
      </button>
    </main>
  );
}
```

- [ ] **Step 5: Run unit tests and commit**

Run: `npm run test:unit -- tests/unit/workspace.test.ts` Expected: PASS with the
new store test included

Commit:

```bash
git add src/main/index.ts src/main/ipc/workspaceIpc.ts src/preload/index.ts src/renderer/src/App.tsx src/renderer/src/store/workspaceStore.ts tests/unit/workspace.test.ts
git commit -m "feat: load workspaces through typed ipc"
```

## Task 5: Build the binder and Markdown editor with autosave

**Files:**

- Create: `src/renderer/src/features/binder/BinderTree.tsx`
- Create: `src/renderer/src/features/editor/MarkdownEditor.tsx`
- Modify: `src/renderer/src/App.tsx`
- Modify: `src/renderer/src/store/workspaceStore.ts`
- Modify: `src/main/ipc/workspaceIpc.ts`
- Modify: `src/main/workspace/projectService.ts`
- Test: `tests/e2e/workspace.spec.ts`

- [ ] **Step 1: Write the failing UI test**

```ts
import { test, expect, _electron as electron } from "@playwright/test";

test("opens a project and edits a manuscript document", async () => {
  const app = await electron.launch({ args: ["."] });
  const page = await app.firstWindow();

  await page.getByRole("button", { name: "Open sample project" }).click();
  await expect(page.getByRole("treeitem", { name: "Chapter 1" })).toBeVisible();
  await page.getByRole("treeitem", { name: "Chapter 1" }).click();
  await page.getByRole("textbox").fill("# Chapter 1\n\nUpdated text.");

  await expect(page.getByText("Saved")).toBeVisible();
  await app.close();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:e2e -- tests/e2e/workspace.spec.ts` Expected: FAIL because
the binder and editor are not rendered.

- [ ] **Step 3: Add save IPC and autosave support**

Extend `src/main/ipc/workspaceIpc.ts`:

```ts
ipcMain.handle(
  "workspace:saveDocument",
  async (_event, documentPath: string, contents: string) => {
    await saveDocumentBody(documentPath, contents);
    return { ok: true };
  },
);
```

Extend `src/preload/index.ts`:

```ts
saveDocument: (documentPath: string, contents: string) =>
  ipcRenderer.invoke("workspace:saveDocument", documentPath, contents);
```

- [ ] **Step 4: Render binder + editor and debounce autosave**

Create `src/renderer/src/features/binder/BinderTree.tsx`:

```tsx
export function BinderTree({ documents, onSelect, selectedId }) {
  return (
    <nav aria-label="Binder">
      <ul role="tree">
        {documents.map((document) => (
          <li
            key={document.id}
            role="treeitem"
            aria-selected={selectedId === document.id}
          >
            <button type="button" onClick={() => onSelect(document.id)}>
              {document.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

Create `src/renderer/src/features/editor/MarkdownEditor.tsx`:

```tsx
import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import { useEffect, useRef } from "react";

export function MarkdownEditor({ document, onSave }) {
  const hostRef = useRef(null);

  useEffect(() => {
    if (!hostRef.current) return;

    let saveTimer = 0;
    const view = new EditorView({
      parent: hostRef.current,
      state: EditorState.create({
        doc: document.body,
        extensions: [
          markdown(),
          EditorView.contentAttributes.of({ spellcheck: "true" }),
          EditorView.updateListener.of((update) => {
            if (!update.docChanged) return;
            window.clearTimeout(saveTimer);
            const nextValue = update.state.doc.toString();
            saveTimer = window.setTimeout(() => void onSave(nextValue), 400);
          }),
        ],
      }),
    });

    return () => {
      window.clearTimeout(saveTimer);
      view.destroy();
    };
  }, [document.id, document.body, onSave]);

  return <div className="editor-surface" ref={hostRef} />;
}
```

Modify `App.tsx` to show a three-pane layout: binder on the left, editor center,
placeholder inspector on the right.

- [ ] **Step 5: Run the e2e test and commit**

Run: `npm run test:e2e -- tests/e2e/workspace.spec.ts` Expected: PASS with
`1 passed`

Commit:

```bash
git add src/main/ipc/workspaceIpc.ts src/preload/index.ts src/main/workspace/projectService.ts src/renderer/src/App.tsx src/renderer/src/store/workspaceStore.ts src/renderer/src/features/binder/BinderTree.tsx src/renderer/src/features/editor/MarkdownEditor.tsx tests/e2e/workspace.spec.ts
git commit -m "feat: add binder and markdown editor"
```

## Task 6: Add metadata inspection and corkboard view

**Files:**

- Create: `src/renderer/src/features/inspector/InspectorPanel.tsx`
- Create: `src/renderer/src/features/corkboard/CorkboardView.tsx`
- Modify: `src/renderer/src/App.tsx`
- Modify: `src/renderer/src/store/workspaceStore.ts`
- Modify: `src/main/workspace/projectService.ts`
- Test: `tests/e2e/workspace.spec.ts`

- [ ] **Step 1: Write the failing corkboard/metadata test**

```ts
test("edits synopsis metadata and shows it on the corkboard", async () => {
  const app = await electron.launch({ args: ["."] });
  const page = await app.firstWindow();

  await page.getByRole("button", { name: "Open sample project" }).click();
  await page.getByRole("tab", { name: "Corkboard" }).click();
  await expect(page.getByText("Opening scene")).toBeVisible();
  await page.getByRole("tab", { name: "Inspector" }).click();
  await page.getByLabel("Synopsis").fill("A better synopsis");
  await page.getByRole("tab", { name: "Corkboard" }).click();
  await expect(page.getByText("A better synopsis")).toBeVisible();
  await app.close();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:e2e -- tests/e2e/workspace.spec.ts` Expected: FAIL because
corkboard and metadata editing do not exist.

- [ ] **Step 3: Add metadata persistence to the project service**

Extend `projectService.ts` with:

```ts
export async function saveDocumentMetadata(
  targetPath: string,
  metadata: DocumentMetadata,
  body: string,
): Promise<void> {
  const file = matter.stringify(body, metadata);
  await writeFileAtomic(targetPath, file);
}
```

- [ ] **Step 4: Build the inspector and corkboard components**

Create `src/renderer/src/features/inspector/InspectorPanel.tsx`:

```tsx
export function InspectorPanel({ metadata, onChange }) {
  return (
    <form>
      <label>
        Synopsis
        <textarea
          aria-label="Synopsis"
          value={metadata.synopsis}
          onChange={(event) => onChange({ synopsis: event.target.value })}
        />
      </label>
    </form>
  );
}
```

Create `src/renderer/src/features/corkboard/CorkboardView.tsx`:

```tsx
export function CorkboardView({ documents, onSelect }) {
  return (
    <section className="corkboard">
      {documents.map((document) => (
        <button
          key={document.id}
          type="button"
          className="card"
          onClick={() => onSelect(document.id)}
        >
          <h3>{document.title}</h3>
          <p>{document.metadata.synopsis}</p>
          <small>{document.metadata.status}</small>
        </button>
      ))}
    </section>
  );
}
```

Modify `App.tsx` to add `Editor`, `Corkboard`, and `Inspector` tabs with shared
selected-document state.

- [ ] **Step 5: Run the e2e test and commit**

Run: `npm run test:e2e -- tests/e2e/workspace.spec.ts` Expected: PASS with both
UI flows passing

Commit:

```bash
git add src/main/workspace/projectService.ts src/renderer/src/App.tsx src/renderer/src/store/workspaceStore.ts src/renderer/src/features/inspector/InspectorPanel.tsx src/renderer/src/features/corkboard/CorkboardView.tsx tests/e2e/workspace.spec.ts
git commit -m "feat: add corkboard and metadata inspector"
```

## Task 7: Build the local index and project search

**Files:**

- Create: `src/main/workspace/indexer.ts`
- Modify: `src/main/ipc/workspaceIpc.ts`
- Modify: `src/preload/index.ts`
- Create: `src/renderer/src/features/search/SearchPanel.tsx`
- Modify: `src/renderer/src/App.tsx`
- Test: `tests/unit/indexer.test.ts`

- [ ] **Step 1: Write the failing index/search test**

```ts
import { describe, expect, it } from "vitest";
import {
  buildWorkspaceIndex,
  searchWorkspace,
} from "../../src/main/workspace/indexer";

describe("indexer", () => {
  it("finds text in document body and synopsis", () => {
    const index = buildWorkspaceIndex([
      {
        id: "chapter-01",
        title: "Chapter 1",
        body: "First words",
        metadata: { synopsis: "Opening scene", labels: [], status: "draft" },
      },
    ]);

    expect(searchWorkspace(index, "opening")).toHaveLength(1);
    expect(searchWorkspace(index, "words")).toHaveLength(1);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:unit -- tests/unit/indexer.test.ts` Expected: FAIL with
`Cannot find module '../../src/main/workspace/indexer'`

- [ ] **Step 3: Implement the indexer**

Create `src/main/workspace/indexer.ts`:

```ts
export function buildWorkspaceIndex(documents) {
  return documents.map((document) => ({
    id: document.id,
    haystack:
      `${document.title}\n${document.metadata.synopsis}\n${document.body}`.toLowerCase(),
    title: document.title,
    synopsis: document.metadata.synopsis,
  }));
}

export function searchWorkspace(index, query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return index.filter((entry) => entry.haystack.includes(needle));
}
```

- [ ] **Step 4: Expose search to the renderer and render a result list**

Create `src/renderer/src/features/search/SearchPanel.tsx`:

```tsx
export function SearchPanel({ results, query, onQueryChange, onSelect }) {
  return (
    <section>
      <input
        aria-label="Search project"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <ul>
        {results.map((result) => (
          <li key={result.id}>
            <button type="button" onClick={() => onSelect(result.id)}>
              {result.title} - {result.synopsis}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

Extend `src/main/ipc/workspaceIpc.ts` with:

```ts
import { buildWorkspaceIndex, searchWorkspace } from '../workspace/indexer'

ipcMain.handle('workspace:search', async (_event, rootPath: string, query: string) => {
  const workspace = await loadWorkspace(rootPath)
  const index = buildWorkspaceIndex(workspace.documents)
  return searchWorkspace(index, query)
})
```

Expose the handler in `src/preload/index.ts`:

```ts
searchWorkspace: (rootPath: string, query: string) =>
  ipcRenderer.invoke('workspace:search', rootPath, query)
```

- [ ] **Step 5: Run unit tests and commit**

Run: `npm run test:unit -- tests/unit/indexer.test.ts` Expected: PASS with
`1 passed`

Commit:

```bash
git add src/main/workspace/indexer.ts src/main/ipc/workspaceIpc.ts src/preload/index.ts src/renderer/src/App.tsx src/renderer/src/features/search/SearchPanel.tsx tests/unit/indexer.test.ts
git commit -m "feat: add local project search"
```

## Task 8: Add compile/export and offline language assistance

**Files:**

- Create: `src/main/workspace/exportService.ts`
- Create: `src/main/workspace/languageService.ts`
- Modify: `src/main/ipc/workspaceIpc.ts`
- Modify: `src/preload/index.ts`
- Create: `src/renderer/src/features/compile/CompilePanel.tsx`
- Modify: `src/renderer/src/features/editor/MarkdownEditor.tsx`
- Test: `tests/unit/exportService.test.ts`
- Test: `tests/unit/languageService.test.ts`

- [ ] **Step 1: Write the failing export and language tests**

```ts
import { describe, expect, it } from "vitest";
import { buildPandocCommand } from "../../src/main/workspace/exportService";
import { lintDocument } from "../../src/main/workspace/languageService";

describe("exportService", () => {
  it("assembles a pandoc command in binder order", () => {
    const command = buildPandocCommand({
      rootPath: "/workspace",
      outputPath: "/workspace/out/book.docx",
      files: ["manuscript/chapter-01.md", "manuscript/chapter-02.md"],
    });

    expect(command.args).toEqual([
      "/workspace/manuscript/chapter-01.md",
      "/workspace/manuscript/chapter-02.md",
      "-o",
      "/workspace/out/book.docx",
    ]);
  });
});

describe("languageService", () => {
  it("flags repeated weak phrasing", async () => {
    const suggestions = await lintDocument(
      "Very very quickly, things began to happen.",
    );
    expect(suggestions.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:
`npm run test:unit -- tests/unit/exportService.test.ts tests/unit/languageService.test.ts`
Expected: FAIL because both services are missing.

- [ ] **Step 3: Implement Pandoc command assembly**

Create `src/main/workspace/exportService.ts`:

```ts
import { join } from "node:path";

export function buildPandocCommand({
  rootPath,
  outputPath,
  files,
}: {
  rootPath: string;
  outputPath: string;
  files: string[];
}) {
  return {
    command: "pandoc",
    args: [...files.map((file) => join(rootPath, file)), "-o", outputPath],
  };
}
```

- [ ] **Step 4: Implement offline language linting and surface it in the
      editor**

Create `src/main/workspace/languageService.ts`:

```ts
import { unified } from "unified";
import retextEnglish from "retext-english";
import retextRepeatedWords from "retext-repeated-words";

export async function lintDocument(text: string) {
  const file = await unified()
    .use(retextEnglish)
    .use(retextRepeatedWords)
    .process(text);
  return file.messages.map((message) => ({
    reason: String(message.reason),
    line: message.position?.start.line ?? 1,
    column: message.position?.start.column ?? 1,
  }));
}
```

Create `src/renderer/src/features/compile/CompilePanel.tsx`:

```tsx
export function CompilePanel({ onCompile, status }) {
  return (
    <section>
      <button type="button" onClick={() => onCompile("docx")}>
        Compile to DOCX
      </button>
      <p>{status}</p>
    </section>
  );
}
```

Extend `MarkdownEditor.tsx` to render a simple suggestions list below the
editor, and rely on Electron’s built-in spellcheck from Task 4 for spelling
while `lintDocument()` provides offline style/grammar hints:

```tsx
return (
  <section className="editor-pane">
    <div className="editor-surface" ref={hostRef} />
    <aside className="suggestions">
      <h3>Writing suggestions</h3>
      <ul>
        {suggestions.map((item) => (
          <li key={`${item.line}:${item.column}:${item.reason}`}>
            {item.reason} ({item.line}:{item.column})
          </li>
        ))}
      </ul>
    </aside>
  </section>
);
```

- [ ] **Step 5: Run unit tests and commit**

Run:
`npm run test:unit -- tests/unit/exportService.test.ts tests/unit/languageService.test.ts`
Expected: PASS with both suites green

Commit:

```bash
git add src/main/workspace/exportService.ts src/main/workspace/languageService.ts src/main/ipc/workspaceIpc.ts src/preload/index.ts src/renderer/src/features/compile/CompilePanel.tsx src/renderer/src/features/editor/MarkdownEditor.tsx tests/unit/exportService.test.ts tests/unit/languageService.test.ts
git commit -m "feat: add export and language tooling"
```

## Task 9: Close the loop with an end-to-end manuscript workflow

**Files:**

- Modify: `tests/e2e/workspace.spec.ts`
- Modify: `src/renderer/src/App.tsx`
- Modify: `src/renderer/src/styles/app.css`
- Modify: `README.md`

- [ ] **Step 1: Write the failing end-to-end workflow test**

```ts
test("supports the MVP writing workflow", async () => {
  const app = await electron.launch({ args: ["."] });
  const page = await app.firstWindow();

  await page.getByRole("button", { name: "Open sample project" }).click();
  await page.getByRole("treeitem", { name: "Chapter 2" }).click();
  await page.getByLabel("Search project").fill("Second scene");
  await expect(page.getByText("Chapter 2 - Escalation")).toBeVisible();
  await page.getByRole("button", { name: "Compile to DOCX" }).click();
  await expect(page.getByText("Compile queued: docx")).toBeVisible();
  await app.close();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test:e2e -- tests/e2e/workspace.spec.ts` Expected: FAIL because
the full MVP flow is not yet wired together cleanly.

- [ ] **Step 3: Tighten the shell layout and cross-feature wiring**

Update `App.tsx` so the left pane contains binder + search, the center pane
contains tabs for editor/corkboard, and the right pane contains inspector +
compile status. Keep the selected document synchronized across all panels and
show explicit statuses:

```tsx
<aside className="left-pane">
  <SearchPanel
    query={searchQuery}
    results={searchResults}
    onQueryChange={setSearchQuery}
    onSelect={selectDocument}
  />
  <BinderTree
    documents={workspace.documents}
    selectedId={selectedDocumentId}
    onSelect={selectDocument}
  />
</aside>
<section className="center-pane">
  <div className="tab-strip">
    <button type="button" onClick={() => setActiveView('editor')}>Editor</button>
    <button type="button" onClick={() => setActiveView('corkboard')}>Corkboard</button>
  </div>
  {activeView === 'editor' ? (
    <MarkdownEditor document={selectedDocument} onSave={saveSelectedDocument} suggestions={suggestions} />
  ) : (
    <CorkboardView documents={workspace.documents} onSelect={selectDocument} />
  )}
</section>
<aside className="right-pane">
  <InspectorPanel metadata={selectedDocument.metadata} onChange={updateSelectedMetadata} />
  <CompilePanel onCompile={compileWorkspace} status={compileStatus} />
</aside>
```

- [ ] **Step 4: Document the MVP workflow in the README**

Append to `README.md`:

```md
## MVP workflow

The first shipping milestone supports:

- opening a filesystem-backed Wrytedown project
- browsing chapters/scenes in the binder
- editing Markdown with autosave
- updating synopsis and status metadata
- viewing the corkboard
- searching project text locally
- running offline grammar/style lint suggestions
- compiling the manuscript through Pandoc
```

- [ ] **Step 5: Run the full suite and commit**

Run: `npm test` Expected: PASS with unit and e2e suites green

Commit:

```bash
git add src/renderer/src/App.tsx src/renderer/src/styles/app.css tests/e2e/workspace.spec.ts README.md
git commit -m "feat: ship the wrytedown mvp workflow"
```

## Self-review checklist

- Spec coverage: the tasks above cover the project model, binder, corkboard,
  editor, inspector, search, export, offline language assistance, and
  cross-platform desktop shell from the approved spec.
- Placeholder scan: no task uses TBD/TODO or hand-wavy “implement later”
  language.
- Type consistency: the plan consistently uses `project.wryte.yaml`,
  `workspace:load`, `workspace:saveDocument`, `buildPandocCommand`, and
  `lintDocument`.

## Implementation notes

- Keep Markdown and YAML front matter canonical at every step.
- Do not introduce a database for canonical content in the MVP.
- Keep export jobs and language suggestions recoverable from source files.
- If a later task needs snapshots/history, store them beside the project as
  rebuildable support data rather than inside a proprietary container.
