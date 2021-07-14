const AbstractMenu = require('./AbstractMenu');

module.exports = class TeacherMenu extends AbstractMenu {

    constructor(db) {
        super("Back to the main menu");
        this.DB = db;
    }

    options = ["Show workers at a given day", "show full work week"];
    description = "Welcome to the teacher menu";
    weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]


    async run() {
        console.log(this.description);

        while(true){

            this.printOptions()

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

                        if(1 <= input <= this.weekdays.length) {

                            if(input) {
                                console.log("Selected: " + this.weekdays[input -1])
                            }
                        }

                        if(input === this.weekdays.length + 1) {
                            break
                        }
                }

                if (input === 2){
                    console.log("display full weekly schedule")
                }

                if (input == this.options.length +1){
                    break
                }
            
        }
    }
}