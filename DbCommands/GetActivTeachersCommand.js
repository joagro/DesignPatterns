module.exports = class GetActiveTeachersCommand {

    constructor(day){
        this.day = day;
    }

    query = `
            SELECT DISTINCT
                teachers.name
            FROM
                teachers
            INNER JOIN
                weekdays on weekdays.person_id = teachers.id
            `

    execute(DbHandler) {

        try {
            let results = DbHandler.all(this.query);
            return results.map(teacher => teacher.name);
        } catch(err) {
             console.log(err);
        }
    }
}