import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'dateFormat' })
export class DateFormatPipe implements PipeTransform {
    /**
     * Constructor
     */
    constructor() {
    }

    private pad(num, size): string {
        let result = num+"";
        while (result.length < size) result = "0" + result;
        return result;
    }

    transform(date: Date): string {
                
        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let formattedDate = this.pad(day, 2)+"-"+this.pad(monthIndex+1, 2)+"-"+this.pad(year, 4)+" "+ this.pad(hours, 2)+":"+this.pad(minutes, 2);        

        return formattedDate;
    }
}