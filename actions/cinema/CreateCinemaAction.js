import IAction from '../IAction.js';
import { STATUS } from '../../config/enums.js';

import CinemaService from '../../services/CinemaService.js';
import CinemaRepository from '../../repositories/CinemaRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class CreateCinemaAction extends IAction {
  constructor() {
    super();

    this.cinemaService = new CinemaService(new CinemaRepository());
  }

  run = async (req, res) => {
    let validData = this.validate(req.body);

    const createdCinema = await this.cinemaService.create(validData);

    return res
      .status(STATUS.created)
      .json({ id: createdCinema.id, name: createdCinema.name, adress: createdCinema.adress });
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

export default CreateCinemaAction;
