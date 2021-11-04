# Front Matter to JSON Action

Parse the front matter of files in a directory into a JSON array.

This action outputs a JSON array which can be commited as a file, and is useful for CI purposes.

## Inputs

### `input-directory`

**Required** The path to the directory containing files with front matter.

### `content-field`

The name of the field containing everything after the front matter. Defaults to `content`

## Outputs

### `output`

The JSON array containing the front matter and content.

It's shape will look like this:

```json
[
  {
    "frontmatter1": "value",
    "frontmatter2": "value",
    "frontmatterN": "value",
    "content": "content"
  },
  {
    "frontmatter1": "value",
    "frontmatter2": "value",
    "frontmatterN": "value",
    "content": "content"
  },
  ...
]
```

## Example usage

```yaml
uses: actions/checkout@v2
uses: yzalvin/action-yaml-front-matter@v1
with:
  input-directory: './demo'
  content-field: 'description'
```
