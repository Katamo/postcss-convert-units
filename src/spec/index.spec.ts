import { assertEquals } from "https://deno.land/std@0.155.0/testing/asserts.ts";
import postcss from "https://deno.land/x/postcss@8.4.16/mod.js";

import plugin, { optsType } from "../index.ts";

async function run(
  input: string,
  output: string,
  opts?: optsType,
) {
  const result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });

  assertEquals(result.css, output);
  assertEquals(result.warnings().length, 0);
}

Deno.test("converts sp to rem by default", async () => {
  await run(
    "a{ margin: 1sp;}",
    "a{ margin: 0.25rem;}",
  );
});

Deno.test("uses custom convert function and units", async () => {
  await run(
    "a{ margin: 1pw;}",
    "a{ margin: 0.25rem;}",
    {
      units: [{ from: "pw", convert: (val: number) => `${val * 0.25}rem` }],
    },
  );
});

Deno.test("uses multiple custom convert function and units", async () => {
  await run(
    "a{ margin: 1pw 1sp;}",
    "a{ margin: 0.25rem 1rem;}",
    {
      units: [
        { from: "pw", convert: (val: number): string => `${val * 0.25}rem` },
        { from: "sp", convert: (val: number): string => `${val}rem` },
      ],
    },
  );
});
