import IAction from '../IAction.js';

import ProjectService from '../../services/ProjectService.js';
import ProjectRepository from '../../repositories/ProjectRepository.js';

class GetAllProjectsAction extends IAction {
  constructor() {
    super();

    this.projectService = new ProjectService(new ProjectRepository());
  }

  run = async (req, res) => {
    const { owner_id } = this.validate(req.user.id);

    const films = await this.projectService.getAll(owner_id);

    return res.json(films);
  };

  validate(input) {
    const { owner_id } = input;

    if (!UID.isValid(id)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Id', id, 'is invalid'));
    }

    return { owner_id };
  }
}

export default GetAllProjectsAction;
