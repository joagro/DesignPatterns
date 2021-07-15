const GetActiveTeachersCommand = require('../DbCommands/GetActiveTeachersCommand');
const GetAllWorkdaysByTeacherCommand = require('../DbCommands/GetAllWorkdaysByTeacherCommand');
const GetWeekdayCommand = require('../DbCommands/GetWeekdayCommand');
const GetWorkdayByTeacherCommand = require('../DbCommands/GetWorkdayByTeacherCommand');
//const UpdateWorkday = require('../DbCommands/UpdateWorkdayCommand');


const dbHandler = require('../Db/DbAdapter')
const Weekday = require('./Weekday');
const FullWeek = require('./FullWeek');
const Workday = require('./Workday');
const WorkWeek = require('./WorkWeek')

module.exports = class ScheduleFactory{

    constructor() {
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

    async createWorkWeek(teacher) {
        console.log("creating workweek")
        let command = new GetAllWorkdaysByTeacherCommand(teacher);
        let teacherWorkdays = await dbHandler.executeCommand(command);
        //console.log(teacherWorkdays);

        let weekdays = [];

        let printStrings = [];
        
        let headline = 
            `${"Name".padEnd(teacher.length+3, " ")} ${"Monday".padEnd(11, " ")} ${"Tuesday".padEnd(11, " ")} ${"Wednesday".padEnd(11, " ")} ${"Thursday".padEnd(11, " ")} ${"Friday".padEnd(11, " ")}`
        
        printStrings.push(headline)

        let tempString = teacher + " ";
        for (let day of teacherWorkdays) {
            tempString += ` ${day.start_time}/${day.end_time}`
            /*
            console.log("day.teacher_id is: " + day.teacher_id)
            console.log("day.day is: " + day.day)
            console.log("day.start_time: " + day.start_time)
            console.log("day.end_time: " + day.end_time)
            */
            //console.log("day is: " + day)
            //console.log("day is: " + day)
                                 //(results.personid, results.worker, results.day, results.start_time, results.end_time)
                                     //(personId, teacherName, dayName, start_time, end_time)
                                     //(personId, teacherName, dayName, start_time, end_time)
            weekdays.push(new Workday(day.teacher_id, day.name, day.day, day.start_time, day.end_time))
        }
        printStrings.push(tempString)
        //console.log(printStrings);

        return new WorkWeek(teacher, printStrings, weekdays)
        //for (let workday of )

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

    async createFullWeek() {
        let command = new GetActiveTeachersCommand();
        let activeTeachers = await dbHandler.executeCommand(command);

        //find length of longest teacher name
        let nameMaxLength = Math.max(...(activeTeachers.map(el => el.length)));

        let printStrings = [];
        let headline = 
            `${"Name".padEnd(nameMaxLength+3, " ")} ${"Monday".padEnd(11, " ")} ${"Tuesday".padEnd(11, " ")} ${"Wednesday".padEnd(11, " ")} ${"Thursday".padEnd(11, " ")} ${"Friday".padEnd(11, " ")}`

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
        //printStrings.push("This is where you can re-schedule a teacher for the full week, select a teacher to edit his/her weekly schedule")

        let newweek = new FullWeek(printStrings, activeTeachers);

        return newweek;
    }
}