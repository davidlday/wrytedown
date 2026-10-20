# Snapshots

## Purpose

Capture and compare immutable prior versions of item text.

## Functional requirements

- **FR-META-030** — The user shall create a named snapshot of an item’s current
  text.
- **FR-META-031** — Creating a snapshot shall not alter live content.
- **FR-META-032** — The user shall compare a snapshot with current text.
- **FR-META-033** — Restoring a snapshot shall preserve the displaced live
  version or require confirmation.

## Acceptance scenarios

### Restore snapshot

```gherkin
Given a snapshot and newer live content
When the snapshot is restored
Then the snapshot text becomes live and the action is recoverable
```

## Edge cases

- Snapshot of deleted item.
- Binary content.
- Storage growth.

## Dependencies

- Project model and persistence.
