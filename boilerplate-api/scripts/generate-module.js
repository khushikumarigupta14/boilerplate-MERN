"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const moduleName = process.argv[2];
if (!moduleName) {
    console.error('Please provide a module name');
    process.exit(1);
}
const toCamelCase = (s) => s.replace(/-./g, (x) => x[1].toUpperCase());
const toPascalCase = (s) => s.charAt(0).toUpperCase() + toCamelCase(s.slice(1));
const ModuleName = toPascalCase(moduleName);
const moduleNameCamel = toCamelCase(moduleName);
const modulePath = path_1.default.join(__dirname, '../src/modules', moduleName);
if (fs_1.default.existsSync(modulePath)) {
    console.error(`Module ${moduleName} already exists`);
    process.exit(1);
}
fs_1.default.mkdirSync(modulePath, { recursive: true });
fs_1.default.mkdirSync(path_1.default.join(modulePath, 'models'));
fs_1.default.mkdirSync(path_1.default.join(modulePath, 'repositories'));
const templates = {
    controller: `import { Request, Response } from 'express';
import { ${moduleNameCamel}Service } from './${moduleName}.service';
import { asyncHandler } from '../../common/asyncHandler';
import { sendResponse } from '../../common/responseHandler';

export const create${ModuleName} = asyncHandler(async (req: Request, res: Response) => {
  const result = await ${moduleNameCamel}Service.create(req.body);
  sendResponse(res, 201, result, '${ModuleName} created successfully');
});

export const get${ModuleName}s = asyncHandler(async (req: Request, res: Response) => {
  const result = await ${moduleNameCamel}Service.findAll();
  sendResponse(res, 200, result, '${ModuleName}s retrieved successfully');
});
`,
    service: `import { ${moduleNameCamel}Repository } from './repositories/${moduleName}.repository.mongoose';

class ${ModuleName}Service {
  private repository: ${moduleNameCamel}Repository;

  constructor() {
    this.repository = new ${moduleNameCamel}Repository();
  }

  async create(data: any) {
    return await this.repository.create(data);
  }

  async findAll() {
    return await this.repository.findMany({});
  }
}

export const ${moduleNameCamel}Service = new ${ModuleName}Service();
`,
    routes: `import { Router } from 'express';
import { create${ModuleName}, get${ModuleName}s } from './${moduleName}.controller';

const router = Router();

router.post('/', create${ModuleName});
router.get('/', get${ModuleName}s);

export const ${moduleNameCamel}Routes = router;
`,
    interface: `export interface I${ModuleName} {
  name: string;
}
`,
    modelMongoose: `import mongoose, { Schema, Document } from 'mongoose';
import { I${ModuleName} } from '../${moduleName}.interface';

export interface I${ModuleName}Doc extends I${ModuleName}, Document {}

const ${ModuleName}Schema = new Schema<I${ModuleName}Doc>(
  {
    name: { type: String, required: true },
  },
  { timestamps: true },
);

export const ${ModuleName}Model = mongoose.model<I${ModuleName}Doc>('${ModuleName}', ${ModuleName}Schema);
`,
    repoMongoose: `import { IRepository } from '../../../database/repository.interface';
import { I${ModuleName} } from '../${moduleName}.interface';
import { ${ModuleName}Model } from '../models/${moduleName}.model.mongoose';

export class ${ModuleName}Repository implements IRepository<I${ModuleName}> {
  async create(data: Partial<I${ModuleName}>): Promise<I${ModuleName}> {
    const doc = await ${ModuleName}Model.create(data);
    return doc.toObject();
  }

  async findById(id: string): Promise<I${ModuleName} | null> {
    const doc = await ${ModuleName}Model.findById(id);
    return doc ? doc.toObject() : null;
  }

  async findOne(query: any): Promise<I${ModuleName} | null> {
    const doc = await ${ModuleName}Model.findOne(query);
    return doc ? doc.toObject() : null;
  }

  async findMany(query: any): Promise<I${ModuleName}[]> {
    const docs = await ${ModuleName}Model.find(query);
    return docs.map((d) => d.toObject());
  }

  async update(id: string, data: Partial<I${ModuleName}>): Promise<I${ModuleName} | null> {
    const doc = await ${ModuleName}Model.findByIdAndUpdate(id, data, { new: true });
    return doc ? doc.toObject() : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ${ModuleName}Model.findByIdAndDelete(id);
    return !!result;
  }

  async count(query: any): Promise<number> {
    return await ${ModuleName}Model.countDocuments(query);
  }
}
`,
};
fs_1.default.writeFileSync(path_1.default.join(modulePath, `${moduleName}.controller.ts`), templates.controller);
fs_1.default.writeFileSync(path_1.default.join(modulePath, `${moduleName}.service.ts`), templates.service);
fs_1.default.writeFileSync(path_1.default.join(modulePath, `${moduleName}.routes.ts`), templates.routes);
fs_1.default.writeFileSync(path_1.default.join(modulePath, `${moduleName}.interface.ts`), templates.interface);
fs_1.default.writeFileSync(path_1.default.join(modulePath, 'models', `${moduleName}.model.mongoose.ts`), templates.modelMongoose);
fs_1.default.writeFileSync(path_1.default.join(modulePath, 'repositories', `${moduleName}.repository.mongoose.ts`), templates.repoMongoose);
console.log(`Module ${moduleName} created successfully at ${modulePath}`);
