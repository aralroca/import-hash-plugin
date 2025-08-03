import { test, describe, expect } from "bun:test";
import { transpile } from ".";

describe("Import HASH file", () => {
  test("it should transform the import to hash", () => {
    const input = 'import hash from "/some" with { type: "hash" }';
    const output = transpile(input);
    const expected = minifyText(`
      import _file_to_hash0 from "/some" with { type: "text" };
      const hash = Bun.hash(_file_to_hash0);
    `);

    expect(minifyText(output)).toBe(expected);
  });

  test("it should multiple transforms the import to hashs", () => {
    const input = `
        import foo from "/foo" with { type: "hash" };
        import bar from "/bar" with { type: "hash" };
    `
    const output = transpile(input);
    const expected = minifyText(`
      import _file_to_hash0 from "/foo" with { type: "text" };
      import _file_to_hash1 from "/bar" with { type: "text" };
      const foo = Bun.hash(_file_to_hash0);
      const bar = Bun.hash(_file_to_hash1);
    `);

    expect(minifyText(output)).toBe(expected);
  });
});

function minifyText(text: string) {
  return text.replace(/\s+/g, " ").trim();
}
