import express from 'express';

import balancerRoutes from './routes/balancer.routes';
import ticketsRoutes from './routes/tickets.routes'
import defaultRoutes from './routes/default.routes';

const app = express();

app.use(express.json());

app.use('/workload', balancerRoutes);
app.use('/tickets', ticketsRoutes)
app.use(defaultRoutes)

export default app;