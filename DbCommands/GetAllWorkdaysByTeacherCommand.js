module.exports = class GetAllWorkdaysByTeacherCommand {
    
    constructor(teacher){
        this.teacher = teacher;
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
                teachers.name = $teacher
            `
    execute(DbHandler) {

        try {
            let results = DbHandler.all(this.query, {teacher: this.teacher});
            return results;
        } catch(err) {
            console.log(err);
        }
    }
}