const Helper = require('./Helper')

const helper = new Helper()

/*
 * Can Sum
 */

// classic recursion
const _canSum = (targetSum, numbers) => {
    if (targetSum === 0) return true
    if (targetSum < 0) return false

    for (const num of numbers) {
        if (_canSum(targetSum - num, numbers) === true) return true
    }
    return false
} // O(n^m) time, O(m) space, m is targetSum, n is length of numbers


// memoization
const _canSumMemo = (targetSum, numbers, memo={}) => {
    if (targetSum === 0) return true
    if (targetSum < 0) return false

    if (targetSum in memo) return memo[targetSum]

    for (const num of numbers) {
        if (_canSumMemo(targetSum - num, numbers, memo) === true) {
            memo[targetSum] = true
            return true
        }
    }
    memo[targetSum] = false
    return false
} // O(n*m) time, O(m) space, m is targetSum, n is length of numbers


// tabulation
const _canSumTabu = (targetSum, numbers) => {
    const table = Array(targetSum + 1).fill(false)

    table[0] = true
    numbers.forEach(num => table[num] = true)

    for (let i = 1; i <= targetSum; i++) {
        if (table[i] === true) {
            numbers.forEach(num => {
                if (num + i <= targetSum) {
                    table[num + i] = true
                }
            })
        }
    }
    return table[targetSum]
}


/*
 * How Sum
 */

// classic recursion
const _howSum = (targetSum, numbers) => {
    if (targetSum === 0) return []
    if (targetSum < 0) return null

    for (const num of numbers) {
        const res = _howSum(targetSum - num, numbers) 
        if (res !== null) {
            return [...res, num]
        }
    }
    return null
} // O(n^m * m) time, O(m) space, m is targetSum, n is length of numbers


// memoization
const _howSumMemo= (targetSum, numbers, memo={}) => {
    if (targetSum === 0) return []
    if (targetSum < 0) return null

    if (targetSum in memo) return memo[targetSum]

    for (const num of numbers) {
        const res = _howSumMemo(targetSum - num, numbers, memo)
        if ( res !== null) {
            memo[targetSum] = [...res, num]
            return memo[targetSum]
        }
    }
    memo[targetSum] = null
    return null
} // O(n * m^2) time, O(m^2) space, m is targetSum, n is length of numbers


// tabulation
const _howSumTabu = (targetSum, numbers) => {
    const table = Array(targetSum + 1).fill(null)

    table[0] = []
    numbers.forEach(num => table[num] = [num])

    for (let i = 1; i <= targetSum; i++) {
        if (table[i] !== null) {
            numbers.forEach(num => {
                if (num + i <= targetSum) {
                    table[num + i] = [...table[i], ...table[num]]
                }
            })
        }
    }
    return table[targetSum]
} // O(n * m^2) time, O(m^2) space, m is targetSum, n is length of numbers


/*
 * Best Sum
 */

// classic recursion
const _bestSum = (targetSum, numbers) => {
    numbers.sort((a, b) => b - a)

    if (targetSum === 0) return []
    if (targetSum < 0) return null

    let shortestCombination = null

    for (const num of numbers) {
        const res = _bestSum(targetSum - num, numbers) 
        if (res !== null) {
            const combination = [...res, num]
            if (shortestCombination === null || combination.length < shortestCombination.length) {
                shortestCombination = combination
            }
            return shortestCombination
        }
    }
    return null
} // O(n^m * m) time, O(m^2) space, m is targetSum, n is length of numbers


// memoization
const _bestSumMemo = (targetSum, numbers, memo={}) => {
    numbers.sort((a, b) => b - a)

    if (targetSum === 0) return []
    if (targetSum < 0) return null

    if (targetSum in memo) return memo[targetSum]

    for (const num of numbers) {
        const res = _bestSumMemo(targetSum - num, numbers, memo)
        if ( res !== null) {
            memo[targetSum] = [...res, num]
            return memo[targetSum]
        }
    }
    memo[targetSum] = null
    return null
} // O(n * m^2) time, O(m^2) space, m is targetSum, n is length of numbers


// tabulation
const _bestSumTabu = (targetSum, numbers) => {
    const table = Array(targetSum + 1).fill(null)

    table[0] = []
    numbers.forEach(num => table[num] = [num])

    for (let i = 1; i < targetSum; i++) {
        if (table[i] !== null) {
            numbers.forEach(num => {
                if (i + num <= targetSum) {
                    const combination = [...table[i], num]
                    if (!table[i + num] || table[i + num].length > combination.length) {
                        table[i + num] = combination
                    }
                }
            })
        }
    }
    return table
} // O(n * m^2) time, O(m^2) space, m is targetSum, n is length of numbers


/*
 * Test
 */

const canSum = (targetSum, numbers, mode) => {
    if (mode === 'classic') return _canSum(targetSum, numbers)
    if (mode === 'memo') return _canSumMemo(targetSum, numbers)
    if (mode === 'tabu') return _canSumTabu(targetSum, numbers)
}

const howSum = (targetSum, numbers, mode) => {
    if (mode === 'classic') return _howSum(targetSum, numbers)
    if (mode === 'memo') return _howSumMemo(targetSum, numbers)
    if (mode === 'tabu') return _howSumTabu(targetSum, numbers)
}

const bestSum = (targetSum, numbers, mode) => {
    if (mode === 'classic') return _bestSum(targetSum, numbers)
    if (mode === 'memo') return _bestSumMemo(targetSum, numbers)
    if (mode === 'tabu') return _bestSumTabu(targetSum, numbers)
}

const testList = [
    // [10, [2, 3, 5, 7]],             // true
    [20, [3, 7, 9, 15, 1]],         // true
    // [30, [2, 8, 10, 25, 6, 4]],     // true 
    // [40, [19, 18, 3, 9, 2]],        // true
    [50, [16, 21, 14, 28]],         // false
    // [300, [7, 14]],                 // false, slow
]

helper.testFunc(canSum, [testList, mode='tabu'])
helper.testFunc(canSum, [testList, mode='memo'])
helper.testFunc(canSum, [testList, mode='classic'])

helper.testFunc(howSum, [testList, mode='tabu'])
helper.testFunc(howSum, [testList, mode='memo'])
helper.testFunc(howSum, [testList, mode='classic'])

helper.testFunc(bestSum, [testList, mode='tabu'])
helper.testFunc(bestSum, [testList, mode='memo'])
helper.testFunc(bestSum, [testList, mode='classic'])
