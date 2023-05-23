import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import loadQuery from '../queries/loadQuery.js';

const createFilmQuery = loadQuery('createFilm');

class FilmRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newFilm) {
    await connection.query(createFilmQuery, [
      newFilm.id,
      newFilm.name,
      newFilm.director,
      newFilm.operator,
      newFilm.ganre,
      newFilm.duration,
      newFilm.preview,
      newFilm.budget,
      newFilm.roles.map((role) => [role.actor.id, role.actor.full_name]),
      newFilm.roles.map((role) => [role.id, role.actor.id, newFilm.id]),
    ]);

    return this.getById(newFilm.id);
  }

  async update(id, newFilm) {}

  async getById(id) {
    const [rows] = await connection.execute('SELECT * FROM films WHERE id = ?', [id]);

    const film = rows[0];
    if (!film) throw new AppError(ERROR_PRESETS.ENTITY_ID_NOT_EXIST(id));

    return film;
  }

  async getAll() {
    const [rows] = await connection.execute('SELECT id, name, ganre, preview FROM films');

    return rows;
  }

  async delete(id) {
    const result = await connection.query('DELETE FROM films WHERE id = ?', [id]);

    return result[0].affectedRows > 0;
  }

  async findByName(name) {
    const [rows] = await connection.execute('SELECT * FROM films WHERE name = ?', [name]);

    return rows;
  }
}

export default FilmRepository;
