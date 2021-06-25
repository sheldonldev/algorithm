const Helper = require('./Helper')

const helper = new Helper()

/*
 * Count Construct
 */

// classic recursion
const _countConstruct = (target, wordBank) => {
    if (target === "") return 1

    let counter = 0
    for (const word of wordBank) {
        if (target.startsWith(word)) {
            res = _countConstruct(target.substr(word.length), wordBank)
            counter += res
        }
    }

    return counter
} // O(n^m) time, O(m) space, m is target, n is length of wordBank


// dynamic memoization
const _countConstructDynamic = (target, wordBank, memo={}) => {
    if (target === "") return 1

    if (target in memo) return memo[target]

    let counter = 0
    for (const word of wordBank) {
        if (target.startsWith(word)) {
            const res = _countConstructDynamic(target.substr(word.length), wordBank, memo)
            counter += res
        }
    }
    memo[target] = counter
    return counter
} // O(n*m) time, O(m) space, m is target, n is length of wordBank


const countConstruct = (target, wordBank, mode) => {
    if (mode === 'classic') res = _countConstruct(target, wordBank)
    if (mode === 'dynamic') res = _countConstructDynamic(target, wordBank)
    return res
}


const testCountConstruct = (testList, mode = 'classic') => {
    console.log(`${mode} mode`)
    for (const test of testList) {
        console.log(`target: ${test[0]}, wordBank: ${test[1]}`)
        const res = helper.timeAndSpaceUsage(countConstruct, [...test, mode])
        console.log(`result: ${res}`)
    }
}

const testList = [
    ['abcdef', ['abc', 'bc', 'def', 'cd']],
    ['purple', ['purp', 'p', 'ur', 'le', 'purpl']],
    ['eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', 
        ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee', 'eeeeeeeeee']
    ],             // true
]
// testCountConstruct(testList, mode='classic')
testCountConstruct(testList, mode='dynamic')



