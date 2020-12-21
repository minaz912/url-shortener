import { Router } from 'express';
import { encode, decode } from '../controllers';

export const router = Router();

router.post('/encode', encode);

router.get('/decode', decode);
