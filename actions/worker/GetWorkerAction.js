import IAction from '../IAction.js';

import UID from '../../lib/UID.js';
import WorkerService from '../../services/WorkerService.js';
import WorkerRepository from '../../repositories/WorkerRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class GetWorkerAction extends IAction {
  constructor() {
    super();

    this.service = new WorkerService(new WorkerRepository());
  }

  run = async (req, res) => {
    const { id } = this.validate(req.params);

    const item = await this.service.getById(id);

    return res.json({ ...item });
  };

  validate(input) {
    const { id } = input;

    if (!UID.isValid(id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', id, 'is invalid'));
    }

    return { id };
  }
}

export default GetWorkerAction;
