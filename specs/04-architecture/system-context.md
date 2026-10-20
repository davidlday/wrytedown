# System Context

## Actors

- Author
- Editor/reviewer using the same local project
- Operating-system file services
- Optional cloud-file provider
- Import/export consumer applications

## Logical components

- Desktop shell and workspace UI
- Project application service
- Editor engine
- Search index
- Import pipeline
- Compile/export pipeline
- Persistence and migration layer
- Backup/recovery service

## Trust boundaries

- Project files are user-controlled input.
- Imported documents and web archives are untrusted.
- External sync tools may modify project files outside the application.
- Export destinations may be unavailable or partially writable.
