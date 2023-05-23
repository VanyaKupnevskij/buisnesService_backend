import IEntity from './IEntity.js';

class RoleEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.actor = null;
  }
}

export default RoleEntity;
