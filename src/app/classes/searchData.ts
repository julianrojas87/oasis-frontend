/**
 * formats date object into DD/MM/YYY string
 */
export function formatDate(date: Date): string {
    return zeroPad(date.getDay(), 2) + '/' + zeroPad(date.getMonth(), 2) + '/' + zeroPad(date.getFullYear(), 4);
}
/**
 * returns string of number of the specified width (or larger), padded with leading zeroes
 */
export function zeroPad(num: number, width: number): string {
    const zero = width - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
}

export class SearchData {
    public depStation: string; // id of departure station
    public arrStation: string; // id of arrival station
    public travelTime: string; // travel time in HH:MM
    public travelDate: string; // travel date in DD/MM/YYYY
    public timeType: string;   // either 'depart' or 'arrival'

    /**
     * returns a list of SearchData objects where the travelDate is split according to the provided parameters
     * @param depStation id of departure station
     * @param arrStation id of arrival station
     * @param travelTime traveltime in HH:MM
     * @param startDate startDate
     * @param timeType either 'departureTime' or 'arrivalTime'
     * @param period days between trips
     * @param amount amount of SearchDataObjects wanted (default = 5)
     * @param goesForward wether or not the days should be added instead of removed to the startdate (default = false)
     */
    public static createPeriodicList(depStation, arrStation, travelTime, startDate, timeType, period: number, amount: number = 5,
                                     goesForward: boolean = false): SearchData[] {
        const dataList = [];
        const calcdate = new Date(Date.parse(startDate));
        let dateString = '';
        for (let i = 0; i < amount; i++) {
            calcdate.setDate(calcdate.getDate() + period);
            dateString = formatDate(calcdate);
            dataList[i] = new SearchData(depStation, arrStation, travelTime, dateString, timeType);
        }
        return dataList;
    }

    constructor(depStation, arrStation, travelTime, travelDate, timeType) {
        this.depStation = depStation;
        this.arrStation = arrStation;
        this.travelTime = travelTime;
        this.travelDate = travelDate;
        this.timeType = timeType;
    }

    toJSON(): any {
        const hour = Number(this.travelTime.split(':')[0]);
        const min = Number(this.travelTime.split(':')[1]);
        const day = Number(this.travelDate.split('/')[0]);
        const month = Number(this.travelDate.split('/')[1]) - 1;
        const year = Number(this.travelDate.split('/')[2]);
        const datetime = new Date(year, month, day, hour, min).toISOString();
        const json = {
            'arrivalStop': this.arrStation,
            'departureStop': this.depStation
        };
        json[this.timeType] = datetime;
        return json;
    }
}
