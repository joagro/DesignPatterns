const GetActiveTeachersCommand = require('../DbCommands/GetActiveTeachersCommand');
const GetAllWorkdaysByTeacherCommand = require('../DbCommands/GetAllWorkdaysByTeacherCommand');
const GetWeekdayCommand = require('../DbCommands/GetWeekdayCommand');
const GetWorkdayByTeacherCommand = require('../DbCommands/GetWorkdayByTeacherCommand');
//const UpdateWorkday = require('../DbCommands/UpdateWorkdayCommand');


const dbHandler = require('../Db/DbAdapter')
const Weekday = require('./Weekday');
const FullWeek = require('./FullWeek');
const Workday = require('./Workday');

module.exports = class ScheduleFactory{

    constructor() {
    }

    async createWeekDay(day) {
        
        let command = new GetWeekdayCommand(day)

        try {
            let weekday = await dbHandler.executeCommand(command);
            return new Weekday(day, weekday);
        } catch(error) {
            console.log(error)
        }
    }

    async createWorkday(day, teacher){

        let mycommand = new GetWorkdayByTeacherCommand(day, teacher);

        try {
            let results = await dbHandler.executeCommand(mycommand);
            let workday =  new Workday(results.personid, results.worker, results.day, results.start_time, results.end_time);
            return workday;
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