import IEntity from './IEntity.js';

class CinemaEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.name = '';
    this.adress = '';
    this.incomes = [];
    this.halls = [];
  }
}

export default CinemaEntity;
