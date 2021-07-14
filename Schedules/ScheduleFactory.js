const GetActiveTeachersCommand = require('../DbCommands/GetActiveTeachersCommand');
const GetAllWorkdaysByTeacherCommand = require('../DbCommands/GetAllWorkdaysByTeacherCommand');
const GetWeekdayCommand = require('../DbCommands/GetWeekdayCommand');

const Weekday = require('./Weekday');
const FullWeek = require('./FullWeek');

module.exports = class ScheduleFactory{

    constructor(db) {
        this.DB = db
    }

    //Constructors
    async createWeekDay(day) {
        
        let command = new GetWeekdayCommand(day)

        let weekday = await this.DB.executeCommand(command);

        return new Weekday(day, weekday);
    }

    async createFullWeek() {
       //let week = await this.getWholeWorkWeek();
        let command = new GetActiveTeachersCommand();
        let activeTeachers = await this.DB.executeCommand(command);
        //let activeTeachers = await this.getActiveTeachers();
        //console.log(activeTeachers);
        //let teachers = await Promise.all(activeTeachers.map(async teacher => { return await this.getAllWorkdaysByTeacher(teacher)}));

        //find length of longest string
        let nameMaxLength = Math.max(...(activeTeachers.map(el => el.length)));

        let printStrings = [];
        let headline = 
            `${"Name".padEnd(nameMaxLength+3, " ")} ${"Monday".padEnd(11, " ")} ${"Tuesday".padEnd(11, " ")} ${"Wednesdag".padEnd(11, " ")} ${"Thursday".padEnd(11, " ")} ${"Friday".padEnd(11, " ")}`

        printStrings.push(headline)
        for (let teach of activeTeachers){
            //teacherDictionary[teach] = await this.getAllWorkdaysByTeacher(teach);
            let command = new GetAllWorkdaysByTeacherCommand(teach);
            let teacherWorkdays = await this.DB.executeCommand(command);
            //let teacherWorkdays = await this.getAllWorkdaysByTeacher(teach);

            let tempString = teach.padEnd(nameMaxLength, " ")
            for (let day of teacherWorkdays) {
                tempString += ` ${day.start_time}/${day.end_time}`
            }
            //printStrings.push(` ${day.start_time}/${day.end_time}`)
            printStrings.push(tempString)
        }

        //console.log(printStrings);

        let newweek = new FullWeek(printStrings, activeTeachers);

        return newweek;
    }

}