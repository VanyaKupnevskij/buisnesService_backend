import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import loadQuery from '../queries/loadQuery.js';

const createQuery = loadQuery('workers/create');

class WorkerRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newData) {
    await connection.query(createQuery, [
      newData.id,
      newData.owner_id,
      newData.full_name,
      newData.money_account,
      newData.realm,
      newData.salary,
    ]);

    return this.getById(newData.id);
  }

  async update(id, newData) {}

  async getById(id) {
    const [items] = await connection.execute('SELECT * FROM workers WHERE id = ?', [id]);

    const item = items[0];
    if (!item) throw new AppError(ERROR_PRESETS.ENTITY_ID_NOT_EXIST(id));

    const [costs] = await connection.execute('SELECT * FROM costs WHERE workers_id = ?', [item.id]);

    item.costs = costs;

    return item;
  }

  async getAll(owner_id) {
    const [items] = await connection.execute('SELECT * FROM workers WHERE owner_id = ?', [
      owner_id,
    ]);

    return items;
  }

  async delete(id) {
    const result = await connection.query('DELETE FROM workers WHERE id = ?', [id]);

    return result[0].affectedRows > 0;
  }

  async findByName(name, owner_id) {
    const [items] = await connection.execute(
      'SELECT * FROM workers WHERE full_name = ? AND owner_id = ?',
      [name, owner_id],
    );

    return items;
  }
}

export default WorkerRepository;
