// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const plugin = (opts)=>{
    return {
        postcssPlugin: "postcss-convert-units",
        Declaration: {
            "*": (decl)=>{
                opts.rules.forEach((rule)=>{
                    const regex = new RegExp(`(([\\d.]+)${rule.unitName})`, "g");
                    decl.value = decl.value.replace(regex, (_match, _p1, p2)=>rule.convert(parseInt(p2)));
                });
            }
        }
    };
};
plugin.postcss = true;
export { plugin as default };
