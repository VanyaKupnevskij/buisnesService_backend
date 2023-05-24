import IEntity from './IEntity.js';

class UserEntity extends IEntity {
  constructor(uid) {
    super(uid);

    this.name = 'NickName';
    this.email = '';
    this.password = '';
  }
}

export default UserEntity;
