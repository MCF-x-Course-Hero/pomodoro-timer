const {NotFoundError, BadRequestError} = require("../utils/errors")
const db = require("../db")

class Task{
    static async createTask(taskInfo, userInfo){
        /* this function will be responsible for adding a task for the first time*/
        const requiredFields = [ "task" ]
        requiredFields.forEach(field => {
            if (!taskInfo.hasOwnProperty(field)){

                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })
        const result = await db.query(`INSERT INTO userTasks (
            task,
            is_completed,
            user_id
        )
        VALUES ($1, $2, $3)
        RETURNING id, task, is_completed, created_at;
        `, [taskInfo.task, taskInfo.is_completed, userInfo.id])

        const tasks = result.rows[0]
        return tasks
    }
    static async listPendingTask(userInfo){
    /* gets list of tasks that the user has not completed */
    const result = await db.query(`SELECT * FROM userTasks WHERE is_completed = $1;`, [userInfo.id]);
    }
 

    static async updateTask(){
    /* this function will update the following task attributes: 
       is_completed, the task itself (name of the task). 
       
       post or put*/

    }
    
    static async listCompletedTask(){
    /*  this function will get completed tasks from the database
        to display in task history */

    }

    static async removeTask(){
        /* this function will delete task if the user decides to */

    }

}

module.exports = Task



