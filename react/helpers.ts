export function time2Date(timestamp: number, displayTime = false) {
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

export function actionTypeGenerator(reducer: string, action: string) {
    const progressObj = {
        pending: 'PENDING',
        success: 'FULFILLED',
        error: 'REJECTED',
    };
    const state = reducer.replace('-', '_').toUpperCase();
    
    return function (progress?: string) {
        let type = `${action.toUpperCase()}_${state}`;
        if (progress && progress in progressObj) {
            return `${type}_${progressObj[progress]}`;
        }

        return type;
    };
}

export function fetchedPages(pages: any, url: string) {
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

export const initialState = {
    isFetching: false,
    fetched: false,
    items: [],
    total: 0,
    fetchedPages: [],
    error: null,
}