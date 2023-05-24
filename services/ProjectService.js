import AppError, { ERROR_PRESETS } from '../errors/AppError.js';
import BaseService from './BaseService.js';
import ProjectEntity from '../entities/ProjectEntity.js';
import RoleEntity from '../entities/RoleEntity.js';
import ActorEntity from '../entities/ActorEntity.js';

class ProjectService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  create = async (data) => {
    const finded = (await this.repository.findByName(data.name))[0];
    if (finded) {
      throw new AppError(ERROR_PRESETS.CREATE(data.name));
    }

    if (data.roles) {
      let roles = data.roles.map((role) => {
        let roleEntity = new RoleEntity();
        roleEntity.actor = new ActorEntity();
        roleEntity.actor.full_name = role.actor.full_name;
        return roleEntity;
      });

      data.roles = roles;
    }

    let item = new ProjectEntity();
    item.name = data.name;
    item.director = data.director;
    item.operator = data.operator;
    item.ganre = data.ganre;
    item.duration = data.duration;
    item.preview = data.preview;
    item.budget = data.budget;
    item.roles = data.roles;

    const createdItem = await this.repository.insert(item);

    return createdItem;
  };

  getAll = async (owner_id) => {
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

export default ProjectService;
