import { plugin, type BunPlugin, type JavaScriptLoader } from "bun";
import { generate } from "astring";
import { parseScript } from "meriyah";

const importHASHPlugin: BunPlugin = {
  name: "Import HASH",
  setup(build) {
    build.onLoad(
      { filter: /\.(ts|tsx|js|jsx)$/ },
      async ({ loader, path }) => ({
        contents: transpile(await Bun.file(path).text()),
        loader,
      }),
    );
  },
};

export function transpile(code: string): string {
  const ast = parseScript(code, {
    jsx: true,
    module: true,
    next: true,
  });

  const originalVariables: string[] = [];
  const variables: string[] = [];
  let count = 0;
  let index = 0;

  for (; index < ast.body.length; index += 1) {
    const item = ast.body[index]!;
    const isImport = item.type === "ImportDeclaration";

    if (
      isImport &&
      item.attributes.some(
        ({ key, value }) =>
          key.type === "Identifier" &&
          key.name === "type" &&
          value.type === "Literal" &&
          value.value === "hash",
      )
    ) {
      const name = `_file_to_hash${count++}`;

      originalVariables.unshift(
        item.specifiers.find(({ local }) => local.type === "Identifier")!.local
          .name,
      );
      variables.unshift(name);
      item.specifiers = [
        {
          type: "ImportDefaultSpecifier",
          local: { name, type: "Identifier" },
        },
      ];
      item.attributes = [
        {
          type: "ImportAttribute",
          key: {
            type: "Identifier",
            name: "type",
          },
          value: {
            type: "Literal",
            value: "text",
          },
        },
      ];
    }

    if (!isImport) {
      break;
    }
  }

  variables.forEach((variable, i) => {
    ast.body.splice(
      index,
      0,
      parseScript(`const ${originalVariables[i]} = Bun.hash(${variable});`)
        .body[0]!,
    );
  });

  return generate(ast);
}

plugin(importHASHPlugin);
