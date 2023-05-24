import IAction from '../IAction.js';
import { STATUS } from '../../config/enums.js';

import ProjectService from '../../services/ProjectService.js';
import ProjectRepository from '../../repositories/ProjectRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class CreateProjectAction extends IAction {
  constructor() {
    super();

    this.service = new ProjectService(new ProjectRepository());
  }

  run = async (req, res) => {
    let validData = this.validate({
      name: req.body.name,
      category: req.body.category,
      owner_id: req.user.id,
    });

    const createdItem = await this.service.create(validData);

    return res.status(STATUS.created).json({
      id: createdItem.id,
      name: createdItem.name,
      category: createdItem.category,
      owner_id: createdItem.owner_id,
    });
  };

  validate(input) {
    if (!input.name) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Name', input.name, 'must exist'));
    }
    if (!input.category) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Category', input.category, 'must exist'));
    }
    if (!input.owner_id) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Owner_id', input.owner_id, 'must exist'));
    }

    return input;
  }
}

export default CreateProjectAction;
