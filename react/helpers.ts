export function time2Date(timestamp, displayTime = false) {
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

    let ts = [time.getFullYear(), month, day].join('-');

    if (displayTime) {
        let hms = [time.getHours(), time.getMinutes(), time.getSeconds()];
        let newHms = [];
        hms.forEach(value => {
            let t = value.toString();

            if (value < 10) {
                t = '0' + t;
            }
            newHms.push(t);
        });

        ts = ts + ' ' + newHms.join(':');
    }

    return ts;
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