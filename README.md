# Post-Convert-Units: PostCSS plugin to convert custom units

This is a PostCSS plugin 
<img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS" width="90" height="90" align="right">
To allow custom property unit values. 

## Motivation 
Main motivation came from this dissusion draft on W3C CSS working group 
[css-variables-2 Custom units as simple variable desugaring](https://github.com/w3c/csswg-drafts/issues/7379)

## Use Cases.

### Custom spacing units.
The goal here is allow to have custom units like a `--sp` (spacing unit) equivalent to a `0.25rem` or `4px`.\
This would allow you also to define different vertical and horizontal spacing units.

### Work with pixels deliver your css in rems. 
Lots of developers prefers to translate designs to code by using pixels for distances.\
Accesibility methodologies encourages the use of rems for common units.\
We can use this plugin to work directly with px units and translate to rem in build time.\

### Examples.
Define numbers with units `margin-top: 4--sp;` transform it to `margin-top: 1rem;`

Define ordered values `background: 2--blue;` transform it to `background: #3333FF;`

Define @media queries `@media (min-width: --from-md)` transform it to `@media (min-width: 768px)`



> Note: It's made specifically for Deno the relevant code is in mod.ts, and that file is imported from Deno.

## Usage.

### Import postCSS.

Import the postCSS core

```typesecript
import postcss from "https://deno.land/x/postcss@8.4.16/mod.js";
```

### Define your set of rules.

Define the unit transforms as an array of transforms of the opts object, in the following way:
```typescript
const opts = {
  rules: {
    "1--sp", (val: number) => `${val * 0.25}rem`
  }
};
```

### Add the plugin to postCSS pipe.

Add the plugin with the transforms the postcss process.
```typescript
  const result = await postcss(
    [plugin(opts)]).process(input);
```

### Results.

This will transform your css files from:
```css
  /* Input css file */
  a{ margin: 4--sp;}
```

To this:
```css
  /* Output css file */
  a{ margin: 1rem;}
```


## Anatomy of a rule.
### Rules format.

`rules` is an object in the form of "rule" to apply and a transform function to be set as output.

### Rule definition.

The plugin will look for every rule defined in the rules object and will replace the value with the returned value from the transform function.\
The rule can store a number set on the rule string start, this value will be passed as a param to the transform function.\
In the following example: *the number 4* will be pased as a val to the transform function.

```typescript
const opts = {
  rules: {
    "4--border", (val: number) => `${val * 0.25}rem`
  }
};
```

### Transform function.

The transform function optionally receives a param `value: number` set on the rule start string.

### Define Rules in config files.

You can define several rulefiles following the regular format, just import them as js files and spread to the opts.rules object.
```typescript
import importedRules from './rulefile.example.js';

const opts = {
  rules: {
    ...importedRules,
  }
}
```

### Context of application

The rules can be applied in css prop values like: `margin: 1--sp` and `@media (--min-width)` @media elements.
## License.

[MIT](LICENSE)