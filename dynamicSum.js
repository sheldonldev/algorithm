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


// dynamic memoization
const _canSumDynamic = (targetSum, numbers, memo={}) => {
    if (targetSum === 0) return true
    if (targetSum < 0) return false

    if (targetSum in memo) return memo[targetSum]

    for (const num of numbers) {
        if (_canSumDynamic(targetSum - num, numbers, memo) === true) {
            memo[targetSum] = true
            return true
        }
    }
    memo[targetSum] = false
    return false
} // O(n*m) time, O(m) space, m is targetSum, n is length of numbers


const canSum = (targetSum, numbers, mode) => {
    if (mode === 'classic') res = _canSum(targetSum, numbers)
    if (mode === 'dynamic') res = _canSumDynamic(targetSum, numbers)
    return res
}


const testCanSum = (testList, mode = 'classic') => {
    console.log(`${mode} mode`)
    for (const test of testList) {
        console.log(`target: ${test[0]}, numbers: ${test[1]}`)
        const res = helper.timeAndSpaceUsage(canSum, [...test, mode])
        console.log(`result: ${res}`)
    }
}

const testList = [
    [10, [2, 3, 5, 7]],             // true
    [20, [3, 7, 9, 15, 1]],         // true
    [30, [2, 8, 10, 25, 6, 4]],     // true 
    [40, [19, 18, 3, 9, 2]],        // true
    [50, [16, 21, 14, 28]],         // false
    [300, [7, 14]],                 // false, slow
]
testCanSum(testList, mode='classic')
testCanSum(testList, mode='dynamic')



