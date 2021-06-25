const Helper = require('./Helper')

const helper = new Helper()

/*
 * Can Construct
 */

// classic recursion
const _canConstruct = (target, wordBank) => {
    if (target === "") return true

    for (const word of wordBank) {
        if (target.startsWith(word)) {
            return _canConstruct(target.substr(word.length), wordBank)
        }
    }

    return false
} // O(n^m) time, O(m) space, m is target, n is length of wordBank


// dynamic memoization
const _canConstructDynamic = (target, wordBank, memo={}) => {
    if (target === "") return true

    if (target in memo) return memo[target]

    for (const word of wordBank) {
        if (target.startsWith(word)) {
            memo[target] = _canConstructDynamic(target.substr(word.length), wordBank, memo)
            return memo[target]
        }
    }

    return false
} // O(n*m) time, O(m) space, m is target, n is length of wordBank


const canConstruct = (target, wordBank, mode) => {
    if (mode === 'classic') res = _canConstruct(target, wordBank)
    if (mode === 'dynamic') res = _canConstructDynamic(target, wordBank)
    return res
}


const testCanConstruct = (testList, mode = 'classic') => {
    console.log(`${mode} mode`)
    for (const test of testList) {
        console.log(`target: ${test[0]}, wordBank: ${test[1]}`)
        const res = helper.timeAndSpaceUsage(canConstruct, [...test, mode])
        console.log(`result: ${res}`)
    }
}

const testList = [
    ['abcdef', ['abc', 'bc', 'def', 'cd']],             // true
    ['eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeefff', 
        ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee', 'eeeeeee', 'eeeeeeee', 'eeeeeeeee', 'eeeeeeeeee']
    ],             // true
]
testCanConstruct(testList, mode='classic')
testCanConstruct(testList, mode='dynamic')



