/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts) => {
  let myUnits = [];

  if (!opts || !opts.units) {
    myUnits.push({
        from: 'sp',
        convert: val => `${val * 0.25}rem`
      }
    );
  } else {
    myUnits = [...opts.units];
  }

  return {
    postcssPlugin: 'postcss-space-unit',

    Declaration: {
      '*': (decl) => {
        myUnits.forEach(
          (unit) => {
            var regex = new RegExp('(([\\d.]+)' + unit.from + ')', 'g');

            decl.value = decl.value.replace(
              regex,
              (_match, _p1, p2) => unit.convert(p2),
            );
          }
        );
      }
    },
  }
}

module.exports.postcss = true
