export function time2Date(timestamp) {
    if (!timestamp) {
        return '';
    }

    let time = new Date(timestamp);
    let m = time.getMonth();
    let d = time.getDate();

    let month = (m + 1).toString();
    if (m < 9) {
        month = '0' + month;
    }

    let day = d.toString();
    if (d < 10) {
        day = '0' + day;
    }

    return [time.getFullYear(), month, day].join('-');
}

export function getImageData(image, field = 'url') {
    let result = '';

    if (image) {
        let obj = JSON.parse(image);

        if (field == 'url') {
            result = obj.url;
        } else if (field == 'color') {
            result = obj.color;
        }
    }

    return result;
}