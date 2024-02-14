
export const errorDictionary = {
    MISSING_FIELD: 'Falta un campo obligatorio.',
    INVALID_DATA: 'Los datos proporcionados son inválidos.',
    PRODUCT_NOT_FOUND: 'El producto no se encuentra.',
    OUT_OF_STOCK: 'El producto está fuera de stock.',
    
  };
  
export const customizeError = (errorCode, additionalInfo = '') => {
    const errorMessage = errorDictionary[errorCode] || 'Error desconocido.';
    return `${errorMessage} ${additionalInfo}`;
}