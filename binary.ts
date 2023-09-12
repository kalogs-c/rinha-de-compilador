import { BinaryOp } from "./nodes";

export function calculate(op: BinaryOp, lhs: number, rhs: number) {
  switch (op) {
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
      throw new Error("Unexpected op: " + op);
  }
}
