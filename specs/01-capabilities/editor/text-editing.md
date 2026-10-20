# Text Editing

## Purpose

Provide a reliable primary writing surface.

## Functional requirements

- **FR-EDIT-001** — The editor shall load and edit an item’s text.
- **FR-EDIT-002** — The editor shall support undo and redo across ordinary text
  operations.
- **FR-EDIT-003** — The editor shall preserve the project’s chosen text
  representation without silent loss.
- **FR-EDIT-004** — The editor shall expose live word and character counts.
- **FR-EDIT-005** — The editor shall provide find and replace within the active
  item.

## Acceptance scenarios

### Edit and reopen

```gherkin
Given a text item
When text is entered and the project is reopened
Then the same text is present
```

### Undo edit

```gherkin
Given a committed text state
When the user edits and invokes undo
Then the preceding state is restored
```

## Edge cases

- Large documents.
- Complex Unicode.
- Pasted unsupported formatting.

## Dependencies

- Project model and persistence.
