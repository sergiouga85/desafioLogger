// controllers/errorController.js
import  {errorService} from '../services/error.service.js';

export const handleError = (errorCode, additionalInfo, res) => {
  const errorMessage = errorService.customizeError(errorCode, additionalInfo);
  res.status(400).json({ error: errorMessage });
};