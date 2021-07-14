module.exports = class GetWeekdayCommand {

    constructor(day){
        this.day = day;
    }

    query = `
            SELECT
                weekdays.id as id, 
                weekdays.name as day, 
                teachers.id as teacher_id, 
                teachers.name as name,
                weekdays.start_time as start_time,
                weekdays.end_time as end_time

            FROM
                weekdays

            INNER JOIN
                teachers on weekdays.person_id = teachers.id
                        
            WHERE
                weekdays.name = $day
            `

    execute(DbHandler) {

        try {
            let results = DbHandler.all(this.query, {day: this.day.toLowerCase()});
            return results;
        } catch(err) {
            console.log(err);
        }
    }
}