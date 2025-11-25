import { Request, Response } from 'express';
import { productService } from './product.service';
import { asyncHandler } from '../../common/asyncHandler';
import { sendResponse } from '../../common/responseHandler';

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const result = await productService.create(req.body);
  sendResponse(res, 201, result, 'Product created successfully');
});

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const result = await productService.findAll();
  sendResponse(res, 200, result, 'Products retrieved successfully');
});
