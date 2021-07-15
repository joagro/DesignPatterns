const AbstractMenu = require('./AbstractMenu');
const ScheduleFactory = require('../Schedules/ScheduleFactory');

module.exports = class TeacherMenu extends AbstractMenu {

    constructor() {
        super("Back to the main menu");
        this.scheduleFactory = new ScheduleFactory();
    }

    options = ["Show workers at a given day", "show full work week"];
    description = "Welcome to the teacher menu";
    weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]


    async run() {
        console.log(this.description);

        while(true){

            this.printOptions()

            let input = await this.handleInput();

            if (input === 1){

                for (let i = 0; i < this.weekdays.length; i++) {
                    console.log(`${i +1}: ${this.weekdays[i]}`)
                }
                console.log(`${this.weekdays.length +1}: exit`)

                try {
                    input = await this.handleInput();
    
                } catch(err) {
                    console.log(err)
                }

                if(1 <= input <= this.weekdays.length) {

                    const schedule = await this.scheduleFactory.createWeekDay(this.weekdays[input -1])
                    const result = await schedule.run();

                    if(result) {
                        console.log(`update ${result} on ${this.weekdays[input -1]}`)
                    }
                }

                if(input === this.weekdays.length + 1) {
                    break
                }
            }

            if (input === 2){
                const schedule = await this.scheduleFactory.createFullWeek()
                const result = await schedule.run();
                //console.log("display full weekly schedule")
            }

            if (input == this.options.length +1){
                break
            }
        }
    }
}