import IAction from '../IAction.js';

import UID from '../../lib/UID.js';
import CinemaService from '../../services/CinemaService.js';
import CinemaRepository from '../../repositories/CinemaRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class DeleteCinemaAction extends IAction {
  constructor() {
    super();

    this.cinemaService = new CinemaService(new CinemaRepository());
  }

  run = async (req, res) => {
    const { id } = this.validate(req.params);

    await this.cinemaService.deleteById(id);

    return res.json({ success: true, message: `Seccesful deleted cinema by id: ${id}` });
  };

  validate(input) {
    const { id } = input;

    if (!UID.isValid(id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', id, 'is invalid'));
    }

    return { id };
  }
}

export default DeleteCinemaAction;
