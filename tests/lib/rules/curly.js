const {RuleTester} = require("eslint");
const rule = require("../../../lib/rules/curly");

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2020
  }
});

tester.run("curly", rule, {
  valid: [
    {
      code: "var foo = `foo ${bar}`"
    },
    {
      code: "var foo = `foo \\{bar\\}`"
    },
    {
      code: "var foo = `foo {{bar}}`"
    },
    {
      code: "var foo = String.raw`foo {bar}`"
    }
  ],
  invalid: [
    {
      code: "var foo = `foo {bar}`",
      errors: [{messageId: "ambiguousCurly"}, {messageId: "ambiguousCurly"}],
      output: "var foo = `foo \\{bar\\}`"
    },
    {
      code: "var foo = `foo #{bar}`",
      errors: [{messageId: "ambiguousCurly"}, {messageId: "ambiguousCurly"}],
      output: "var foo = `foo #\\{bar\\}`"
    }
  ]
});
