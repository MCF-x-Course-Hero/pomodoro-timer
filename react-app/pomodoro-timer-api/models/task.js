const {NotFoundError, BadRequestError} = require("../utils/errors")
const db = require("../db")


class Task{

    static async addTask(){
    /* this function will be responsible for adding a task for the first time*/
    }

    static async getPendingTasks(){
    /* gets list of tasks that the user has not completed */
    }
    
    static async getCompletedTasks(){
        /*  this function will get completed tasks from the database
        to display in task history */
    }
    
    static async updateTask(){
    /* this function will update the following task attributes: 
       is_completed, the task itself (name of the task). */   
    }
}


module.exports = Task



