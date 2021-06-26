const Helper = require('./Helper')

const helper = new Helper()

/*
 * Fibonacci
 */

// classic recursion
const _fib = (n) => {
    if (n <= 2) return 1
    return _fib( n - 1 ) + _fib( n - 2 )
} // O(2^n) time, O(n) space


// memoization of fibonacci
const _fibMemo = (n, memo={}) => {
    if (n <= 2) return 1
    if (n in memo) return memo[n]

    memo[n] = _fibMemo( n - 1, memo ) + _fibMemo( n - 2, memo ) // don't worry, default copy is by reference
    return memo[n]
} // O(n) time, O(n) space


// tebulization of fibonacci
const _fibTabu = (n) => {
    const table = Array(n + 1).fill(0)
    table[1] = 1

    for (let i = 2; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2]
    }

    return table[n]
}


/*
 * Test
 */

const fib = (n, mode) => {
    if (Number.isInteger(n) && n > 0) {
        if (mode === 'classic') return _fib(n)
        if (mode === 'memo') return _fibMemo(n)
        if (mode === 'tabu') return _fibTabu(n)
    } else {
        console.log("not a legal input")
    }
}

const testList = [0, 10, 20, 30, 40, 45, 50]

helper.testFunc(fib, [testList, mode='tabu'])
helper.testFunc(fib, [testList, mode='memo'])
helper.testFunc(fib, [testList, mode='classic'])



