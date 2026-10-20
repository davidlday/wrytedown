# Wrytedown User Manual

## Concept Hierarchy

```text
Project
│
├── Binder (organization)
│   ├── Documents (manuscript)
│   ├── Notes (working notes)
│   ├── Research (reference material)
│   └── Assets (images and media)
│
├── Compile Profiles (how to export)
├── Styles (how exports look)
├── Provenance (where content came from)
└── Corkboards (freeform visual oranization)
    ├── Manuscript Corkboard
    ├── Plot Corkboard
    ├── Character Corkboard
    └── Research Corkboard

```

Wrytedown is analogous to a physical writer’s binder:

- Project: the entire filing cabinet
- Binder: the table of contents
- Document: manuscript pages
- Note: sticky notes and annotations
- Asset: photographs, maps, illustrations, media
- Research: reference books and source materials
- Compile Profile: publishing instructions
- Style: formatting template
- Provenance: change history and source records
- Corkboards: free-form visual organization of documents, notes, research, and
  assets

### Project

A Project is the complete writing workspace stored in a single `.wryte` file. It
contains all manuscript content, notes, research materials, assets, settings,
and metadata needed to work on a writing project. The project is defined by
project.yaml and serves as the root container for everything else.

### Binder

A Binder is the project’s organizational structure. It is an ordered tree that
defines how documents, notes, research items, and folders are arranged. The
binder determines the logical structure of the manuscript and the order in which
content appears when compiling. It is stored in binder.yaml.

### Document

A Document is a piece of authored writing, typically stored as a single Markdown
file under documents/. A document may represent a chapter, scene, section,
article, or any other unit of writing. Documents are the primary content used
when producing a manuscript.

### Note

A Note is a Markdown-based text document used for reference information,
planning, comments, or supporting material. Notes may be attached to one or more
binder items and are usually not part of the final compiled manuscript. They are
stored under notes/.

### Asset

An Asset is a non-text resource used by the project, such as an image, audio
file, video clip, diagram, map, or reference illustration. Assets are typically
embedded or linked from documents and are stored under assets/.

### Research

Research is supporting background material collected for a project. Research may
include PDFs, articles, Markdown notes, images, bibliographic information, and
other reference resources. Research materials are usually consulted during
writing but are not automatically included in compiled output. They are stored
under research/.

### Compile Profile

A Compile Profile is a set of rules that tells Wrytedown how to produce an
output document from the binder. A compile profile determines which content to
include, in what order, and how it should be transformed or exported. Compile
profiles are stored under compile/profiles/.

### Style

A Style is a reusable formatting definition that controls how compiled content
should be presented. Styles can influence the appearance of exported documents
and provide a separation between manuscript content and publication formatting.
Styles are stored under styles/.

### Provenance

Provenance is historical and attribution information about a project. It records
where content came from, who created or modified it, how it was transformed, and
optionally AI-assisted generation history. Provenance data supports
transparency, auditing, and long-term project history. It is stored under
provenance/.

### Corkboard

A Corkboard is a visual workspace containing cards that represent Documents,
Notes, Research items, Assets, or custom planning objects. A corkboard allows
authors and editors to:

- organize material spatially
- group related items of different types
- visualize story structure
- track workflow status
- build timelines
- plan chapters and scenes
- map character relationships
- create editorial workflows
