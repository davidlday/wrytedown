# Item State Machine

## States

- Active
- Trashed
- Purged

## Transitions

- `Active -> Trashed`: default delete operation.
- `Trashed -> Active`: restore to an eligible destination.
- `Trashed -> Purged`: explicit permanent deletion.

## Rules

- Purged items are inaccessible through normal project views.
- Restoring retains content and metadata.
- References to a trashed item may remain but must expose its state.
- Purge behavior for snapshots, collections, and bookmarks must be resolved
  before implementation.
