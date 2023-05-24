import IAction from '../IAction.js';

import CinemaService from '../../services/CinemaService.js';
import CinemaRepository from '../../repositories/CinemaRepository.js';

class GetAllCinemasAction extends IAction {
  constructor() {
    super();

    this.cinemaService = new CinemaService(new CinemaRepository());
  }

  run = async (req, res) => {
    const cinemas = await this.cinemaService.getAll();

    return res.json(cinemas);
  };

  validate(input) {}
}

export default GetAllCinemasAction;
