const TeacherMenu = require('./TeacherMenu')
const AbstractMenu = require('./AbstractMenu');

module.exports = class MainMenu extends AbstractMenu {

    constructor() {
        super("Quit");
        this.teacherMenu = new TeacherMenu();
    }

    options = ["Teacher Menu"];
    
    async run() {

        while(true){

            this.printOptions()  
                      
            const input = await this.handleInput();

            if (input == this.options.length){
                await this.teacherMenu.run()
            }

            if (input == this.options.length +1){
                break
            }
        }
    }
}