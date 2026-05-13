# Wrytedown architecture design

## Problem statement

Design a desktop writing application that provides the core Scrivener experience - outlining, corkboard, and document editing - while keeping Markdown as the default file format and preserving sustainable plain-text authorship. The application must rely on open source components, work fully offline, and support common writing features such as spelling, grammar assistance, formatting help, search, and export.

The primary architectural constraint is that authors must not be trapped in a proprietary storage model. Projects should remain understandable, editable, and publishable outside the application through ordinary text tools and Pandoc-based workflows.

## Goals

- Support binder/outliner, corkboard, editor, inspector, search, and compile/export workflows.
- Keep Markdown plus explicit metadata as the canonical project representation.
- Preserve offline operation for core editing, organization, indexing, and language tooling.
- Use only open source components.
- Support cross-platform desktop delivery for Windows, macOS, and Linux.
- Provide "good enough" drafting-time formatting and language assistance inside the app.
- Delegate advanced publishing and final-format production to a Pandoc-centered export pipeline.

## Non-goals

- Matching every Scrivener feature or internal data model exactly.
- Delivering full word-processor-grade WYSIWYG page layout inside the editor.
- Making DOCX or another binary format the canonical source of truth.
- Optimizing for cloud collaboration or internet-dependent services.

## Assumptions

- Cross-platform delivery matters more than perfect native look and feel.
- Sustainable plain-text authorship takes priority over maximum feature parity with word processors.
- Local grammar/style tooling may be less capable than cloud services, but must remain offline and open source.
- Rich formatting that cannot be represented safely in Markdown belongs in preview/export behavior, not in stored author content.

## Architectural alternatives

### Option A: web-tech desktop shell over a plain-text project model (recommended)

Use an Electron or Tauri desktop shell with a Markdown-first project model, a local indexing/cache layer, and a web-tech UI for binder, corkboard, editor, inspector, and compile panels. Pandoc handles export. Local spellcheck and grammar/style tools integrate through adapters.

**Can implement well**

- Outliner/binder hierarchy with drag-and-drop ordering
- Corkboard cards with synopsis, status, labels, and metadata
- Markdown editor with preview, formatting commands, and shortcuts
- Project search, tags, templates, collections, and statistics
- Offline compile/export through Pandoc to DOCX, PDF, HTML, EPUB, and manuscript formats
- Sustainable-authorship workflows through transparent files and Git-friendly diffs

**Cannot implement as well**

- Full word-processor-style WYSIWYG fidelity
- Best-in-class grammar feedback comparable to proprietary cloud tools
- Perfect round-tripping for rich binary document formats as native sources

**Pros**

- Best alignment with cross-platform scope and delivery speed
- Large open source ecosystem for UI, editing, packaging, and local services
- Strong fit for Markdown as canonical storage
- Easiest path to feature breadth across outliner, corkboard, and editor surfaces

**Cons**

- Electron increases memory usage; Tauri reduces that at the cost of some ecosystem convenience
- Native feel, accessibility polish, and drag/drop behavior require deliberate investment
- Editor complexity increases if too much rich-text behavior is pushed into the drafting surface

### Option B: native desktop application with embedded editor components

Use a native toolkit such as Qt with a native shell for project management, binder, corkboard, and inspector, plus an embedded Markdown editor and renderer. Keep the same plain-text project model and Pandoc export pipeline.

**Can implement well**

- Strong native desktop ergonomics
- Better low-level file integration, menu behavior, drag/drop, and accessibility
- Offline-first project management with transparent storage

**Cannot implement as well**

- Fast delivery of complex editor behavior
- Broad plugin/component reuse for editor and preview surfaces
- Rapid cross-platform iteration compared with web-tech tooling

**Pros**

- Best runtime performance and native feel
- Lower idle resource use
- Strong long-term control over desktop conventions

**Cons**

- Highest development cost
- Harder to achieve cross-platform parity
- More risk when implementing rich drafting aids and advanced editor behavior

### Option C: hybrid native shell plus web-based editor workspace

Use a native shell for project lifecycle, file watching, indexing, and background services, with webview-based binder, corkboard, and editor modules. The native layer owns filesystem and job orchestration, while the web layer owns most interaction-heavy UI.

**Can implement well**

