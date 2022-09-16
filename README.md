# Post-Convert-Units: PostCSS plugin to convert custom units

This is a PostCSS plugin 
[<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">][postcss]
To allow custom property unit values. 

Main motivation came from this dissusion draft on W3C CSS working group 
[https://github.com/w3c/csswg-drafts/issues/7379](css-variables-2 Custom units as simple variable desugaring)

The goal here is allow to have custom units like a --sp (spacing unit) equivalent to a 0.25rem or 4px.
This would allow you also to define different vertical and horizontal spacing units.

Also we can use this plugin to work directly with px units and translate to rem on build time.

> Note: It's made specifically for Deno the relevant code is in mod.ts, and that file is imported from Deno.

## Usage

Import the postCSS core
```typesecript
import postcss from "https://deno.land/x/postcss@8.4.16/mod.js";
```

Define the unit transforms as an array of transforms of the opts object, in the following way:
```typescript
const opts = {
  units: [
    { from: "--sp", convert: (val: number) => `${val * 0.25}rem` }
  ],
};
```

Add the plugin with the transforms the postcss process
```typescript
  const result = await postcss(
    [plugin(opts)]).process(input, {
    from: undefined,
  });
```

This will transform your css files from 
```css
  /* Input css file */
  a{ margin: 4--sp;}

  /* Output css file */
  a{ margin: 1rem;}
```
## License

[MIT](LICENSE)