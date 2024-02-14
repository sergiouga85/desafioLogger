import { usersDao } from '../dao/index.js';
import { appendJwtAsCookie } from './authentication.business.js';
import { logger} from '../utils/logger.js'; // Ajusta la ruta correctamente
import { UserDTO } from '../dto/userDto.js';

export const registerUser = async (req, res, next) => {
  try {
    // Hacer algo...
    appendJwtAsCookie,
    res['successfullPost'](req.user);

    // Loggear información
    req.logger.info('Usuario registrado correctamente:'+ req.user);
  } catch (error) {
    // Loggear errores
    req.logger.error('Error al registrar usuario:'+ error.message);
    next(error);
  }
}

export const getCurrentUser = async (req, res, next) => {
  try {
    // Hacer algo...
    const userDTO = new UserDTO(req.user);
    res['successfullGet'](userDTO);

    // Loggear información
    
    req.logger.info("Obteniendo información del usuario:" + userDTO.email);
  } catch (error) {
    // Loggear errores
    req.logger.error('Error al obtener información del usuario:'+ error.message);
    next(error);
  }
}

export const getAllUsers = async (req, res, next) => {
  try {
    // Hacer algo...
    authorizationMiddleware(['admin']);
    const usuarios = await usersDao.findAllUsers();
    res['successfullGet'](usuarios);

    // Loggear información
    req.logger.info('Obteniendo lista de usuarios');
  } catch (error) {
    // Loggear errores
    req.logger.error('Error al obtener lista de usuarios:'+ error.message);
    next(error);
  }
};