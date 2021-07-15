const GetActiveTeachersCommand = require('../DbCommands/GetActiveTeachersCommand');
const GetAllWorkdaysByTeacherCommand = require('../DbCommands/GetAllWorkdaysByTeacherCommand');
const GetWeekdayCommand = require('../DbCommands/GetWeekdayCommand');
const UpdateWorkday = require('../DbCommands/UpdateWorkday');

const dbHandler = require('../Db/DbAdapter')
const Weekday = require('./Weekday');
const FullWeek = require('./FullWeek');

module.exports = class ScheduleFactory{

    constructor() {
    }

    async createWeekDay(day) {
        
        let command = new GetWeekdayCommand(day)

        //let update = new UpdateWorkday("monday", 1, "09:00", "15:30", "09:00", "15:30");
        //    constructor(day, person, newStartTime, newEndTime, oldStartTime, oldEndTime){


        try {
            let weekday = await dbHandler.executeCommand(command);
            return new Weekday(day, weekday);
        } catch(error) {
            console.log(error)
        }
    }

    async createFullWeek() {
        let command = new GetActiveTeachersCommand();
        let activeTeachers = await dbHandler.executeCommand(command);

        //find length of longest teacher name
        let nameMaxLength = Math.max(...(activeTeachers.map(el => el.length)));

        let printStrings = [];
        let headline = 
            `${"Name".padEnd(nameMaxLength+3, " ")} ${"Monday".padEnd(11, " ")} ${"Tuesday".padEnd(11, " ")} ${"Wednesdag".padEnd(11, " ")} ${"Thursday".padEnd(11, " ")} ${"Friday".padEnd(11, " ")}`

        printStrings.push(headline)
        for (let teach of activeTeachers){
            let command = new GetAllWorkdaysByTeacherCommand(teach);
            let teacherWorkdays = await dbHandler.executeCommand(command);

            let tempString = teach.padEnd(nameMaxLength, " ")
            for (let day of teacherWorkdays) {
                tempString += ` ${day.start_time}/${day.end_time}`
            }
            printStrings.push(tempString)
        }

        let newweek = new FullWeek(printStrings, activeTeachers);

        return newweek;
    }
}