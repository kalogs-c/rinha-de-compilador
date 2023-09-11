import { ASTFile, Term } from "./nodes";

const file = Bun.file("./rinha/bool.json");
const ast: ASTFile = await file.json();

function evaluate(node: Term, heap: Map<string, any> = new Map()) {
  switch (node.kind) {
    case "Var":
      return heap.get(node.text);
    case "Print":
      const value = evaluate(node.value, heap);
      console.log(value);
      break;
    case "Binary":
      const lhs: any = evaluate(node.lhs, heap);
      const rhs: any = evaluate(node.rhs, heap);
      switch (node.op) {
        case "Add":
          return lhs + rhs;
        case "Sub":
          return lhs - rhs;
        case "Mul":
          return lhs * rhs;
        case "Div":
          return lhs / rhs;
        case "Rem":
          return lhs % rhs;
        case "Eq":
          return lhs === rhs;
        case "Neq":
          return lhs !== rhs;
        case "Lt":
          return lhs < rhs;
        case "Gt":
          return lhs > rhs;
        case "Lte":
          return lhs <= rhs;
        case "Gte":
          return lhs >= rhs;
        case "Or":
          return lhs || rhs;
        case "And":
          return lhs && rhs;
        default:
          throw new Error("Unexpected op: " + node.op);
      }
    case "Int":
    case "Bool":
    case "Str":
    case "Function":
      return node.value;
    default:
      console.error(node)
      throw new Error("Unexpected node");
  }
}

evaluate(ast.expression);
