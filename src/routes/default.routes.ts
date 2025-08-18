import { Router} from 'express';
import { NOT_FOUND } from '../core/constants/http-status.constants';

const router = Router();

router.use((req, res) => {
  res.status(NOT_FOUND).json({ error: 'Not Found' });
});

export default router;