const TeacherMenu = require('./TeacherMenu')

const AbstractMenu = require('./AbstractMenu');

module.exports = class MainMenu extends AbstractMenu {

    constructor(db) {
        super("Quit");
        this.DB = db;
        this.teacherMenu = new TeacherMenu(this.DB);
    }

    options = ["Teacher Menu"];
    //description = "This is the main menu that relies on an abstract class";
    
    async run() {
        //console.log(this.description);

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