import {app} from './app.js';
import dotenv from 'dotenv';

dotenv.config();
import {initDatabase} from "./db/init.js";

try {
    await initDatabase();
    const PORT = process.env.PORT ?? 3000;
    app.listen(PORT);
    console.info(`Express Server listening on port ${PORT}`);
} catch (err) {
    console.error(`Couldn't initialise database: Server not started. Errors: ${JSON.stringify(err)}`)
}