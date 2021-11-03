# yaml-front-matter action

This action creates a json array of objects from markdown metadata.

## Inputs

## `input-directory`

**Required** The path to the directory containing markdown files.

## Outputs

## `output`

The JSON array containing metadata.

## Example usage

uses: actions/checkout@v2
uses: yzalvin/action-yaml-front-matter@v1
with:
  input-directory: './demo'
