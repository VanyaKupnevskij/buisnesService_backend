import IEntity from './IEntity.js';

class ProjectEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.name = '';
    this.director = '';
    this.operator = '';
    this.ganre = '';
    this.duration = '';
    this.preview = '';
    this.budget = '';
    this.roles = [];
  }
}

export default ProjectEntity;
