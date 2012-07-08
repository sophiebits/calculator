var Calculator = (function(parser) {
    var CalculatorError = function(message) {
        this.message = message;
    };
    CalculatorError.prototype = new Error();
    CalculatorError.prototype.constructor = CalculatorError;

    return _.bindAll({
        parser: parser,
        parse: _.bind(parser.parse, parser),

        evaluate: function(tree, ans) {
            if (tree === "ans") {
                if (ans != null) {
                    return ans;
                } else {
                    throw new CalculatorError("Invalid variable ans");
                }
            } else if (_.isNumber(tree)) {
                return tree;
            } else if (_.isArray(tree)) {
                var fns = {
                    "+": function(a, b) { return a + b; },
                    "-": function(a, b) { return b == null ? -a : a - b; },
                    "*": function(a, b) { return a * b; },
                    "/": function(a, b) { return a / b; },
                    "^": function(a, b) { return Math.pow(a, b); },
                    "!": function f(a) { return a <= 1 ? 1 : a * f(a - 1); },
                    sqrt: function f(a) { return Math.pow(a, 0.5); }
                };

                if (tree[0] in fns) {
                    var self = this;
                    return fns[tree[0]].apply(
                        this, _.map(tree.slice(1), function(t) {
                            return self.evaluate(t, ans); }));
                } else {
                    throw new CalculatorError(
                        "Invalid function " + tree[0]);
                }
            } else {
                throw new CalculatorError(
                    "Invalid type " + Object.prototype.toString.call(tree));
            }
        },

        calculate: function(str, ans) {
            var tree = this.parse(str);
            return this.evaluate(tree, ans);
        }
    }, "evaluate", "calculate");
})(Calculator);
