import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import loadQuery from '../queries/loadQuery.js';

const createQuery = loadQuery('records/create');
const getAllQuery = loadQuery('records/getAll');
const updateQuery = loadQuery('records/update');

class RecordRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newData) {
    await connection.query(createQuery, [
      newData.id,
      newData.projects_id,
      newData.owner_id,
      newData.date,
      newData.money_account,
      newData.comment,
      newData.source_from,

      newData.income.id,
      newData.income.price,

      newData.costs.id,
      newData.costs.workers_id,
      newData.costs.price,
      newData.costs.already_paid,
    ]);

    return this.getById(newData.id);
  }

  async update(newData) {
    await connection.query(updateQuery, [
      newData.id,
      newData.projects_id,
      newData.owner_id,
      newData.date,
      newData.money_account,
      newData.comment,
      newData.source_from,
      newData.income.price,
      newData.costs.workers_id,
      newData.costs.price,
      newData.costs.already_paid,
    ]);

    return this.getById(newData.id);
  }

  async getById(id) {
    const [items] = await connection.execute('SELECT * FROM records WHERE id = ?', [id]);

    const item = items[0];
    if (!item) throw new AppError(ERROR_PRESETS.ENTITY_ID_NOT_EXIST(id));

    const [income] = await connection.execute('SELECT * FROM income WHERE records_id = ?', [
      item.id,
    ]);
    const [costs] = await connection.execute('SELECT * FROM costs WHERE records_id = ?', [item.id]);

    item.income = income;
    item.costs = costs;

    return item;
  }

  async getAll(owner_id) {
    const items = await connection.query(getAllQuery, [owner_id]);

    return items[0][1];
  }

  async delete(id) {
    const result = await connection.query('DELETE FROM records WHERE id = ?', [id]);

    return result[0].affectedRows > 0;
  }
}

export default RecordRepository;
