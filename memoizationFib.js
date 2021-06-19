/*
 * Helper function for time and space monitoring
 */
class Helper {
    timeAndSpaceUsage(func, [...args]) {
        const startTime = Date.now()
        const res = func(...args)
        const endTime = Date.now()

        const memory = process.memoryUsage()
        const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024)} MB`

        const timeAndMemory = {
            timeUsage: `${endTime - startTime} ms`,
            rss: `${formatMemoryUsage(memory.rss)} -> Resident Set Size (total allocated for the process)`,
            heapTotal: `${formatMemoryUsage(memory.heapTotal)} -> total allocated heap`,
            heapUsed: `${formatMemoryUsage(memory.heapUsed)} -> actual used memory during the execution`,
            external: `${formatMemoryUsage(memory.external)} -> V8 external memory`,
        }
        console.log(timeAndMemory)

        return res
    }
}

const helper = new Helper()


/*
 * Fibonacci
 */

// classic recursion
const _fib = (n) => {
    if (n <= 2) return 1
    return _fib( n - 1 ) + _fib( n - 2 )
} // O(2^n) time, O(n) space

// memoization of fibonacci by dynamic programming
//      js object: key will be arg of func, val will be the return value
const _fibDynamic = (n, memo={}) => {
    if (n <= 2) return 1
    if (n in memo) return memo[n]

    memo[n] = _fibDynamic( n - 1, memo ) + _fibDynamic( n - 2, memo ) // don't worry, default copy is by reference
    return memo[n]
} // O(n) time, O(n) space

const fib = (n, mode) => {
    if (Number.isInteger(n) && n > 0) {
        if (mode === 'classic') return _fib(n)
        if (mode === 'dynamic') return _fibDynamic(n)
    } else {
        console.log("not a legal input")
    }
}

const testFib = (testList, mode='classic') => {
    console.log(`${mode} mode`)
    for (const n of testList) {
        console.log(`calculating ${n}th number...`)
        const res = helper.timeAndSpaceUsage(fib, [n, mode])
        console.log(`result: ${res}`)
    } 
}

const testList = [0, 10, 20, 30, 40, 45, 50]
testFib(testList, mode='classic')
testFib(testList, mode='dynamic')



