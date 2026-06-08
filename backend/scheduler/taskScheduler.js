import cron from 'node-cron';
import { TaskModel } from '../models/taskModel.js';
import { LogModel } from '../models/logModel.js';

const executeWorkerLogic = (task) => {
    return new Promise((resolve, reject) => {
        console.log(`[WORKER RUNNING] Starting payload execution for Task ID: ${task.id}`);
        
        // This simulates actual background work (e.g., sending an email, processing data)
        setTimeout(() => {
            const randomFailureChance = Math.random() < 0.15; // 15% execution error simulation
            if (randomFailureChance) {
                reject(new Error("Worker thread execution timed out or exhausted resources."));
            } else {
                resolve(`Task sequence compiled. Output checksum processed: 0x${Math.floor(Math.random() * 100000)}`);
            }
        }, 3000); // Simulated 3-second long-running execution step
    });
};

export const startSchedulerEngine = () => {
    console.log("Scheduler Background Engine initialized successfully.");

    // Run every 30 seconds
    cron.schedule('*/30 * * * * *', () => {
        console.log("[SCHEDULER HEARTBEAT] Scanning database for due tasks...");

        TaskModel.findDueTasks(async (err, tasks) => {
            if (err) {
                console.error("Scheduler engine failed to read database:", err.message);
                return;
            }

            if (tasks.length === 0) return;

            console.log(`Found ${tasks.length} tasks ready for immediate processing.`);

            for (const task of tasks) {
                // 1. Move task status to 'Running' immediately to avoid duplicate processing loops
                TaskModel.updateStatus(task.id, 'Running', (statusErr) => {
                    if (statusErr) return console.error(`Failed to lock status for Task ${task.id}`);

                    // 2. Open an execution log entry
                    LogModel.createEntry(task.id, async (logErr, logId) => {
                        if (logErr) return console.error("Logging generation failed.");

                        try {
                            // 3. Hand off task to worker execution function
                            const processingResult = await executeWorkerLogic(task);
                            
                            // 4. Record successful execution
                            TaskModel.updateStatus(task.id, 'Completed', () => {});
                            LogModel.completeEntry(logId, processingResult, () => {});
                            console.log(`[SUCCESS] Task ID ${task.id} finalized cleanly.`);
                        } catch (executionErr) {
                            // 5. Record execution failure details
                            TaskModel.updateStatus(task.id, 'Failed', () => {});
                            LogModel.failEntry(logId, executionErr.message, () => {});
                            console.error(`[FAILURE] Task ID ${task.id} crashed:`, executionErr.message);
                        }
                    });
                });
            }
        });
    });
};