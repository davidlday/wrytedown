# Project Aggregate

## Aggregate root

`Project`

## Entities

- `ProjectItem(id, parentId, orderKey, kind, title, textRef)`
- `Collection(id, name, mode, itemRefs|query)`
- `Bookmark(id, target)`
- `Snapshot(id, itemId, contentRef, createdAt, label)`
- `CompileFormat(id, name, schemaVersion, rules)`

## Value objects

- `ItemMetadata`
- `LabelDefinition`
- `StatusDefinition`
- `CustomFieldDefinition`
- `EditorLocation`
- `LayoutState`

## Invariants

1. Item identifiers are unique within a project.
2. Parent references form an acyclic rooted forest under system roots.
3. Sibling ordering is total and deterministic.
4. Every item reference resolves or is explicitly marked broken.
5. Draft, Research, and Trash system roots cannot be accidentally deleted.
