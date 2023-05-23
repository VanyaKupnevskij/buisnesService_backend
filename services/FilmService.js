import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import FilmEntity from '../entities/FilmEntity.js';
import RoleEntity from '../entities/RoleEntity.js';
import ActorEntity from '../entities/ActorEntity.js';

class FilmService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (filmData) => {
    const findedFilm = (await this.repository.findByName(filmData.name))[0];
    if (findedFilm) {
      throw new AppError(ERROR_PRESETS.CREATE(filmData.name));
    }

    if (filmData.roles) {
      let roles = filmData.roles.map((role) => {
        let roleEntity = new RoleEntity();
        roleEntity.actor = new ActorEntity();
        roleEntity.actor.full_name = role.actor.full_name;
        return roleEntity;
      });

      filmData.roles = roles;
    }

    let film = new FilmEntity();
    film.name = filmData.name;
    film.director = filmData.director;
    film.operator = filmData.operator;
    film.ganre = filmData.ganre;
    film.duration = filmData.duration;
    film.preview = filmData.preview;
    film.budget = filmData.budget;
    film.roles = filmData.roles;

    const createdFilm = await this.repository.insert(film);

    return createdFilm;
  };

  getAll = async () => {
    const films = await this.repository.getAll();

    return films;
  };

  getById = async (id) => {
    const film = await this.repository.getById(id);

    return film;
  };

  deleteById = async (id) => {
    const isSeccessful = await this.repository.delete(id);
    if (!isSeccessful) {
      throw new AppError(ERROR_PRESETS.DELETE_ENTITY_BY_ID(id));
    }
  };
}

export default FilmService;
