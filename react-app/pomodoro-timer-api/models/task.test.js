const { NotFoundError, BadRequestError, UnauthorizedError } = require("../utils/errors");
const Task = require("./task");
const User = require("./user");
const {
    commonBeforeAll,
    commonBeforeEach,
    commonAfterEach,
    commonAfterAll
} = require("../tests/common");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("Task Models", () => {
    /************* Create Task */
    describe("Test Create Task", () => {
        test("User can successfully create a task to send to the database as pending", async () => {
            const user = await User.login({
                username: "tonyhawk",
                password: "proskater2001"
            });
            const newTask = {
                task: "writing tests",
                is_completed: false
            }
            const task = await Task.createTask(newTask, user);
            expect(task).toEqual({
                id: expect.any(Number),
                task: newTask.task,
                is_completed: newTask.is_completed,
                created_at: expect.any(Date)
            })
        })

        test("Throws an error when proper attributes aren't provided", async () => {
            const user = await User.login({
                username: "tonyhawk",
                password: "proskater2001"
            });
            const newTask = {
                task: "writing tests",
                // is_completed: false
            };
            try {
                await Task.createTask(newTask, user);
            } catch (err) {
                expect(err instanceof BadRequestError).toBeTruthy();
            }
        })
    })

    /************* List Pending Tasks */
    describe("Test List Pending Task", () => {
        test("User can successfully retrieve a list of all their incomplete tasks", async () => {
            const user = await User.login({
                username: "tonyhawk",
                password: "proskater2001"
            });
            const newTask = {
                task: "writing tests",
                is_completed: false
            }
            await Task.createTask(newTask, user);
            const newTask2 = {
                task: "writing even more tests",
                is_completed: true
            }
            await Task.createTask(newTask2, user);
            const newTask3 = {
                task: "writing even even more tests",
                is_completed: false
            }
            await Task.createTask(newTask3, user);
            const pendingTasks = await Task.listPendingTask(user);
            expect(pendingTasks.length).toEqual(2);
        })

        test("User retrieves no task if all tasks are complete", async () => {
            const user = await User.login({
                username: "tonyhawk",
                password: "proskater2001"
            });
            const newTask = {
                task: "writing tests",
                is_completed: true
            }
            await Task.createTask(newTask, user);
            const newTask2 = {
                task: "writing even more tests",
                is_completed: true
            }
            await Task.createTask(newTask2, user);
            const newTask3 = {
                task: "writing even even more tests",
                is_completed: true
            }
            await Task.createTask(newTask3, user);
            const pendingTasks = await Task.listPendingTask(user);
            expect(pendingTasks.length).toEqual(0);
        })
    })

    /************* Update Task */
    describe("Test Update Task", () => {
        test("User can successfully update a task from complete to pending", async () => {
            const user = await User.login({
                username: "tonyhawk",
                password: "proskater2001"
            });
            const newTask = {
                task: "writing tests",
                is_completed: true
            }
            const task = await Task.createTask(newTask, user);
            try {
                const updated = await Task.updateTask(task, user);
            } catch (err) {
                expect(err).toBeFalsy();
            }
        })

        test("User can successfully update a task from pending to complete", async () => {
            const user = await User.login({
                username: "tonyhawk",
                password: "proskater2001"
            });
            const newTask = {
                task: "writing tests",
                is_completed: false
            }
            const task = await Task.createTask(newTask, user);
            try {
                const updated = await Task.updateTask(task, user);
            } catch (err) {
                expect(err).toBeFalsy();
            }
        })

        test("Throws an error when proper attributes aren't provided", async () => {
            const user = await User.login({
                username: "tonyhawk",
                password: "proskater2001"
            });
            const newTask = {
                task: "writing tests",
                is_completed: false
            }
            try {
                const task = await Task.createTask(newTask.is_completed, user);
            } catch (err) {
                expect(err instanceof BadRequestError).toBeTruthy();
            }
        })
    })

    /************* Get Completed Tasks */
    describe("Test Get Completed Tasks", () => {
        test("User can successfully retrieve a list of all their completed tasks", async () => {
            const user = await User.login({
                username: "tonyhawk",
                password: "proskater2001"
            });
            const newTask = {
                task: "writing tests",
                is_completed: true
            }
            await Task.createTask(newTask, user);
            const newTask2 = {
                task: "writing even more tests",
                is_completed: false
            }
            await Task.createTask(newTask2, user);
            const newTask3 = {
                task: "writing even even more tests",
                is_completed: true
            }
            await Task.createTask(newTask3, user);
            const pendingTasks = await Task.getCompletedTask(user);
            expect(pendingTasks.length).toEqual(2);
        })

        test("User retrieves no task if all tasks are incomplete", async () => {
            const user = await User.login({
                username: "tonyhawk",
                password: "proskater2001"
            });
            const newTask = {
                task: "writing tests",
                is_completed: false
            }
            const task1 = await Task.createTask(newTask, user);
            const newTask2 = {
                task: "writing even more tests",
                is_completed: false
            }
            const task2 = await Task.createTask(newTask2, user);
            const newTask3 = {
                task: "writing even even more tests",
                is_completed: false
            }
            const task3 = await Task.createTask(newTask3, user);
            const pendingTasks = await Task.getCompletedTask(user);
            expect(pendingTasks.length).toEqual(0);
        })
    })

    /************* Remove Task */
    describe("Test Remove Task", () => {
        test("User can successfully remove a task from the database", async () => {
            const user = await User.login({
                username: "tonyhawk",
                password: "proskater2001"
            });
            const newTask = {
                task: "writing tests",
                is_completed: false
            }
            const task = await Task.createTask(newTask, user);
            try {
                const deleteTask = await Task.removeTask(task.id);
            } catch (err) {
                expect(err).toBeFalsy();
            }
        })

        test("Throws an error if the task is not found", async () => {
            try {
                const deleteTask = await Task.removeTask(89);
            } catch (err) {
                expect(err instanceof NotFoundError).toBeTruthy();
            }
        })
    })
})