# Project Lifecycle

## Purpose

Create, open, close, duplicate, and identify independent writing projects.

## Functional requirements

- **FR-PROJ-001** — The system shall create a project from a blank
  configuration.
- **FR-PROJ-002** — The system shall open an existing supported project and
  validate its structure before editing.
- **FR-PROJ-003** — The system shall prevent accidental overwrite when creating
  or duplicating a project.
- **FR-PROJ-004** — The system shall surface the active project name and
  persistent location.

## Acceptance scenarios

### Create blank project

```gherkin
Given a writable destination
When the user creates a blank project
Then the project opens with Draft, Research, and Trash roots
```

### Reject invalid project

```gherkin
Given an invalid or unsupported project
When the user attempts to open it
Then editing does not begin and a diagnostic is shown
```

## Edge cases

- Missing location permissions.
- Project moved while open.
- Same project opened twice.

## Dependencies

- Project model and persistence.
