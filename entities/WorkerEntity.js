import IEntity from './IEntity.js';

class WorkerEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.full_name = null;
    this.money_account = null;
    this.realm = null;
    this.salary = 0;
    this.owner_id = null;
    this.costs = [];
  }
}

export default WorkerEntity;
