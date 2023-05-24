import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import ProjectEntity from '../entities/ProjectEntity.js';

class ProjectService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (data) => {
    const finded = (await this.repository.findByName(data.name, data.owner_id))[0];
    if (finded) {
      throw new AppError(ERROR_PRESETS.CREATE(data.name));
    }

    let item = new ProjectEntity();
    item.name = data.name;
    item.category = data.category;
    item.owner_id = data.owner_id;

    const createdItem = await this.repository.insert(item);

    return createdItem;
  };

  getAll = async (owner_id) => {
    const items = await this.repository.getAll(owner_id);

    return items;
  };

  getById = async (id) => {
    const item = await this.repository.getById(id);

    return item;
  };

  deleteById = async (id) => {
    const isSeccessful = await this.repository.delete(id);
    if (!isSeccessful) {
      throw new AppError(ERROR_PRESETS.DELETE_ENTITY_BY_ID(id));
    }
  };
}

export default ProjectService;
