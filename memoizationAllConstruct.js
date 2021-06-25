const Helper = require('./Helper')

const helper = new Helper()

/*
 * All Construct
 */

// classic recursion
const _allConstruct = (target, wordBank) => {
    if (target === "") return [[]]

    const res = []
    for (const word of wordBank) {
        if (target.startsWith(word)) {
            const suffix = target.substr(word.length)
            const suffixWays = _allConstruct(suffix, wordBank)
            const targetWays = suffixWays.map(way => [word, ...way])
            res.push(...targetWays)
        }
    }
    return res
} // O(n^m) time, O(m) space, m is target, n is length of wordBank


// dynamic memoization
const _allConstructDynamic = (target, wordBank, memo={}) => {
    if (target === "") return [[]]

    if (target in memo) return memo[target]

    const res = []
    for (const word of wordBank) {
        if (target.startsWith(word)) {
            const suffix = target.substr(word.length)
            const suffixWays = _allConstructDynamic(suffix, wordBank, memo)
            const targetWays = suffixWays.map(way => [word, ...way])
            res.push(...targetWays)
        }
    }

    memo[target] = res
    return res
} // O(n*m) time, O(m) space, m is target, n is length of wordBank


const allConstruct = (target, wordBank, mode) => {
    if (mode === 'classic') res = _allConstruct(target, wordBank)
    if (mode === 'dynamic') res = _allConstructDynamic(target, wordBank)
    return res
}


const testAllConstruct = (testList, mode = 'classic') => {
    console.log(`${mode} mode`)
    for (const test of testList) {
        console.log(`target: ${test[0]}, wordBank: ${test[1]}`)
        const res = helper.timeAndSpaceUsage(allConstruct, [...test, mode])
        console.log(`result:`, res)
    }
}

const testList = [
    ['abcdef', ['abc', 'bc', 'def', 'cd']],             // true
    ['purple', ['purp', 'p', 'ur', 'le', 'purpl']],
    ['eeeeeeeeeeeeeeeeeeeeeeeef', 
        ['e', 'ee', 'eee', 'eeee', 'eeeee']
    ],             // true
]
testAllConstruct(testList, mode='classic')
testAllConstruct(testList, mode='dynamic')



