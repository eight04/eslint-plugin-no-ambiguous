module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "force escaping curly braces in template literal",
      category: "Possible Errors",
      recommended: true,
      url: "https://github.com/eight04/eslint-plugin-no-ambiguous/blob/master/docs/rules/curly.md",
      suggestion: true
    },
    fixable: "code",
    messages: {
      ambiguousCurly: "Curly in template literal should be escaped explicitly"
    }
  },
  create: context => {
    const sourceCode = context.getSourceCode();
    
    function report(node, offset) {
      const rangeStart = sourceCode.getIndexFromLoc(node.loc.start) + offset;
      const start = sourceCode.getLocFromIndex(rangeStart);
      context.report({
        node,
        loc: {
          start,
          end: {
            line: start.line,
            column: start.column + 1
          }
        },
        messageId: "ambiguousCurly",
        fix: fixer => {
          return fixer.insertTextBeforeRange([rangeStart, rangeStart + 1], "\\");
        }
      });
    }
    
    return {
      TemplateLiteral: node => {
        const parent = context.getAncestors().pop();
        if (parent && parent.type === "TaggedTemplateExpression") {
          return;
        }
        
        node.quasis.forEach((el, i) => {
          const string = el.value.raw;
          const rx = /\\[{}]|([{}])\1*/g;
          let match;
          
          while ((match = rx.exec(string))) {
            if (match[0].length > 1) continue;
            
            report(el, match.index + (i === 0 ? 1 : 0)); // skip the first '`' in the first element
          }
        });
      }
    };
  }
};
