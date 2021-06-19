/*
 * Helper functions
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

module.exports = Helper
