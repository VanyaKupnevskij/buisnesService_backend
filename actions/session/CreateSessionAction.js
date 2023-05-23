import IAction from '../IAction.js';
import { STATUS } from '../../config/enums.js';

import SessionService from '../../services/SessionService.js';
import SessionRepository from '../../repositories/SessionRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class CreateSessionAction extends IAction {
  constructor() {
    super();

    this.sessionService = new SessionService(new SessionRepository());
  }

  run = async (req, res) => {
    let validData = this.validate(req.body);

    const createdSession = await this.sessionService.create(validData);

    return res.status(STATUS.created).json({
      id: createdSession.id,
      price: createdSession.price,
      date: createdSession.date,
    });
  };

  validate(input) {
    if (!input.halls_id) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Halls_id', halls_id, 'must exist'));
    }
    if (!input.films_id) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Films_id', films_id, 'must exist'));
    }
    if (!input.price) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Price', price, 'must exist'));
    }
    if (!input.date) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Date', date, 'must exist'));
    }
    if (!input.free_place) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Free_place', free_place, 'must exist'));
    }

    return input;
  }
}

export default CreateSessionAction;
