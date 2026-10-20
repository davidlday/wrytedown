# Project Format Requirements

## Goals

- Durable, versioned, recoverable storage.
- Stable item identity independent of display title or path.
- Efficient partial reads for large projects.
- Safe inspection and backup using ordinary platform tools where possible.

## Required records

- Manifest with format and application versions.
- Item hierarchy and order.
- Text or document content references.
- Metadata definitions and values.
- Collections, bookmarks, snapshots, layouts, and compile settings.
- Integrity data sufficient to detect incomplete writes.

## Constraints

- A save must not leave the only copy in an unreadable intermediate state.
- Unknown optional fields should survive read/write when practical.
- Migrations must be explicit, tested, and backed up.
- Secrets and credentials must never be embedded in project files.

## Decision pending

The attached Wryte format specification could not be opened in this session, so
exact on-disk compatibility is intentionally unspecified.
