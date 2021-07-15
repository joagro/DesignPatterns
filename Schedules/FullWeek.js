//const prompt = require('async-prompt');

const AbstractMenu = require('../Menus/AbstractMenu');

module.exports = class FullWeek extends AbstractMenu {

    constructor(workweek, workers) {
        super("Return to teacher menu");
        this.workweek = workweek; //String corresponding to the weekday, ie "monday"
        this.workers = workers; // list of objects like below
        this.options = workweek.slice(1);
        this.headline = workweek[0];

    }
    description = "To change the schedule of a worker, select it by entering the corresponding number"

    async run(){

        console.log(this.headline);
        this.printOptions()
        console.log("This is where you can re-schedule a teacher for the full week, select a teacher to edit his/her weekly schedule")
    
        while(true) {
            let input = await this.handleInput();

            if (0 < input <= this.workers.length) {
                return this.workers[input -1];
            }

            if (input == this.workers.length +1){
                return null
                //break
            }
        }
    }
}