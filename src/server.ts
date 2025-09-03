import app from './app';
import runMigrations  from './infrastructure/db/migrations';
import config from './config/config';

runMigrations();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});