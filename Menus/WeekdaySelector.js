const AbstractMenu = require('./AbstractMenu');

module.exports = class WeekdaySelector extends AbstractMenu {

    constructor() {
        super("Exit to teacher menu");
    }

    options = ["Monday", "Tuesday,", "Wednesday", "Thursday", "Friday"];
    
    async run() {

        while(true){
            this.printOptions()  
                      
            const input = await this.handleInput();

            if (input <= this.options.length +1){
                return input;
            }
        }
    }
}