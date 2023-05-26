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

  getAll = async ({ start_date, end_date, owner_id }) => {
    const items = await this.repository.getAll(start_date, end_date, owner_id);

    return this.calculateBuisnesValues(items);
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

  calculateBuisnesValues = (records) => {
    let resultRecords = [...records];
    const additionalInfo = {
      year: {},
      month: {},
      day: {},
    };

    for (let record of resultRecords) {
      const year = new Date(record.date).getFullYear();
      const month = new Date(record.date).getMonth() + 1;
      const day = new Date(record.date).getDate();

      additionalInfo.year[year] = {
        income: (additionalInfo.year[year]?.income || 0) + record.income,
        costs: (additionalInfo.year[year]?.costs || 0) + record.costs,
        already_paid: (additionalInfo.year[year]?.already_paid || 0) + record.already_paid,
      };

      additionalInfo.month[month] = {
        income: (additionalInfo.month[month]?.income || 0) + record.income,
        costs: (additionalInfo.month[month]?.costs || 0) + record.costs,
        already_paid: (additionalInfo.month[month]?.already_paid || 0) + record.already_paid,
      };

      additionalInfo.day[day] = {
        income: (additionalInfo.day[day]?.income || 0) + record.income,
        costs: (additionalInfo.day[day]?.costs || 0) + record.costs,
        already_paid: (additionalInfo.day[day]?.already_paid || 0) + record.already_paid,
      };

      for (const [keyYear, infoYear] of Object.entries(additionalInfo.year)) {
        additionalInfo.year[keyYear].margin = infoYear.income - infoYear.costs;
        additionalInfo.year[keyYear].marginality =
          (additionalInfo.year[keyYear].margin / infoYear.income) * 100;
        additionalInfo.year[keyYear].profitability =
          (additionalInfo.year[keyYear].margin / infoYear.income) * 100;
      }
      for (const [keyMonth, infoMonth] of Object.entries(additionalInfo.month)) {
        additionalInfo.month[keyMonth].margin = infoMonth.income - infoMonth.costs;
        additionalInfo.month[keyMonth].marginality =
          (additionalInfo.month[keyMonth].margin / infoMonth.income) * 100;
        additionalInfo.month[keyMonth].profitability =
          (additionalInfo.month[keyMonth].margin / infoMonth.income) * 100;
      }
      for (const [keyDay, infoDay] of Object.entries(additionalInfo.day)) {
        additionalInfo.day[keyDay].margin = infoDay.income - infoDay.costs;
        additionalInfo.day[keyDay].marginality =
          (additionalInfo.day[keyDay].margin / infoDay.income) * 100;
        additionalInfo.day[keyDay].profitability =
          (additionalInfo.day[keyDay].margin / infoDay.income) * 100;
      }
    }

    return { resultRecords, additionalInfo };
  };
}

export default RecordService;
