const AbstractMenu = require('./AbstractMenu');

module.exports = class WeekdaySelector extends AbstractMenu {

    constructor() {
        super("Exit to teacher menu");
    }

    options = ["Monday", "Tuesday,", "Wednesday", "Thursday", "Friday"];
    
    async run() {


        while(true){
            /* 
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
            
            */
            console.log("running input inside fo weekdayselector")
            this.printOptions()  
                      
            const input = await this.handleInput();

            if (input <= this.options.length +1){
                return input;
            }
            /*
            if (input == this.options.length +1){
                return null;
            }
            */
        }
    }
}