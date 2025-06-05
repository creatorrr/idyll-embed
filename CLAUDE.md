# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

idyll-embed is a JavaScript library that bundles the Idyll runtime for embedding interactive Idyll documents directly into HTML pages. It provides a single minified script that can be included via a script tag, exposing global `Idyll` and `IdyllComponents` objects.

## Commands

### Build
```bash
npm run build
```
Builds the project using webpack, creating `dist/idyll-embed.min.js`.

### Development
```bash
npm install
```
Install all dependencies before development.

## Architecture

The project has a simple architecture centered around bundling Idyll for browser use:

1. **Entry Point**: `index.js` imports Idyll, React, and ReactDOM, then creates the global API:
   - `Idyll.render(markup, container, options)` - Renders Idyll markup
   - `Idyll.registerComponent(name, component)` - Registers custom components
   - `window.IdyllComponents` - Exposes all built-in Idyll components

2. **Build Process**: Webpack bundles everything into a single minified file, using Babel to transpile JSX and modern JavaScript.

3. **Usage Pattern**: Users include the script, create a container div, and call `Idyll.render()` with their markup.

## Key Dependencies

- **idyll**: 5.x (core framework)
- **React/ReactDOM**: Bundled as Idyll's rendering engine
- **Webpack 4**: Build tooling
- **Babel**: JavaScript transpilation

## Important Notes

- The project was recently modernized to Idyll 5.x
- No test framework is currently set up
- The dist folder contains the built output
- Legacy build tools (browserify, uglify-js) are present in package.json but webpack is the primary build system