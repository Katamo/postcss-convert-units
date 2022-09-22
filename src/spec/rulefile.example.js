
// Example set of rules to be passed to the plugin
const rules = {
  "--sp": val => `${val * 0.25}rem`,
  "--xs": () => `1rem 1rem`
}

export default rules;