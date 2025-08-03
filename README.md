# Import Hash Plugin

A basic Bun plugin designed to demonstrate how Abstract Syntax Trees (ASTs) work in JavaScript tooling. This project was created for educational purposes to accompany a YouTube tutorial on AST manipulation.

## Purpose

This plugin serves as a teaching tool to show:

- How plugins interact with the AST
- Visualizing AST structures
- Basic AST traversal and modification
- Basic example of AST transformations
- The role of ASTs in JavaScript bundlers

## Current Status

⚠️ **Not published to NPM** - This is a minimal implementation intended for educational demonstrations only. The code is in a basic state and not production-ready.

[Meriyah](https://github.com/meriyah/meriyah) transforms from JS to JS, not from TS to JS. For this you can use Bun's built-in transpiler: `Bun.Transpile` _(But it has bugs with the import attributes_)_.

## Installation and Testing

To experiment with this plugin locally:

1. Clone the repository:
    
```sh
git clone git@github.com:aralroca/import-hash-plugin.git
cd import-hash-plugin
```

2. Run the example:
    
```sh
bun run example.js
```    

## License

[MIT] - Feel free to use this code for learning purposes.
