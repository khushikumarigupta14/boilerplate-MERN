import fs from 'fs';
import path from 'path';

const moduleName = process.argv[2];

if (!moduleName) {
    console.error('Please provide a module name');
    process.exit(1);
}

const toCamelCase = (s: string) => s.replace(/-./g, (x) => x[1].toUpperCase());
const toPascalCase = (s: string) => s.charAt(0).toUpperCase() + toCamelCase(s.slice(1));

const ModuleName = toPascalCase(moduleName);
const moduleNameCamel = toCamelCase(moduleName);

const modulePath = path.join(__dirname, '../src/modules', moduleName);

if (fs.existsSync(modulePath)) {
    console.error(`Module ${moduleName} already exists`);
    process.exit(1);
}

fs.mkdirSync(modulePath, { recursive: true });
fs.mkdirSync(path.join(modulePath, 'models'));
fs.mkdirSync(path.join(modulePath, 'repositories'));

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

fs.writeFileSync(path.join(modulePath, `${moduleName}.controller.ts`), templates.controller);
fs.writeFileSync(path.join(modulePath, `${moduleName}.service.ts`), templates.service);
fs.writeFileSync(path.join(modulePath, `${moduleName}.routes.ts`), templates.routes);
fs.writeFileSync(path.join(modulePath, `${moduleName}.interface.ts`), templates.interface);
fs.writeFileSync(path.join(modulePath, 'models', `${moduleName}.model.mongoose.ts`), templates.modelMongoose);
fs.writeFileSync(path.join(modulePath, 'repositories', `${moduleName}.repository.mongoose.ts`), templates.repoMongoose);

console.log(`Module ${moduleName} created successfully at ${modulePath}`);
