import IEntity from './IEntity.js';

class HallEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.records_id = null;

    this.price = null;
    this.already_paid = 0;
  }
}

export default HallEntity;
