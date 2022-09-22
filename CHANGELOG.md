# Change Log

## 2.0
* Changed the rule format.
  rules are now defined as an object {"rule": ()=>{}} 
  This is a breaking change on the plugin behavior and the consuming data, this means mayor bump version.

* Added rule file for config.
  Now can pass external rulefiles to add multiple rules to the parser.

* Added more tests.
  Now test cover the following cases:
  * uses multiple custom convert function and units
  * import file, uses rules from imported file
  * import file, uses rules from imported file and merge with current rules
  * works with nested rules
  * works with nested rule with shared name
  * converts to css vars
  * converts to css vars with shared name
  * converts to css vars with value
  * converts to css vars with css vars
  * converts to css vars with css vars and values

* Added test watch command
  Now we can launch test in watch mode.
## 1.0
* Initial release.