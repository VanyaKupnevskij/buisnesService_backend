import IEntity from './IEntity.js';

class ActorEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.full_name = '';
  }
}

export default ActorEntity;
