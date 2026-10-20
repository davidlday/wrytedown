# Split Editors and Reference Views

## Purpose

Allow writing and reference material to remain visible together.

## Functional requirements

- **FR-EDIT-020** — The workspace shall support two independently navigable
  editor panes.
- **FR-EDIT-021** — Each editor pane shall retain its own selection, navigation
  history, and view mode.
- **FR-EDIT-022** — A pane may pin a read-only or editable reference view
  without changing the primary selection.

## Acceptance scenarios

### Independent panes

```gherkin
Given two editor panes
When the left pane navigates to another item
Then the right pane remains on its current item
```

## Edge cases

- Same item edited in both panes.
- Closing a pane with an active transient state.

## Dependencies

- Project model and persistence.
