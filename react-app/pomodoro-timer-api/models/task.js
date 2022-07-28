const {NotFoundError, BadRequestError} = require("../utils/errors")
const db = require("../db")

class Task{

    static async getPendingTasks(userInfo){
    /* gets list of tasks that the user has not completed */
    const result = await db.query(`SELECT * FROM userTasks WHERE is_completed = $1;`, [userInfo.id]);
    }
 
    static async addTask(taskInfo, userInfo){
    /* this function will be responsible for adding a task for the first time*/
    const requiredFields = ["task"];
    requiredFields.forEach((field) => {
        if (!taskInfo.hasOwnProperty(field)){
            throw new BadRequestError (`Missing ${field} in request body`);
        }
    });
    const result = await db.query(
        `INSET INTO userTasks(task, created_at, user_id)
         VALUES ($1, $2, $3)
         RETURNING id, user_id, created_at, task;
         `, [taskInfo.task, taskInfo.created_at, userInfo.id]
    ) 
    return result.rows[0]
    }

    static async updateTask(){
    /* this function will update the following task attributes: 
       is_completed, the task itself (name of the task). */

        
    }
    
    static async getCompletedTasks(){
    /*  this function will get completed tasks from the database
        to display in task history */
    }
}


module.exports = Task



