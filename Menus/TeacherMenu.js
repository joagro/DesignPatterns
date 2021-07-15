const AbstractMenu = require('./AbstractMenu');
const WeekdaySelector = require('./WeekdaySelector');
const ScheduleFactory = require('../Schedules/ScheduleFactory');

module.exports = class TeacherMenu extends AbstractMenu {

    constructor() {
        super("Back to the main menu");
        this.scheduleFactory = new ScheduleFactory();
        this.weekdaySelector = new WeekdaySelector();
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

                let weekday = await this.weekdaySelector.run()

                if(weekday > this.weekdays.length) {
                    break
                }

                if( 0 < weekday < this.weekdays.length + 1) {

                    const schedule = await this.scheduleFactory.createWeekDay(this.weekdays[weekday -1])
                    const result = await schedule.run();

                    if(result) {
                        console.log(`update ${result} on ${this.weekdays[weekday -1]}`)
                        
                        const workday = await this.scheduleFactory.createWorkday(this.weekdays[weekday -1], result)//createWorkday(result, this.weekdays[weekday -1]);
                        await workday.run();
                    }
                }
            }

            if (input === 2){
                const schedule = await this.scheduleFactory.createFullWeek()
                const result = await schedule.run(); //result is a name
                //console.log("result: " + result)
                //console.log(result)
                //console.log("display full weekly schedule")
                if(result) {
                    //console.log("result is defined")
                    const teacherSchedule = await this.scheduleFactory.createWorkWeek(result);
                    await teacherSchedule.run()
                }
            }

            if (input == this.options.length +1){
                break
            }
        }
    }
}