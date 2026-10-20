# Synopsis, Notes, and Targets

## Purpose

Support planning summaries, private notes, and measurable writing goals.

## Functional requirements

- **FR-META-020** — Each item may store a synopsis independently of body text.
- **FR-META-021** — Each item may store notes independently of body text.
- **FR-META-022** — The user may set count targets for eligible items and
  containers.
- **FR-META-023** — Container progress shall define whether it includes
  descendants.

## Acceptance scenarios

### Update synopsis

```gherkin
Given an item displayed as a card
When its synopsis changes in the inspector
Then the card reflects the new synopsis
```

## Edge cases

- Empty targets.
- Over-target values.
- Excluded descendants.

## Dependencies

- Project model and persistence.