- Transparent project storage and offline-first behavior
- Richer iteration speed than a fully native app
- Better desktop integration than a pure web shell

**Cannot implement as well**

- Architectural simplicity
- Lowest-friction packaging and debugging
- Consistent behavior across all IPC boundaries without extra effort

**Pros**

- Good compromise between native control and UI delivery speed
- Leaves room for a stronger native core later without abandoning the UI approach
- Good fit if indexing, file watching, and background job orchestration become more sophisticated

**Cons**

- Highest coordination complexity between native and web layers
- Greater risk of sync bugs between project state, editor state, and background services
- More packaging and integration overhead than Option A

### Option D: rich-text-first editor engine with Markdown import/export

Use a structured rich-text editor as the primary authoring model and treat Markdown as an import/export or serialization target.

**Can implement well**

- More familiar word-processor editing feel
- Rich comments, annotations, and formatting affordances
- Stronger visible formatting controls inside the editor

**Cannot implement well**

- Sustainable plain-text authorship as a first-class principle
- Predictable Markdown round-tripping for all features
- A clean Pandoc-first workflow without model mismatch

**Pros**

- Best fit if word-processor editing fidelity becomes the dominant goal
- Easier to satisfy users expecting rich inline formatting

**Cons**

- Conflicts with Markdown-as-canonical-source
- Creates pressure toward hidden document-model complexity
- Higher risk of export inconsistencies and long-term lock-in behavior

## Recommended direction

Adopt **Option A**: a web-tech desktop shell over a plain-text project model, with Pandoc-based publishing and strictly local workspace services. This best matches the product priorities:

- cross-platform delivery first
- Markdown and plain text as the durable authoring substrate
- offline operation
- open source dependency choices
- enough UI flexibility to build binder, corkboard, and editor surfaces without inventing everything from scratch

Option C remains a plausible evolution path if later requirements demand a stronger native core for indexing, background jobs, or OS integration. Option B is credible if the team is already native-heavy and willing to accept a slower path to feature completeness. Option D should be rejected unless the project explicitly chooses word-processor fidelity over sustainable plain-text authorship.

## Proposed architecture

### Core architectural rule

Every user-facing feature must degrade back to **plain text plus explicit metadata**. If a feature cannot be represented that way, it belongs in rebuildable caches, optional UI state, or export behavior - not in canonical stored content.

### Main subsystems

1. **Project model layer**  
   Reads and writes the project manifest, Markdown documents, metadata, and binder structure.

2. **Workspace services layer**  
   Provides indexing, search, file watching, autosave, snapshots, import/export coordination, and language-tool integration.

3. **UI shell**  
   Hosts binder/outliner, corkboard, inspector, editor, search, and compile/export panels.

4. **Editor subsystem**  
   Offers Markdown-first drafting, preview, formatting helpers, and editor commands that preserve canonical plain-text storage.

5. **Publishing pipeline**  
   Resolves document order and settings, then delegates final output generation to Pandoc templates and transformations.

This structure keeps author content separate from derived state, publishing concerns, and UI-specific affordances.

## Data model

The project should be a normal directory tree with three conceptual layers:

1. **Manuscript content**  
   Markdown files for chapters, scenes, notes, research items, and other writing units.

2. **Document metadata**  
   YAML front matter or adjacent sidecar metadata for title, synopsis, label, status, timestamps, notes, targets, tags, and corkboard attributes.

3. **Project metadata**  
   A project manifest containing binder order, collections, compile settings, templates, custom schemas, and persistent UI state.

### Suggested default representation

- `project.wryte.yaml` for project-level settings and binder order
- one Markdown file per writing unit
- optional sidecar metadata only when front matter would become too noisy or intrusive

### Feature fit against the data model

- **Outlining** fits naturally through folders plus explicit binder ordering in the project manifest.
- **Corkboard** fits strongly through synopsis, labels, status, and card settings stored as metadata.
- **Document editing** fits strongly because Markdown remains canonical.
- **Research and notes** fit as ordinary Markdown documents or tagged folders.
- **Comments and annotations** are feasible, but should be stored as explicit metadata or adjacent notes rather than hidden editor-only state.
- **Formatting** works well for semantic structure, while exact visual presentation is deferred to preview and export templates.
- **Spelling and grammar** are feasible via local services, with quality bounded by available offline open source tools.
- **Compile/export** is a strong fit through Pandoc and templates.
- **Track changes and true page-layout WYSIWYG** are weak fits and should not define the core architecture.

