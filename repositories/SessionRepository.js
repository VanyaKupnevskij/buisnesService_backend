import IRepository from './IRepository.js';

import { pool as connection } from '../config/database.mysql.js';
import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import loadQuery from '../queries/loadQuery.js';
import UID from '../lib/UID.js';

const createSessionQuery = loadQuery('createSession');
const getAllSessionQuery = loadQuery('getAllSession');
const buyTicketSessionQuery = loadQuery('buyTicketSession');

class SessionRepository extends IRepository {
  constructor() {
    super();
  }

  async insert(newSession) {
    await connection.query(createSessionQuery, [
      newSession.id,
      newSession.hall.id,
      newSession.film.id,
      newSession.date,
      newSession.price,
      newSession.free_place,
    ]);

    return this.getById(newSession.id);
  }

  async update(id, newSession) {}

  async getById(id) {
    const [sessions] = await connection.execute('SELECT * FROM sessions WHERE id = ?', [id]);

    const session = sessions[0];
    if (!session) throw new AppError(ERROR_PRESETS.ENTITY_ID_NOT_EXIST(id));

    const [halls] = await connection.execute('SELECT id, seats, number FROM halls WHERE id = ?', [
      session.halls_id,
    ]);
    const hall = halls[0];
    if (!hall) {
      throw new AppError({
        ...ERROR_PRESETS.ENTITY_ID_NOT_EXIST(session.halls_id),
        message: `Not found hall by id <${session.halls_id}>.`,
      });
    }

    const [films] = await connection.execute('SELECT * FROM films WHERE id = ?', [
      session.films_id,
    ]);
    const film = films[0];
    if (!film) {
      throw new AppError({
        ...ERROR_PRESETS.ENTITY_ID_NOT_EXIST(session.films_id),
        message: `Not found film by id <${session.films_id}>.`,
      });
    }

    const [roles] = await connection.execute(
      `SELECT actors.full_name FROM actors
          INNER JOIN roles 
            ON roles.actors_id = actors.id
          WHERE roles.films_id = ?`,
      [film.id],
    );
    if (!roles) {
      throw new AppError({
        ...ERROR_PRESETS.ENTITY_ID_NOT_EXIST(film.id),
        message: `Not found roles by id <${film.id}>.`,
      });
    }
    film.roles = roles;

    session.hall = hall;
    session.film = film;

    return session;
  }

  async getAll(date, cinemas_id) {
    const sessions = await connection.query(getAllSessionQuery, [date, cinemas_id]);

    return sessions[0][2];
  }

  async delete(id) {
    const result = await connection.query('DELETE FROM sessions WHERE id = ?', [id]);

    return result[0].affectedRows > 0;
  }

  async find(halls_id, date) {
    const [rows] = await connection.execute(
      'SELECT * FROM sessions WHERE halls_id = ? AND date = ?',
      [halls_id, date],
    );

    return rows;
  }

  async buyTicket(id) {
    const [session] = await connection.execute('SELECT * FROM sessions WHERE id = ?', [id]);

    if (session.length > 0) {
      const uidIncome = UID.create();
      await connection.query(buyTicketSessionQuery, [id, id, uidIncome]);
    }

    return session.length > 0;
  }
}

export default SessionRepository;
