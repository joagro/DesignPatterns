const AbstractMenu = require('../Menus/AbstractMenu');

module.exports = class Weekday extends AbstractMenu {

    constructor(weekday, workers) {
        super("Return to teacher menu");
        this.weekday = weekday; //String corresponding to the weekday, ie "monday"
        this.workers = workers; // list of objects like below
        this.options= this.setOptions(workers);
    }
    description = "To change the schedule of a worker, select it by entering the corresponding number"

    setOptions(workers){

        let tempOptions = [];

        for (let i = 0; i < this.workers.length; i++) {
            tempOptions.push(`${this.workers[i].name}  ${this.workers[i].start_time}  ${this.workers[i].end_time}`)
        }
        return tempOptions;
    }

    async run(){
        console.log(this.weekday.charAt(0).toUpperCase() + this.weekday.slice(1)) //TODO exchange this for this.printHeadline()???
        this.printOptions()

        while(true) {
            let input = await this.handleInput();

            if (input == this.workers.length +1){
                return null
                //break
            }

            if (0 < input <= this.workers.length) {
                return this.workers[input -1].name;
            }
        }
    }
}