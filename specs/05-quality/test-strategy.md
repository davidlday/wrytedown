# Test Strategy

## Unit

Hierarchy invariants, order keys, metadata validation, query parsing, compile
transforms, and migrations.

## Property-based

Random item moves never create cycles; save/load preserves logical state;
compile selection ordering is deterministic.

## Contract

Importer/exporter capability declarations; persistence repository; editor
adapter; search index consistency.

## Integration

Create-edit-save-reopen; trash-restore; snapshot-restore; project upgrade;
conflict recovery; compile to every supported target.

## End-to-end

Blank project to exported manuscript, keyboard-only; research beside draft; plan
with cards; search and replace with preview; recover from interrupted save.

## Golden files

Use small, original fixtures for renderer output. Normalize
environment-dependent metadata before comparison.
