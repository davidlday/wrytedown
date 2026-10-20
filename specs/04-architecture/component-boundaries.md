# Component Boundaries

- **Project Core** owns entities, invariants, commands, and transactions.
- **Persistence** maps project state to versioned storage and performs recovery.
- **Editor Adapter** translates between the editor document model and item
  content.
- **Workspace** manages panes, focus, layout, and active selection.
- **Indexing** consumes committed changes and serves query results.
- **Compiler** reads immutable project snapshots and emits output plus
  diagnostics.
- **Importers/Exporters** are isolated adapters with explicit capability
  declarations.
- **Platform Services** wrap menus, shortcuts, file dialogs, printing,
  accessibility, and appearance.

No UI component may directly mutate storage; it issues commands through Project
Core.
