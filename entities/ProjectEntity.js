import IEntity from './IEntity.js';

class ProjectEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.name = null;
    this.category = '';
    this.owner_id = null;
    this.records = [];
  }
}

export default ProjectEntity;
