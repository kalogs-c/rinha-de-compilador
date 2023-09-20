function fibonacci(n: number): bigint {
  if (n > 1000) return fibonacciMatrixBigint(n);

  if (n > 80) return fibonacciIterativeBigint(n);

  return BigInt(fibonacciBinetBigint(n));
}

function fibonacciBinetBigint(n: number): number {
  const sqRootOf5 = Math.sqrt(5);

  const Phi = (1 + sqRootOf5) / 2;
  const phi = (1 - sqRootOf5) / 2

  return Math.round((Math.pow(Phi, n) - Math.pow(phi, n)) / sqRootOf5);
}

function fibonacciMatrixBigint(n: number): bigint {
  if (n <= 1) return BigInt(n);

  function multiplyMatrix(a: [bigint, bigint, bigint, bigint], b: [bigint, bigint, bigint, bigint]): [bigint, bigint, bigint, bigint] {
    const [a11, a12, a21, a22] = a;
    const [b11, b12, b21, b22] = b;

    const c11 = a11 * b11 + a12 * b21;
    const c12 = a11 * b12 + a12 * b22;
    const c21 = a21 * b11 + a22 * b21;
    const c22 = a21 * b12 + a22 * b22;

    return [c11, c12, c21, c22];
  }

  function matrixPower(matrix: [bigint, bigint, bigint, bigint], exponent: number): [bigint, bigint, bigint, bigint] {
    if (exponent === 1) return matrix;
    if (exponent % 2 === 0) {
      const halfPower = matrixPower(matrix, exponent / 2);
      return multiplyMatrix(halfPower, halfPower);
    } else {
      const halfPower = matrixPower(matrix, (exponent - 1) / 2);
      const squaredHalfPower = multiplyMatrix(halfPower, halfPower);
      return multiplyMatrix(matrix, squaredHalfPower);
    }
  }

  const baseMatrix: [bigint, bigint, bigint, bigint] = [1n, 1n, 1n, 0n];
  const resultMatrix = matrixPower(baseMatrix, n - 1);

  return resultMatrix[0];
}

function fibonacciIterativeBigint(n: number): bigint {
  if (n <= 1) return BigInt(n);

  let prev = BigInt(0);
  let current = BigInt(1);

  for (let i = 2; i <= n; i++) {
    const temp = current;
    current += prev;
    prev = temp;
  }

  return current;
}

export default fibonacci;