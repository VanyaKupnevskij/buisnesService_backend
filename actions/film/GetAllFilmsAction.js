import IAction from '../IAction.js';

import FilmService from '../../services/FilmService.js';
import FilmRepository from '../../repositories/FilmRepository.js';

class GetAllFilmsAction extends IAction {
  constructor() {
    super();

    this.filmService = new FilmService(new FilmRepository());
  }

  run = async (req, res) => {
    const films = await this.filmService.getAll();

    return res.json(films);
  };

  validate(input) {}
}

export default GetAllFilmsAction;
