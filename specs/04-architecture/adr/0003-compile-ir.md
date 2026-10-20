# ADR 0003: Compile Intermediate Representation

- **Status:** Proposed
- **Decision:** Use a target-neutral intermediate document representation
  between project items and renderers.
- **Rationale:** keeps source assembly, semantic transforms, and target
  rendering separately testable.
- **Consequences:** every importer/exporter needs explicit mappings; unsupported
  constructs produce diagnostics rather than silent loss.
