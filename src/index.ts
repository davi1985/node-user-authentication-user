import express from 'express';
import { statusRoute } from './routes/status.route';
import { usersRoute } from './routes/users.route';

// Global Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use(usersRoute);
app.use(statusRoute);

// Server start
app.listen(3333, () => console.log('Server is runnning'));
