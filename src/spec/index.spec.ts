import { assertEquals } from "https://deno.land/std@0.155.0/testing/asserts.ts";
import postcss from "https://deno.land/x/postcss@8.4.16/mod.js";

import importedRules from './rulefile.example.js';
import plugin, { optsType } from "../mod.ts";

/**
 * Helper function to execute plugin, process css string and trigger tests
 * 
 * @param input // unprocessed css string
 * @param output // processed css string
 * @param opts // options for plugin, gget a default conversion if no rule passed
 */
async function run(
  input: string,
  output: string,
  opts: optsType,
) {
  const result = await postcss([plugin(opts)]).process(input, {from: undefined});

  assertEquals(result.css, output);
  assertEquals(result.warnings().length, 0);
}

Deno.test("uses custom convert function and units", async () => {
  await run(
    "a{ margin: 4--pw;}",
    "a{ margin: 1rem;}",
    {
      rules: {"--pw": (val:number) => `${val * 0.25}rem` },
    },
  );
});

Deno.test("uses multiple custom convert function and units", async () => {
  await run(
    "a{ margin: 1--sp; padding: --xs;}",
    "a{ margin: 0.25rem; padding: a complex string;}",
    {
      rules: {
        "--sp": (val: number): string => `${val * 0.25}rem` ,
        "--xs": (): string => `a complex string` ,
      },
    },
  );
});

Deno.test("import file, uses rules from imported file", async () => {
  await run(
    "a{ margin: 1--sp; padding: --xs;}",
    "a{ margin: 0.25rem; padding: 1rem 1rem;}",
    {
      rules: {
        ...importedRules,
      },
    },
  );
});

Deno.test("import file, uses rules from imported file and merge with current rules", async () => {
  await run(
    "a{ margin: 1--sp; padding: --xs; border: --border;}",
    "a{ margin: 0.25rem; padding: 1rem 1rem; border: 1px solid #000;}",
    {
      rules: {
        "--border": (): string => `1px solid #000` ,
        ...importedRules,
      },
    },
  );
});

Deno.test("works with nested rules", async () => {
  await run(
    "a{border: --border;}",
    "a{border: 3px solid #000;}",
    {
      rules: {
        "--border": (): string => `3--sp solid #000` ,
        "--sp": (val: number): string => `${val}px` ,
      },
    },
  );
});

Deno.test("works with nested rule with shared name", async () => {
  await run(
    "a{border: --border;}",
    "a{border: 3px solid #000;}",
    {
      rules: {
        "--border": (): string => `3--border-xs solid #000` ,
        "--border-xs": (val: number): string => `${val}px` ,
      },
    },
  );
});

Deno.test("converts to css vars", async () => {
  await run(
    "a{margin: --margin;}",
    "a{margin: var(--xs);}",
    {
      rules: {
        "--margin": (): string => `var(--xs)`,
      },
    },
  );
});

Deno.test("converts to css vars with shared name", async () => {
  await run(
    "a{margin: --margin;}",
    "a{margin: var(--margin-xs);}",
    {
      rules: {
        "--margin": (): string => `var(--margin-xs)`,
      },
    },
  );
});

Deno.test("converts to css vars with value", async () => {
  await run(
    "a{border: --border;}",
    "a{border: 4px solid #000;}",
    {
      rules: {
        "--border": (): string => `1--sp solid #000` ,
        "--sp": (val: number): string => `${val * 4}px` ,
      },
    },
  );
});

Deno.test("converts to css vars with css vars", async () => {
  await run(
    "a{border: var(--border) 1px;}",
    "a{border: var(--border-sp) 1px;}",
    {
      rules: {
        "--border": (): string => `--border-sp`,
      },
    },
  );
});

Deno.test("converts to css vars with css vars and values", async () => {
  await run(
    "a{border: var(--border) 1px;}",
    "a{border: var(1--border-sp) 1px;}",
    {
      rules: {
        "--border": (): string => `1--border-sp`,
      },
    },
  );
});
