import IAction from '../IAction.js';
import { STATUS } from '../../config/enums.js';

import CinemaService from '../../services/CinemaService.js';
import CinemaRepository from '../../repositories/CinemaRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class CreateWorkerAction extends IAction {
  constructor() {
    super();

    this.service = new CinemaService(new CinemaRepository());
  }

  run = async (req, res) => {
    let validData = this.validate(req.body);

    const createdItem = await this.service.create(validData);

    return res
      .status(STATUS.created)
      .json({ id: createdItem.id, name: createdItem.name, adress: createdItem.adress });
  };

  validate(input) {
    if (!input.name) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Name', input.name, 'must exist'));
    }
    if (!input.adress) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Adress', input.adress, 'must exist'));
    }

    return input;
  }
}

export default CreateWorkerAction;
