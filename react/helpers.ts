export function time2Date (timestamp: number, displayTime: boolean = false) {
    if (!timestamp) {
        return ""
    }

    const time = new Date(timestamp)
    const year = time.getFullYear()
    const month = (time.getMonth() + 1)
    const day = time.getDate()
    const hour = time.getHours()
    const minute = time.getMinutes()
    const second = time.getSeconds()

    const arr = [month, day, hour, minute, second]
    const newArr = arr.map(t => ("0" + t).slice(-2))

    const dateArray = [year.toString()].concat(newArr.slice(0, 2))
    const timeArray = newArr.slice(2)

    let ts = dateArray.join("-")
    if (displayTime) {
        ts = ts + " " + timeArray.join(":")
    }

    return ts
}