# Compile Domain Model

## Inputs

- Ordered source item set
- Inclusion/exclusion flags
- Section-type assignments
- Compile format and output type
- Project metadata

## Stages

1. Validate configuration.
2. Resolve item inclusion and order.
3. Read immutable source snapshot.
4. Normalize content into an intermediate document model.
5. Apply section layouts and separators.
6. Transform styles, notes, links, and assets.
7. Render to target format.
8. Validate and write atomically.
9. Return diagnostics and output record.

## Determinism boundary

Timestamps, random identifiers, and environment-dependent metadata must be
normalized or explicitly documented.
