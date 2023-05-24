import IAction from '../IAction.js';
import { STATUS } from '../../config/enums.js';

import ProjectService from '../../services/ProjectService.js';
import ProjectRepository from '../../repositories/ProjectRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class CreateProjectAction extends IAction {
  constructor() {
    super();

    this.projectService = new ProjectService(new ProjectRepository());
  }

  run = async (req, res) => {
    let validData = this.validate(req.body);

    const createdFilm = await this.projectService.create(validData);

    return res.status(STATUS.created).json({
      id: createdFilm.id,
      name: createdFilm.name,
      ganre: createdFilm.ganre,
      preview: createdFilm.preview,
    });
  };

  validate(input) {
    if (!input.name) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Name', input.name, 'must exist'));
    }
    if (!input.director) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Director', input.director, 'must exist'));
    }
    if (!input.operator) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Operator', input.operator, 'must exist'));
    }
    if (!input.ganre) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Ganre', input.ganre, 'must exist'));
    }
    if (!input.duration) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Duration', input.duration, 'must exist'));
    }
    if (!input.preview) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Preview', input.preview, 'must exist'));
    }
    if (!input.budget) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Budget', input.budget, 'must exist'));
    }
    if (!input.roles) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Roles', input.roles, 'must exist'));
    }

    return input;
  }
}

export default CreateProjectAction;
