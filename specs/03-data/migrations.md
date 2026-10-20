# Migration Contract

## Requirements

- Detect source schema before mutation.
- Reject unsupported future schemas read-only.
- Back up before irreversible migration.
- Run migrations in a deterministic sequence.
- Validate invariants after every migration step.
- Preserve a machine-readable migration log.
- If migration fails, leave the original untouched and provide diagnostics.

## Test fixtures

Maintain anonymized fixtures for every released schema version and at least one
damaged-project case per integrity rule.
