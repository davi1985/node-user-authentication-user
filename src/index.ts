import express from 'express';
import { JWTAuthenticationMiddleware } from './middlewares/jwt-authentication-middleware';
import { errorHandler } from './middlewares/error-handler-middleware';
import { authorizationRoute } from './routes/authorization.route';
import { statusRoute } from './routes/status.route';
import { usersRoute } from './routes/users.route';

// Global Middleware
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routers
app.use(JWTAuthenticationMiddleware, usersRoute);
app.use(statusRoute);
app.use(authorizationRoute);

// Middleware ErrorHandler
app.use(errorHandler);

// Server start
app.listen(3333, () => console.log('Server is runnning'));
