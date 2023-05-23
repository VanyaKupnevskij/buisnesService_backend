import IAction from '../IAction.js';

import SessionService from '../../services/SessionService.js';
import SessionRepository from '../../repositories/SessionRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';
import UID from '../../lib/UID.js';

class GetAllSessionsAction extends IAction {
  constructor() {
    super();

    this.sessionService = new SessionService(new SessionRepository());
  }

  run = async (req, res) => {
    let validData = this.validate(req.query);

    const sessions = await this.sessionService.getAll(validData);

    return res.json(sessions);
  };

  validate(input) {
    if (!input.date) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Date', input.date, 'must exist'));
    }
    if (!Date.parse(input.date)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Date', input.date, 'is not valid'));
    }

    if (!input.cinemas_id) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Cinemas_id', input.cinemas_id, 'must exist'));
    }
    if (!UID.isValid(input.cinemas_id)) {
      throw new AppError(
        ERROR_PRESETS.INVALID_INPUT('Cinemas_id', input.cinemas_id, 'is not valid'),
      );
    }
    return input;
  }
}

export default GetAllSessionsAction;
