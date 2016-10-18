import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'imageHelper' })

export class ImageHelperPipe implements PipeTransform {
    transform(image: any, field: string): string {
        let data = '';

        if (typeof image !== 'undefined') {
            if (field == 'color') {
                let color = JSON.parse(image).color;
                data = '#' + color.substr(2);
            } else {
                data = JSON.parse(image).url;
            }
        }

        return data;
    }
}