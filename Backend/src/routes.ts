import { Router } from 'express';
import { CreateProductController } from './controllers/CreateProductController';
import { FindProductController } from './controllers/FindProductController';

const router = Router();

const createProductController = new CreateProductController();
const findProductController = new FindProductController();

router.post("/products", createProductController.handle);
router.get("/products/findByName", findProductController.handle);

export { router }