## Runtime components and data flow

At runtime, the app acts as a thin orchestration layer over local files.

### Runtime components

1. **Filesystem/project service**  
   Loads project settings, resolves binder order, watches file changes, and performs atomic writes.

2. **Indexing service**  
   Builds and refreshes derived search state, tags, backlinks, corkboard summaries, and statistics such as word counts.

3. **Editor service**  
   Opens Markdown documents, manages autosave and editor session state, and exposes formatting commands as Markdown-safe transformations.

4. **Inspection service**  
   Edits metadata such as synopsis, labels, status, notes, deadlines, and custom fields.

5. **Compile/export service**  
   Resolves a selected document set in binder order, applies templates and compile rules, and invokes Pandoc to produce output formats.

6. **Language tools service**  
   Runs local spellcheck, grammar/style suggestions, dictionary management, and terminology checks.

### Data flow

- User edits a document -> editor writes Markdown -> project service persists the file -> indexer refreshes derived state -> binder, corkboard, search, and statistics update.
- User edits metadata in the inspector -> metadata is written to front matter or a sidecar -> outliner, corkboard, and search views update.
- User starts export -> compile service resolves content and settings -> transforms project metadata into Pandoc inputs -> produces target output files.

### Data integrity rule

UI state and derived state must never silently rewrite author prose. Persistent UI details such as pane state or card layout may be stored as project metadata, but they must not mutate text content unless the user explicitly edits that content.

## Error handling and failure boundaries

- Protect text first. All writes should be atomic.
- Autosave must never replace readable content without a recoverable snapshot.
- Import/export failures must be explicit and inspectable.
- If Pandoc, indexing, or language tooling fails, the user must still be able to open and edit the project.
- Malformed metadata should be surfaced clearly and isolated to the affected document rather than breaking the workspace.

### Required architectural separations

- **Canonical content vs derived state**  
  Markdown and explicit metadata are canonical; indexes, previews, caches, and rebuildable UI summaries are not.

- **Editing vs publishing**  
  The editor supports Markdown drafting; publishing transforms happen in the export pipeline.

- **Project model vs UI framework**  
  UI surfaces consume stable project APIs rather than talking directly to storage internals.

- **Open format vs app affordance**  
  Features that only exist inside the app should be optional metadata or excluded from the core model.

## Testing strategy

The architecture should be validated primarily through the following test categories:

1. **Round-trip project integrity**  
   Load, edit, save, reopen, and confirm that Markdown and metadata remain correct and readable.

2. **Export reproducibility**  
   The same project and compile settings should produce stable Pandoc outputs.

3. **Index rebuild correctness**  
   Derived state should be recoverable after deleting caches and rebuilding indexes.

4. **Failure isolation**  
   Broken external tools, malformed metadata, and file conflicts should not destroy access to author content.

5. **Cross-platform behavior**  
   Files, paths, watchers, packaging behavior, and project loading should work consistently across Windows, macOS, and Linux.

## Summary matrix

| Option | Core stack idea | Plain-text sustainability | Scrivener feature fit | Word-processor feature fit | Cross-platform fit | Complexity | Main risk |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A | Web-tech desktop shell | High | High | Medium | High | Medium | Resource use and web-shell feel |
| B | Native desktop application | High | High | Medium | Medium | High | Slower delivery and editor complexity |
| C | Native shell plus web workspace | High | High | Medium | High | High | Integration overhead and state sync bugs |
| D | Rich-text-first engine | Low-Medium | Medium | High | High | High | Markdown stops being canonical |

## Decision

Wrytedown should be built around a **Markdown-first, local-first, cross-platform desktop architecture** where:

- Markdown and explicit metadata are the durable source of truth
- the app provides strong drafting, organizing, and project-navigation workflows
- advanced publishing is delegated to Pandoc and templates
- offline, open source tooling is sufficient even where it is not identical to proprietary word-processor experiences

This decision best preserves sustainable authorship while still leaving room to deliver the essential Scrivener-like workflow.
