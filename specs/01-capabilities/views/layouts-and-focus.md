# Layouts, Focus, and Appearance

## Purpose

Let authors save working arrangements and reduce visual distraction.

## Functional requirements

- **FR-VIEW-030** — The user shall save and restore named workspace layouts.
- **FR-VIEW-031** — A layout shall record pane visibility, split arrangement,
  sizing, and view modes.
- **FR-VIEW-032** — The editor shall offer a distraction-reduced composition
  mode.
- **FR-VIEW-033** — Light and dark appearance shall preserve readable contrast.

## Acceptance scenarios

### Restore layout

```gherkin
Given a saved layout
When the user applies it
Then the recorded panes and view modes are restored
```

## Edge cases

- Missing item referenced by layout.
- Screen-size changes.
- Reduced-motion preference.

## Dependencies

- Project model and persistence.
