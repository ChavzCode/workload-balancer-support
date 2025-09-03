import express from 'express';

import balancerRoutes from './routes/balancer.routes';
import ticketsRoutes from './routes/tickets.routes'
import defaultRoutes from './routes/default.routes';
import assignmentRoutes from "./routes/assignments.routes"

const app = express();

app.use(express.json());

app.use('/workload', balancerRoutes);
app.use('/tickets', ticketsRoutes)
app.use('/assignments', assignmentRoutes);
app.use(defaultRoutes)

// // Global error handler (should be after routes)
// app.use(errorHandler);

export default app;