const prompt = require('async-prompt');

const UpdateWorkdayCommand = require('../DbCommands/UpdateWorkdayCommand');
const dbHandler = require('../Db/DbAdapter')


module.exports = class Workday {

    constructor(personId, worker, day, start_time, end_time) {
        this.personId = personId;
        this.worker = worker;
        this.day = day;
        this.start_time = start_time;
        this.end_time = end_time;
        this.format = /^[0-9][0-9]:[0-9][0-9]$/;
        this.newStartTime;
        this.newEndTime;
    }

    async run(){
        //console.log(this.day.charAt(0).toUpperCase() + this.day.slice(1)) //TODO exchange this for this.printHeadline()???
        console.log(`Changing workday for ${this.worker} on ${this.day.charAt(0).toUpperCase() + this.day.slice(1)}`)
        console.log(`${this.worker} ${this.start_time} ${this.end_time}`)

        let newStartTime;
        let newEndTime;
        let confirmed;
        
        while(true) {
            console.log("enter new start time using the format HH:MM, or q to cancel")
            newStartTime = await prompt(``);

            if(newStartTime.toUpperCase() === "Q") {
                break
            }

            if (this.format.test(newStartTime)){
                console.log("matching String!!!")
                this.newStartTime = newStartTime;
                break
            } else {
                console.log(`${newStartTime} is invalid`)
            }
        }
        if(newStartTime.toUpperCase() != "Q") {

            while(true) {
                console.log("enter new end time using the format HH:MM, or q to cancel")
                newEndTime = await prompt(``);

                if(newEndTime.toUpperCase() === "Q") {
                    break
                }
    
                if (this.format.test(newEndTime)){
                    console.log("matching String!!!")
                    this.newEndTime = newEndTime;
                    break
                } else {
                    console.log(`${newEndTime} is invalid`)
                }
            }
        }
        if(newStartTime.toUpperCase() != "Q") {
            if(newEndTime.toUpperCase() != "Q") {
                while(true) {
                    console.log(`Confirm re-scheduling workday to ${this.newStartTime}/${this.newEndTime} [y/n]`)
                    let confirmation = await prompt(``);

                    if (confirmation === "n" || confirmation === "N"){
                        console.log("uncomfirmed")
                        break
                    }
        
                    if (confirmation === "y" || confirmation === "Y"){
                        console.log(`this.day: ${this.day} this.personId: ${this.personId} this.newStartTime: ${this.newStartTime} this.newEndTime: ${this.newEndTime}`)
                        console.log(`this.start_time: ${this.start_time} this.end_time: ${this.end_time}`)

                        const command = new UpdateWorkdayCommand(
                                                                this.day, 
                                                                this.personId, 
                                                                this.newStartTime, 
                                                                this.newEndTime, 
                                                                this.start_time, 
                                                                this.end_time)
                        let results = await dbHandler.executeCommand(command);
                        console.log(results)
                        break
                    } else {
                        console.log(`invalid input: ${confirmation}`)
                    }
                }
            }
        }
    }
}