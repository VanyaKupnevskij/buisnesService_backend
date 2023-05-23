import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import SessionEntity from '../entities/SessionEntity.js';
import HallEntity from '../entities/HallEntity.js';
import FilmEntity from '../entities/FilmEntity.js';

class SessionService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (sessionData) => {
    const findedSession = (await this.repository.find(sessionData.halls_id, sessionData.date))[0];
    if (findedSession) {
      throw new AppError(ERROR_PRESETS.CREATE([sessionData.halls_id, sessionData.date]));
    }

    let session = new SessionEntity();
    session.hall = new HallEntity(sessionData.halls_id);
    session.film = new FilmEntity(sessionData.films_id);
    session.date = sessionData.date;
    session.price = sessionData.price;
    session.free_place = sessionData.free_place;

    const createdSession = await this.repository.insert(session);

    return createdSession;
  };

  getAll = async (sessionData) => {
    const sessions = await this.repository.getAll(sessionData.date, sessionData.cinemas_id);

    return sessions;
  };

  getById = async (id) => {
    const session = await this.repository.getById(id);

    return session;
  };

  deleteById = async (id) => {
    const isSeccessful = await this.repository.delete(id);
    if (!isSeccessful) {
      throw new AppError(ERROR_PRESETS.DELETE_ENTITY_BY_ID(id));
    }
  };

  buyTicket = async (id) => {
    const isSeccessful = await this.repository.buyTicket(id);
    if (!isSeccessful) {
      throw new AppError(ERROR_PRESETS.BUY_ENTITY_BY_ID(id));
    }
  };
}

export default SessionService;
