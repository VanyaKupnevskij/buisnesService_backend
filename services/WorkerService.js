import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import WorkerEntity from '../entities/WorkerEntity.js';
import CostEntity from '../entities/CostEntity.js';

class WorkerService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (itemData) => {
    const findedItem = (await this.repository.findByName(itemData.full_name, itemData.owner_id))[0];
    if (findedItem) {
      throw new AppError(ERROR_PRESETS.CREATE(itemData.full_name));
    }

    if (itemData.cost) {
      let cost = new CostEntity();
      cost.price = itemData.price;
      cost.already_paid = itemData.already_paid;

      itemData.cost = cost;
    }

    let item = new WorkerEntity();
    item.full_name = itemData.full_name;
    item.money_account = itemData.money_account;
    item.halls = itemData.halls;

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