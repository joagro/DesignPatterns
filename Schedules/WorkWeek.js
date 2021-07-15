const prompt = require('async-prompt');

module.exports = class WorkWeek {

    constructor(teacher, printStrings, workdays){
        this.teacher = teacher;
        this.printStrings = printStrings;
        this.workdays = workdays;
        this.newStartTime;
        this.newEndTime;
        this.format = /^[0-9][0-9]:[0-9][0-9]$/;

    }

    async updateAll(newStartTime, newEndTime) {
        for(let day of this.workdays){
            day.updateSchedule(newStartTime, newEndTime)

        }
    }

    async run(){
        console.log(`Changing workdays for ${this.teacher}`)
        console.log(this.printStrings)

        for (let str of this.printStrings){
            console.log(str)
        }

        let newStartTime;
        let newEndTime;
        
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
                        console.log("Update confirmed")

                        await this.updateAll(this.newStartTime, this.newEndTime);
                        break
                    } else {
                        console.log(`invalid input: ${confirmation}`)
                    }
                }
            }
        }
    }
}
