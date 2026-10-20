# Cloud and External Synchronization

## Purpose

Reduce corruption risk when projects or text move through external
synchronization systems.

## Functional requirements

- **FR-SYNC-001** — The application shall detect and report concurrent or
  conflicted project content when feasible.
- **FR-SYNC-002** — The application shall not imply real-time collaboration when
  only file synchronization is provided.
- **FR-SYNC-003** — External-folder synchronization shall define an explicit
  merge and deletion policy.
- **FR-SYNC-004** — Synchronization operations shall generate an auditable
  result report.

## Acceptance scenarios

### Conflict detected

```gherkin
Given divergent versions of the same project content
When the project opens
Then both recoverable variants are retained or the user is asked to resolve them
```

## Edge cases

- Offline edits.
- Clock skew.
- Case-sensitive filenames.
- Provider placeholders.

## Dependencies

- Project model and persistence.
