import IAction from '../IAction.js';
import { ROLES, STATUS } from '../../config/enums.js';

import AuthService from '../../services/AuthService.js';
import UserRepository from '../../repositories/UserRepository.js';
import AppError, { ERROR_PRESETS } from '../../errors/AppError.js';

class RegistrationAction extends IAction {
  constructor() {
    super();

    this.authService = new AuthService(new UserRepository());
  }

  get accessTag() {
    return 'auth:registration';
  }

  run = async (req, res) => {
    const { email, password, role } = this.validate(req.body);

    const createdUser = await this.authService.registration(email, password, role);

    return res
      .status(STATUS.created)
      .json({ id: createdUser.id, email: createdUser.email, role: createdUser.role });
  };

  validate(input) {
    const { email, password, role } = input;

    const regexEmail = /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i;

    const regexPassword = {
      number: { reg: /^(?=.*\d)/gm, message: 'must contain 1 number (0-9)' },
      bigLetter: { reg: /^(?=.*[A-Z])/gm, message: 'must contain 1 uppercase letters' },
      smallLetter: { reg: /^(?=.*[a-z])/gm, message: 'must contain 1 lowercase letters' },
      nonAlpha: {
        reg: /^(?=.*[^\w\d\s:])/gm,
        message: 'must contain 1 non-alpha numeric number',
      },
      length: { reg: /^([^\s]){8,16}$/gm, message: 'must have 8-16 characters with no space' },
    };

    if (!email) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Email', email, 'must exist'));
    }
    if (!password) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Password', password, 'must exist'));
    }
    if (!Object.values(ROLES).includes(role)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Role', role, 'not found'));
    }

    if (!regexEmail.test(email)) {
      throw new AppError(ERROR_PRESETS.INVALID_INPUT('Email', email, "isn't correct. Check it"));
    }

    for (let regex of Object.values(regexPassword)) {
      if (!regex.reg.test(password)) {
        throw new AppError(ERROR_PRESETS.INVALID_INPUT('Password', null, regex.message));
      }
    }

    return { email, password, role };
  }
}

export default RegistrationAction;
