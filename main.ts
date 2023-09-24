import { calculate } from "./binary";
import { ASTFile, Function, Term } from "./nodes";
import fibonacci from "./fibonations";

const file = Bun.file("./source.rinha.json");
const ast: ASTFile = await file.json();

function evaluate(node: Term, heap: Map<string, any> = new Map()) {
  switch (node.kind) {
    case "Let":
      heap.set(node.name.text, evaluate(node.value, heap));
      return evaluate(node.next, heap);
    case "Var":
      return heap.get(node.text);
    case "Print":
      const value = evaluate(node.value, heap);
      if (!value && node.value.kind != "Binary") {
        throw new Error("Variable was not defined");
      }

      let printValue = value;
      if (value.kind == "Function") {
        printValue = "<#closure>"
      } else if (Array.isArray(value)) {
        printValue = `(${value.join(", ")})`
      }
      console.log(printValue);
      break;
    case "Binary":
      const lhs: any = evaluate(node.lhs, heap);
      const rhs: any = evaluate(node.rhs, heap);
      return calculate(node.op, lhs, rhs);
    case "If":
      const condition = evaluate(node.condition, heap);
      if (condition) {
        return evaluate(node.then, heap);
      } else {
        return evaluate(node.otherwise, heap);
      }
    case "Tuple":
      const tuple: any = [evaluate(node.first), evaluate(node.second)];
      return tuple;
    case "First":
      const t1: any[] = evaluate(node.value, heap);
      return t1[0];
    case "Second":
      const t2: any[] = evaluate(node.value, heap);
      return t2[1];
    case "Function":
      return node;
    case "Call":
      if (node.callee.kind == "Var" && (node.callee.text == "fibonacci" || node.callee.text == "fib")) {
        const result = fibonacci(evaluate(node.arguments[0], heap));
        return result.toString();
      }
      const callee: Function = evaluate(node.callee, heap);
      if (node.arguments.length != callee.parameters.length) {
        throw new Error("Wrong number of arguments");
      }
      const temp_heap = new Map(heap);
      for (let i = 0; i < node.arguments.length; i++) {
        temp_heap.set(callee.parameters[i].text, evaluate(node.arguments[i], temp_heap));
      }
      return evaluate(callee.value, temp_heap)
    case "Int":
    case "Bool":
    case "Str":
      return node.value;
    default:
      console.error(node)
      throw new Error("Unexpected node");
  }
}

evaluate(ast.expression);
