module.exports = class UpdateWorkdayCommand {

    constructor(day, personId, newStartTime, newEndTime, oldStartTime, oldEndTime){
        this.day = day;
        this.personId = personId;
        this.newStartTime = newStartTime;
        this.newEndTime = newEndTime;
        this.oldStartTime = oldStartTime; 
        this.oldEndTime = oldEndTime;
    }

    query = `
    UPDATE
        weekdays
    SET
        start_time = $start_time, end_time= $end_time
    WHERE
        name = $day AND person_id = $person
    `

    execute(DbHandler) {
        console.log(this.day)

        try {
            let results = DbHandler.run(this.query, 
                    {
                        day: this.day.toLowerCase(), //.toLowerCase(), 
                        person: this.personId,
                        start_time:this.newStartTime,
                        end_time: this.newEndTime
                    });
            return results;
        } catch(err) {
            console.log(err);
        }
    }

    undo(DbHandler) {

        try {
            let results = DbHandler.run(this.query, 
                    {
                        day: this.day.toLowerCase(), //.toLowerCase(), 
                        person: this.person,
                        start_time:this.oldStartTime,
                        end_time: this.oldEndTime
                    });
            return results;
        } catch(err) {
            console.log(err);
        }
    }
}