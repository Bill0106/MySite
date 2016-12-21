export function time2Date(timestamp: number, displayTime = false) {
    if (!timestamp) {
        return '';
    }

    const time = new Date(timestamp);
    let year = time.getFullYear();
    let month = (time.getMonth() + 1);
    let day = time.getDate();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let second = time.getSeconds();

    let arr = [month, day, hour, minute, second];
    let newArr = arr.map(t => ('0' + t).slice(-2));
    
    const dateArray = [year.toString()].concat(newArr.slice(0, 2));
    const timeArray = newArr.slice(2);
    
    let ts = dateArray.join('-');
    if (displayTime) {
        ts = ts + ' ' + timeArray.join(':');
    }

    return ts;
}