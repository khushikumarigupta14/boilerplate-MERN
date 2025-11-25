import { Router } from 'express';
import { createProduct, getProducts } from './product.controller';

const router = Router();

router.post('/', createProduct);
router.get('/', getProducts);

export const productRoutes = router;
