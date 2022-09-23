// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const parser = (rules, input)=>{
    let output = input;
    Object.entries(rules).forEach(([key, value])=>{
        const regex = new RegExp(`(([\\d.]+)?(${key})(?![a-zA-Z0-9_\-]))`, "g");
        output = output.replace(regex, (_match, _p1, _p2, _p3, _p4)=>{
            return value(parseInt(_p2));
        });
    });
    return output;
};
const plugin = (opts)=>{
    return {
        postcssPlugin: "postcss-convert-units",
        AtRule: {
            "media": (atRule)=>{
                atRule.params = parser(opts.rules, atRule.params);
            }
        },
        Declaration: {
            "*": (decl)=>{
                decl.value = parser(opts.rules, decl.value);
            }
        }
    };
};
plugin.postcss = true;
export { plugin as default };
