import { productDao } from '../dao/index.js';
import { ProductService } from '../services/product.service.js';
import { customizeError } from '../services/error.service.js';
import { logger } from '../utils/logger.js'; // Ajusta la ruta correctamente

export const obtenerProductos = async (req, res) => {
    try {
        let opciones = {};
        const filtro = (!req.query.filtro) ? '' : { category: req.query.filtro };
        const itemsPorPagina = (!req.query.itemsPorPagina) ? opciones = { limit: 10, ...opciones } : opciones = { limit: req.query.itemsPorPagina, ...opciones };
        const pagina = (!req.query.pagina) ? opciones = { page: 1, ...opciones } : opciones = { page: req.query.pagina, ...opciones };
        const orden = (!req.query.order) ? '' : opciones = { sort: { 'price': req.query.order }, ...opciones };
        logger.debug(opciones);

        const paginado = await productDao.paginado(filtro, opciones);
        req.logger.debug(paginado);

        const results = {
            status: 'success',
            payload: paginado.docs,
            totalPages: paginado.totalPages,
            prevPage: paginado.prevPage,
            nextPage: paginado.nextPage,
            page: paginado.page,
            hasPrevPage: paginado.hasPrevPage,
            hasNextPage: paginado.hasNextPage,
            prevLink: '',
            nextLink: ''
        };

        res.json(results);

    } catch (error) {
        req.logger.error('Error al obtener productos:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export const obtenerCategorias = async (req, res) => {
    try {
        const categoriasProductos = await productDao.obtenerCategorias();
        res.json(categoriasProductos);
    } catch (error) {
        req.logger.error('Error al obtener categorías de productos:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export const obtenerProductoPorId = async (req, res) => {
    try {
        const productoPorId = await productDao.obtenerProductoPorId(req.params.pid);
        res.json(productoPorId);
    } catch (error) {
        req.logger.error('Error al obtener producto por ID:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export const crearProducto = async (req, res) => {
    try {
        const nuevoProductoData = req.body;

        if (nuevoProductoData.price < 0) {
            const errorCode = 'INVALID_DATA';
            throw new Error(customizeError(errorCode, 'El precio del producto no puede ser negativo.'));
        }

        const nuevoProducto = await ProductService.crearProducto(nuevoProductoData);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        req.logger.error('Error al crear nuevo producto:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export const actualizarProducto = async (req, res) => {
    try {
        const updProducto = await productDao.actualizarProducto(req.params.pid, req.body);
        res.json(updProducto);
    } catch (error) {
        logger.error('Error al actualizar producto por ID:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const delProducto = await productDao.eliminarProducto(req.params.pid);
        res.json(delProducto);
    } catch (error) {
        req.logger.error('Error al eliminar producto por ID:', error.message);
        res.status(500).json({ message: error.message });
    }
};

