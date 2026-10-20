# Save, Backup, and Recovery

## Purpose

Protect author content during routine editing, failures, and upgrades.

## Functional requirements

- **FR-PROJ-010** — The system shall persist committed edits without requiring
  the user to understand internal files.
- **FR-PROJ-011** — The system shall use an atomic or equivalently recoverable
  save strategy.
- **FR-PROJ-012** — The system shall create configurable backups without
  modifying the active project.
- **FR-PROJ-013** — The system shall report recovered or conflicting content
  instead of silently discarding it.

## Acceptance scenarios

### Interrupted save

```gherkin
Given a valid saved project
When saving is interrupted
Then the prior complete version or a recoverable new version remains available
```

### Backup restore

```gherkin
Given at least one valid backup
When the active project is unavailable
Then the user can restore a separate project from the backup
```

## Edge cases

- Disk full.
- Read-only media.
- Partial cloud synchronization.
- Conflicting copies.

## Dependencies

- Project model and persistence.
