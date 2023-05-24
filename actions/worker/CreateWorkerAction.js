import IAction from '../IAction.js';
import { STATUS } from '../../config/enums.js';

import WorkerService from '../../services/WorkerService.js';
import WorkerRepository from '../../repositories/WorkerRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class CreateWorkerAction extends IAction {
  constructor() {
    super();

    this.service = new WorkerService(new WorkerRepository());
  }

  run = async (req, res) => {
    let validData = this.validate({ ...req.body, owner_id: req.user.id });

    const createdItem = await this.service.create(validData);

    return res.status(STATUS.created).json({ ...createdItem });
  };

  validate(input) {
    if (!input.full_name) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Full_name', input.full_name, 'must exist'));
    }
    if (!input.realm) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Realm', input.realm, 'must exist'));
    }
    if (!input.owner_id) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Owner_id', input.owner_id, 'must exist'));
    }

    return input;
  }
}

export default CreateWorkerAction;
