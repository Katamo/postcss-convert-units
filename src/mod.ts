// Type used by plugin custom declarations
import Declaration from "https://deno.land/x/postcss@8.4.16/lib/declaration.d.ts";
import AtRule from "https://deno.land/x/postcss@8.4.16/lib/at-rule.d.ts";

/**
 * type for transformation format
 */
export type ruleType = Record<
  string,
  (((val: number) => string) | (() => string))
>;

/**
 * type for options passed to plugin
 */
export interface optsType {
  rules: ruleType;
}

/**
 * Applies the transform rules for the input matching the extract regex
 *
 * @param rules the set of rules to match
 * @param input the value to try the matching regex
 * @returns transformed input
 */
const parser = (rules: ruleType, input: string) => {
  let output = input;
  Object.entries(rules).forEach(
    ([key, value]) => {
      // optionally a number followed by the key and not followed by any valid char more
      const regex = new RegExp(
        `(([\\d.]+)?(${key})(?![a-zA-Z0-9_\-]))`,
        "g",
      );

      output = output.replace(
        regex,
        (_match: string, _p1: string, _p2, _p3, _p4) => {
          return value(parseInt(_p2));
        },
      );
    },
  );

  return output;
};

/**
 * This function is passed to postcss and returns the rules being applied to css transformations
 *
 * @param opts the configuration options
 * @returns Object the plugin name and process rules
 */
const plugin = (opts: optsType) => {
  return {
    postcssPlugin: "postcss-convert-units",

    AtRule: {
      "media": (atRule: AtRule) => {
        atRule.params = parser(opts.rules, atRule.params);
      },
    },

    Declaration: {
      "*": (decl: Declaration) => {
        decl.value = parser(opts.rules, decl.value);
      },
    },
  };
};

plugin.postcss = true;

export default plugin;
