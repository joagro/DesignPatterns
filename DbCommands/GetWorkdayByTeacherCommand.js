module.exports = class GetWorkdayByTeacherCommand {

    constructor(day, teacher){
        this.day = day;
        this.teacher = teacher;
    }
    query = `
            SELECT
                teachers.id as personid,
                teachers.name as worker,
                weekdays.name as day, 
                weekdays.start_time as start_time,
                weekdays.end_time as end_time
            FROM
                teachers
            INNER JOIN
                weekdays on weekdays.person_id = teachers.id
            WHERE
                weekdays.name = $day AND teachers.name = $teacher
            `

    execute(DbHandler) {

        try {
            let results = DbHandler.all(this.query, {day: this.day.toLowerCase(), teacher: this.teacher });
            return results[0];
        } catch(err) {
             console.log(err);
        }
    }
}