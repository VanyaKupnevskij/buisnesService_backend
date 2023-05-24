import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import loadQuery from '../queries/loadQuery.js';

const createQuery = loadQuery('projects/create');

class ProjectRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newData) {
    await connection.query(createQuery, [
      newData.id,
      newData.owner_id,
      newData.name,
      newData.category,
    ]);

    return this.getById(newData.id);
  }

  async update(id, newData) {}

  async getById(id) {
    const [rows] = await connection.execute('SELECT * FROM projects WHERE id = ?', [id]);

    const item = rows[0];
    if (!item) throw new AppError(ERROR_PRESETS.ENTITY_ID_NOT_EXIST(id));

    return item;
  }

  async getAll(owner_id) {
    const [rows] = await connection.execute('SELECT * FROM projects WHERE owner_id = ?', [
      owner_id,
    ]);

    return rows;
  }

  async delete(id) {
    const result = await connection.query('DELETE FROM projects WHERE id = ?', [id]);

    return result[0].affectedRows > 0;
  }

  async findByName(name, owner_id) {
    const [rows] = await connection.execute(
      'SELECT * FROM projects WHERE name = ? AND owner_id = ?',
      [name, owner_id],
    );

    return rows;
  }
}

export default ProjectRepository;
