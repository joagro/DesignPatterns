const prompt = require('async-prompt');

module.exports = class AbstractMenu {

    options;
    description;
    exit;

    constructor(exit) {
        this.exit = exit
        if (new.target === AbstractMenu) {
            throw new TypeError("Cannot construct Abstract instances directly");
        }
    }

    async handleInput(){
        let input = await prompt(``);
        return parseInt(input);
    }

    printOptions(){

        for (let i = 0; i < this.options.length; i++) {
            console.log(`${i +1}: ${this.options[i]}`)
          }
        console.log(`${this.options.length +1}: ${this.exit}`)
    }

    async run(){

        throw new Error("Method 'run()' must be implemented.");
    }
}