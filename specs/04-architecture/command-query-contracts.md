# Command and Query Contracts

## Example commands

- `CreateItem(parentId, position, kind, title)`
- `MoveItems(itemIds, destinationParentId, position)`
- `UpdateContent(itemId, baseRevision, operations)`
- `SetMetadata(itemIds, field, value)`
- `TrashItems(itemIds)`
- `RestoreItems(itemIds, destination)`
- `CreateSnapshot(itemId, label)`
- `Compile(projectRevision, selection, formatId, outputType)`

## Example queries

- `GetChildren(parentId, sort=projectOrder)`
- `GetItem(itemId)`
- `Search(query, scope, fields)`
- `GetCompilePreview(selection, formatId)`

Every mutating command returns a new project revision or a typed conflict/error.
