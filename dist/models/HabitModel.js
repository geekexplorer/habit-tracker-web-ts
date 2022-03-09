import { msInDay } from "../config/constants.js";
export class HabitModel {
    constructor(data) {
        this.days = [];
        // TODO: We'll need to add code here to create a start date if it doesn't exist as well as generate the 'days'
        // array if one isn't passed in.
        this.id = data.id;
        this.title = data.title;
        if (!data.dateStarted) {
            this.dateStarted = new Date().toJSON();
        }
        else {
            this.dateStarted = data.dateStarted;
        }
        this.duration = data.duration;
        if (!data.days || data.days.length === 0) {
            this.days = this.generateDefaultDays();
        }
        else {
            this.days = data.days;
        }
    }
    generateDefaultDays() {
        const result = [];
        const dateInMs = new Date(this.dateStarted).getTime();
        for (let x = 0; x < this.duration; x++) {
            result.push({
                date: new Date(dateInMs + msInDay * x).toJSON(),
                completed: false,
            });
        }
        return result;
    }
}
//# sourceMappingURL=HabitModel.js.map