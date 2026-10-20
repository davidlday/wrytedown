# Import and Research Media

## Purpose

Bring supporting files into the project and view them beside the manuscript.

## Functional requirements

- **FR-ORG-010** — The system shall import supported text and research formats
  with a result report.
- **FR-ORG-011** — Imported assets shall have stable project identities.
- **FR-ORG-012** — Unsupported or partially supported content shall not be
  silently discarded.
- **FR-ORG-013** — Common media and PDF assets shall be viewable or openable
  through a safe external fallback.

## Acceptance scenarios

### Import unsupported file

```gherkin
Given an unsupported file
When import is attempted
Then no corrupt item is created and the user receives a diagnostic
```

## Edge cases

- Duplicate filenames.
- Huge media.
- Missing external links.
- Malicious documents.

## Dependencies

- Project model and persistence.
