import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import RecordEntity from '../entities/RecordEntity.js';
import IncomeEntity from '../entities/IncomeEntity.js';
import CostEntity from '../entities/CostEntity.js';

class RecordService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (itemData) => {
    let item = new RecordEntity();
    item.projects_id = itemData.projects_id;
    item.owner_id = itemData.owner_id;
    item.date = itemData.date ?? new Date(Date.now());
    item.money_account = itemData.money_account;
    item.comment = itemData.comment ?? '';
    item.source_from = itemData.source_from;

    item.income = new IncomeEntity();
    item.income.price = itemData.income.price;

    item.costs = new CostEntity();
    item.costs.workers_id = itemData.costs.workers_id;
    item.costs.price = itemData.costs.price;
    item.costs.already_paid = itemData.costs.already_paid;

    const createdItem = await this.repository.insert(item);

    return createdItem;
  };

  update = async (itemData) => {
    let item = new RecordEntity(itemData.id);
    item.projects_id = itemData.projects_id;
    item.owner_id = itemData.owner_id;
    item.date = itemData.date ?? new Date(Date.now());
    item.money_account = itemData.money_account;
    item.comment = itemData.comment ?? '';
    item.source_from = itemData.source_from;

    item.income = new IncomeEntity();
    item.income.price = itemData.income.price;

    item.costs = new CostEntity();
    item.costs.workers_id = itemData.costs.workers_id;
    item.costs.price = itemData.costs.price;
    item.costs.already_paid = itemData.costs.already_paid;

    const updatedItem = await this.repository.update(item);

    return updatedItem;
  };

  getAll = async ({ owner_id }) => {
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

export default RecordService;
