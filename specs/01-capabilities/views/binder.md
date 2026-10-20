# Binder / Project Outline

## Purpose

Expose the project hierarchy as the primary navigation and restructuring
surface.

## Functional requirements

- **FR-VIEW-001** — The binder shall display ordered hierarchy and expansion
  state.
- **FR-VIEW-002** — Selecting an item shall load it into the active editor
  unless the editor is locked.
- **FR-VIEW-003** — Drag-and-drop restructuring shall indicate valid targets
  before commit.
- **FR-VIEW-004** — The binder shall distinguish system roots and ordinary
  items.

## Acceptance scenarios

### Select item

```gherkin
Given an unlocked editor
When the user selects an item in the binder
Then that item opens in the active editor
```

## Edge cases

- Filtered tree moves.
- Keyboard reordering.
- Huge sibling lists.

## Dependencies

- Project model and persistence.
