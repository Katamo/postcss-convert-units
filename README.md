# Post-Convert-Units: PostCSS plugin to convert custom units

This is a PostCSS plugin 
<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">
To allow custom property unit values. 

## Motivation 
Main motivation came from this dissusion draft on W3C CSS working group 
[css-variables-2 Custom units as simple variable desugaring](https://github.com/w3c/csswg-drafts/issues/7379)

## Use Cases

### custom spacing units
The goal here is allow to have custom units like a `--sp` (spacing unit) equivalent to a `0.25rem` or `4px`.\
This would allow you also to define different vertical and horizontal spacing units.

### work with pixels deliver your css in rems 
Lots of developers prefers to translate designs to code by using pixels for distances.\
Accesibility methodologies encourages the use of rems for common units.\
We can use this plugin to work directly with px units and translate to rem in build time.

> Note: It's made specifically for Deno the relevant code is in mod.ts, and that file is imported from Deno.

## Usage

Import the postCSS core
```typesecript
import postcss from "https://deno.land/x/postcss@8.4.16/mod.js";
```

Define the unit transforms as an array of transforms of the opts object, in the following way:
```typescript
const opts = {
  rules: [
    { unitName: "--sp", convert: (val: number) => `${val * 0.25}rem` }
  ],
};
```

Add the plugin with the transforms the postcss process
```typescript
  const result = await postcss(
    [plugin(opts)]).process(input);
```

This will transform your css files from:
```css
  /* Input css file */
  a{ margin: 4--sp;}
```

To this.
```css
  /* Output css file */
  a{ margin: 1rem;}
```
## License

[MIT](LICENSE)