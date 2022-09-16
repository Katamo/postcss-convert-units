// Type used by plugin custom declarations
import Declaration from "https://deno.land/x/postcss@8.4.16/lib/declaration.d.ts";

/**
 * type for transformation format
 */
export type ruleType = {
  unitName: string;
  convert: (val: number) => string;
};

/**
 * type for options passed to plugin
 */
export interface optsType {
  rules: ruleType[];
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
        opts.rules.forEach(
          (rule) => {
            const regex = new RegExp(`(([\\d.]+)${rule.unitName})`, "g");

            decl.value = decl.value.replace(
              regex,
              (_match: string, _p1: string, p2: string) =>
                rule.convert(parseInt(p2)),
            );
          },
        );
      },
    },
  };
};

plugin.postcss = true;

export default plugin;
