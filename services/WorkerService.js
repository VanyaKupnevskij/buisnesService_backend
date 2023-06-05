import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import WorkerEntity from '../entities/WorkerEntity.js';

class WorkerService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (itemData) => {
    const findedItem = (await this.repository.findByName(itemData.full_name, itemData.owner_id))[0];
    if (findedItem) {
      throw new AppError(ERROR_PRESETS.CREATE(itemData.full_name));
    }

    let item = new WorkerEntity();
    item.owner_id = itemData.owner_id;
    item.full_name = itemData.full_name;
    item.money_account = itemData.money_account;
    item.realm = itemData.realm;
    item.salary = itemData.salary;

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

export default WorkerService;
