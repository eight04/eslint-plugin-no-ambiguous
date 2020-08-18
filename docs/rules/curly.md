no-ambiguous/curly
==================

This rule forces you to escape curly braces `{}` in template literals. It helps you detect missing dollar signs.

Rules details
-------------

Examples of **incorrect** code for this rule:

```js
`${foo}{bar}`;
`foo {bar}`;
`foo @{bar}`;
```

Examples of **correct** code for this rule:

```js
`${foo}\{bar\}`;
`foo ${bar}`;
```
