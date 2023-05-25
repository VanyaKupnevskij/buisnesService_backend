import IAction from '../IAction.js';

import RecordService from '../../services/RecordService.js';
import RecordRepository from '../../repositories/RecordRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';
import UID from '../../lib/UID.js';

class GetAllRecordsAction extends IAction {
  constructor() {
    super();

    this.service = new RecordService(new RecordRepository());
  }

  run = async (req, res) => {
    const { owner_id } = this.validate(req.user.id);

    const items = await this.service.getAll({ owner_id });

    return res.json(items);
  };

  validate(input) {
    const owner_id = input;

    if (!UID.isValid(owner_id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', owner_id, 'is invalid'));
    }

    return { owner_id };
  }
}

export default GetAllRecordsAction;
