# Logical Schema Draft

```yaml
project:
  id: uuid
  title: string
  schemaVersion: semver
  roots:
    draft: item-id
    research: item-id
    trash: item-id
items:
  item-id:
    parentId: item-id|null
    orderKey: string
    kind: text|folder|media|link
    title: string
    contentRef: string|null
    metadataRef: metadata-id
metadata:
  metadata-id:
    synopsis: string
    notes: string
    labelId: string|null
    statusId: string|null
    includeInCompile: boolean
    custom: map
```

This is a logical schema only. Physical storage requires an ADR.
