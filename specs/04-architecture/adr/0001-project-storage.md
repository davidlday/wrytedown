# ADR 0001: Project Storage

- **Status:** Proposed
- **Decision:** Not yet selected.
- **Options:** directory/package with manifest; embedded database;
  content-addressed hybrid.
- **Decision drivers:** atomicity, inspectability, large assets, backup
  behavior, cloud sync, migration complexity, and cross-platform support.
- **Required proof:** interruption test, conflict-copy test, 10k-item benchmark,
  asset corruption test, and schema migration rehearsal.
