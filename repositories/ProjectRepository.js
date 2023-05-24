import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import loadQuery from '../queries/loadQuery.js';

const createQuery = loadQuery('project/create');

class ProjectRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newData) {
    await connection.query(createQuery, [
      newData.id,
      newData.name,
      newData.director,
      newData.operator,
      newData.ganre,
      newData.duration,
      newData.preview,
      newData.budget,
      newData.roles.map((role) => [role.actor.id, role.actor.full_name]),
      newData.roles.map((role) => [role.id, role.actor.id, newData.id]),
    ]);

    return this.getById(newData.id);
  }

  async update(id, newData) {}

  async getById(id) {
    const [rows] = await connection.execute('SELECT * FROM projects WHERE id = ?', [id]);

    const film = rows[0];
    if (!film) throw new AppError(ERROR_PRESETS.ENTITY_ID_NOT_EXIST(id));

    return film;
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

  async findByName(name) {
    const [rows] = await connection.execute('SELECT * FROM projects WHERE name = ?', [name]);

    return rows;
  }
}

export default ProjectRepository;
