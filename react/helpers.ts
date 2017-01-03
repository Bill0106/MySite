const actionStatusGenerator = (types: any) => {
    const progress = {
        pending: 'PENDING',
        success: 'FULFILLED',
        error: 'REJECTED',
    };

    let newTypes = {};
    for (let type in types) {
        let obj = {};
        for (let key in progress) {
            obj[key] = `${types[type]}_${progress[key]}`;
        }
        newTypes[type] = obj;
    }

    return newTypes;
}

const fetchedPages = function (pages: any, url: string) {
    const match = url.match(/page=(\d)/i);
    const page = match ? parseInt(match[1]) : 1;

    pages.push(page);
    pages.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
    });

    return pages;
}

const time2Date = function (timestamp: number, displayTime: boolean = false) {
    if (!timestamp) {
        return '';
    }

    const time = new Date(timestamp);
    const year = time.getFullYear();
    const month = (time.getMonth() + 1);
    const day = time.getDate();
    const hour = time.getHours();
    const minute = time.getMinutes();
    const second = time.getSeconds();

    const arr = [month, day, hour, minute, second];
    const newArr = arr.map(t => ('0' + t).slice(-2));

    const dateArray = [year.toString()].concat(newArr.slice(0, 2));
    const timeArray = newArr.slice(2);

    let ts = dateArray.join('-');
    if (displayTime) {
        ts = ts + ' ' + timeArray.join(':');
    }

    return ts;
}

export default { fetchedPages, time2Date, actionStatusGenerator }