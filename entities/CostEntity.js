import IEntity from './IEntity.js';

class RoleEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.price = null;
    this.already_paid = 0;
    this.records_id = null;
  }
}

export default RoleEntity;
