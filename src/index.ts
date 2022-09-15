import Declaration from "https://deno.land/x/postcss@8.4.16/lib/declaration.d.ts";

export type unitType = {
  from: string;
  convert: (val: number) => string;
};

export interface optsType {
  units: unitType[];
}

const plugin = (opts?: optsType) => {
  let myUnits: unitType[] = [];

  if (!opts || !opts.units) {
    myUnits.push(
      {
        from: "sp",
        convert: (val) => `${val * 0.25}rem`,
      },
    );
  } else {
    myUnits = [...opts.units];
  }

  return {
    postcssPlugin: "postcss-convert-units",

    Declaration: {
      "*": (decl: Declaration) => {
        myUnits.forEach(
          (unit) => {
            const regex = new RegExp("(([\\d.]+)" + unit.from + ")", "g");

            decl.value = decl.value.replace(
              regex,
              (_match: string, _p1: string, p2: string) =>
                unit.convert(parseInt(p2)),
            );
          },
        );
      },
    },
  };
};
plugin.postcss = true;

export default plugin;
