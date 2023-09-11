export type Term = Print | Str | Int | Var | Function | Call | Let | Binary | Tuple | First | Second | Bool | If;

export interface ASTFile {
  name: string;
  expression: Term;
  location: Location;
}

export interface Location {
  start: number;
  end: number;
  filename: string;
}

export interface Parameter {
  text: string;
  location: Location;
}

export interface Var {
  kind: "Var";
  text: string;
  location: Location;
}

export interface Function {
  kind: "Function";
  parameters: Parameter[];
  value: Term;
  location: Location;
}

export interface Call {
  kind: "Call";
  callee: Term;
  arguments: Term[];
  location: Location;
}

export interface Let {
  kind: "Let";
  name: string;
  value: Term;
  next: Term;
  location: Location;
}

export interface Str {
  kind: "Str";
  value: string;
  location: Location;
}

export interface Int  {
  kind: "Int";
  value: number;
  location: Location;
}

export type BinaryOp = "Add" | "Sub" | "Mul" | "Div" | "Rem" | "Eq" | "Neq" | "Lt" | "Gt" | "Lte" | "Gte" | "Or" | "And";

export interface Bool {
  kind: "Bool";
  value: boolean;
  location: Location;
}

export interface If {
  kind: "If";
  condition: Term;
  then: Term;
  otherwise: Term;
  location: Location;
}

export interface Binary {
  kind: "Binary";
  op: BinaryOp;
  lhs: Term;
  rhs: Term;
  location: Location;
}

export interface Tuple  {
  kind: "Tuple";
  first: Term;
  second: Term;
  location: Location;
}

export interface First {
  kind: "First";
  value: Term;
  location: Location;
}

export interface Second {
  kind: "Second";
  value: Term;
  location: Location;
}

export interface Print {
  kind: "Print";
  value: Term;
  location: Location;
}
