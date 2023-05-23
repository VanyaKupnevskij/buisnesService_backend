import IAction from '../IAction.js';

import UID from '../../lib/UID.js';
import SessionService from '../../services/SessionService.js';
import SessionRepository from '../../repositories/SessionRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class DeleteSessionAction extends IAction {
  constructor() {
    super();

    this.sessionService = new SessionService(new SessionRepository());
  }

  run = async (req, res) => {
    const { id } = this.validate(req.params);

    await this.sessionService.deleteById(id);

    return res.json({ success: true, message: `Seccesful deleted session by id: ${id}` });
  };

  validate(input) {
    const { id } = input;

    if (!UID.isValid(id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', id, 'is invalid'));
    }

    return { id };
  }
}

export default DeleteSessionAction;
