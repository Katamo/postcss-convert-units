// Type used by plugin custom declarations
import Declaration from "https://deno.land/x/postcss@8.4.16/lib/declaration.d.ts";

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
 * This function is passed to postcss and returns the rules being applied to css transformations
 *
 * @param opts the configuration options
 * @returns Object the plugin name and process rules
 */
const plugin = (opts: optsType) => {
  return {
    postcssPlugin: "postcss-convert-units",

    Declaration: {
      "*": (decl: Declaration) => {
        let str = decl.value;
        // console.log(decl);

        Object.entries(opts.rules).forEach(
          ([key, value]) => {
            // optionally a number followed by the key and not followed by any valid char more
            const regex = new RegExp(
              `(([\\d.]+)?(${key})(?![a-zA-Z0-9_\-]))`,
              "g",
            );

            str = str.replace(
              regex,
              (_match: string, _p1: string, _p2, _p3, _p4) => {
                return value(parseInt(_p2));
              },
            );
          },
        );

        decl.value = str;
      },
    },
  };
};

plugin.postcss = true;

export default plugin;
