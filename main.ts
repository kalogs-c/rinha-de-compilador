import { calculate } from "./binary";
import { ASTFile, Term } from "./nodes";

const file = Bun.file("./rinha/if.json");
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
      console.log(value);
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
