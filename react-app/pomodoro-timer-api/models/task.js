const {NotFoundError, BadRequestError} = require("../utils/errors")
const db = require("../db")

class Task {

    static async createTask(taskInfo, userInfo){
        /* this function will be responsible for adding a task for the first time*/
        const requiredFields = [ "task", "is_completed" ]
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

    static async fetchUserByUsername(username) {
        if (!username) {
          throw new BadRequestError("No username provided");
        }
        const query = `SELECT * FROM users WHERE username = $1`;
        const result = await db.query(query, [username.toLowerCase()]);
        const user = result.rows[0];
        return user;
      }

    static async listPendingTask(userInfo){
    /* gets list of tasks that the user has not completed */
        const user = await this.fetchUserByUsername(userInfo.username)
        const query = `SELECT * FROM userTasks WHERE is_completed = false AND user_id=${user.id};`
        const result = await db.query(query)
        return result.rows
    }
 
    static async updateTask(taskInfo, userInfo){
    /* this function will update the following task attributes: 
       is_completed, the task itself (name of the task). 
       post or put*/
       const requiredFields = [ "id", "is_completed" ]
       requiredFields.forEach(field => {
           if (!taskInfo.hasOwnProperty(field)){
               throw new BadRequestError(`Missing ${field} in request body.`)
           }
       })
       const query = `UPDATE userTasks SET is_completed = ${!taskInfo.is_completed} WHERE id = ${taskInfo.id} AND user_id = ${userInfo.id};`
       const result = await db.query(query)
       return result.rows[0];
    }

    
    static async getCompletedTask(userInfo){
    /*  this function will get completed tasks from the database
        to display in task history */
        const user = await this.fetchUserByUsername(userInfo.username)
        if (!user) throw new NotFoundError(`no user by ${userInfo.username} found`)
        const query = `SELECT * FROM userTasks WHERE is_completed = true AND user_id=${user.id};`
        const result = await db.query(query)
        return result.rows;
    }

    static async removeTask(taskId){
        /* this function will delete task if the user decides to */
        const query = await db.query(`
            SELECT task
                FROM userTasks
                WHERE id = $1    
            `, [taskId]);
        if (!query.rows[0]) throw new NotFoundError(`Task with id ${taskId} is not found`);
        const result = await db.query(
            `DELETE
                FROM userTasks
                WHERE id = $1`,
            [taskId]
          );
          const deletedTask = result.rows[0];
        }
}

module.exports = Task
