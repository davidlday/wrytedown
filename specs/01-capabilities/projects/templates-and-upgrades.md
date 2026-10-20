# Templates and Format Upgrades

## Purpose

Start from reusable structures and evolve the project schema safely.

## Functional requirements

- **FR-PROJ-020** — The system shall allow a project structure and selected
  settings to be saved as a template.
- **FR-PROJ-021** — The system shall version the project format.
- **FR-PROJ-022** — The system shall create a backup before an irreversible
  migration.
- **FR-PROJ-023** — The system shall reject newer unsupported project versions
  without rewriting them.

## Acceptance scenarios

### Upgrade legacy project

```gherkin
Given a supported older project version
When the user approves upgrade
Then a backup is retained and the upgraded copy passes validation
```

## Edge cases

- Template references to missing assets.
- Migration failure halfway through.

## Dependencies

- Project model and persistence.
