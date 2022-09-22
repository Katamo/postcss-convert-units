// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const plugin = (opts)=>{
    return {
        postcssPlugin: "postcss-convert-units",
        Declaration: {
            "*": (decl)=>{
                let str = decl.value;
                Object.entries(opts.rules).forEach(([key, value])=>{
                    const regex = new RegExp(`(([\\d.]+)?(${key})(?![a-zA-Z0-9_\-]))`, "g");
                    str = str.replace(regex, (_match, _p1, _p2, _p3, _p4)=>{
                        return value(parseInt(_p2));
                    });
                });
                decl.value = str;
            }
        }
    };
};
plugin.postcss = true;
export { plugin as default };
