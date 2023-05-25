import IEntity from './IEntity.js';

class CostEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.records_id = null;
    this.workers_id = null;

    this.price = null;
    this.already_paid = 0;
  }
}

export default CostEntity;
