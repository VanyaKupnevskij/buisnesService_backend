import IEntity from './IEntity.js';

class HallEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.number = 0;
    this.seats = 0;
    this.sessions = [];
  }
}

export default HallEntity;
