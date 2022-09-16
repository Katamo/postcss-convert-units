import { assertEquals } from "https://deno.land/std@0.155.0/testing/asserts.ts";
import postcss from "https://deno.land/x/postcss@8.4.16/mod.js";

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
  const result = await postcss([plugin(opts)]).process(input);

  assertEquals(result.css, output);
  assertEquals(result.warnings().length, 0);
}

Deno.test("uses custom convert function and units", async () => {
  await run(
    "a{ margin: 4--pw;}",
    "a{ margin: 1rem;}",
    {
      rules: [{ unitName: "--pw", convert: (val: number) => `${val * 0.25}rem` }],
    },
  );
});

Deno.test("uses multiple custom convert function and units", async () => {
  await run(
    "a{ margin: 1--sp 1sp;}",
    "a{ margin: 0.25rem 1rem;}",
    {
      rules: [
        { unitName: "--sp", convert: (val: number): string => `${val * 0.25}rem` },
        { unitName: "sp", convert: (val: number): string => `${val}rem` },
      ],
    },
  );
});
