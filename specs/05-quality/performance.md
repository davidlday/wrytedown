# Performance Test Plan

## Required datasets

- Small: ordinary short project.
- Wide: many siblings in one container.
- Deep: heavily nested hierarchy.
- Large text: long individual items.
- Media-heavy: many large research assets.
- Metadata-heavy: custom fields, collections, snapshots, and bookmarks.

## Measure

Project open, first render, editor switch, save latency, drag/reorder, search
freshness, combined-view load, compile throughput, memory growth, and
cancellation cleanup.

Exact budgets must be approved after target hardware and scale are defined; this
document intentionally does not invent numbers.
