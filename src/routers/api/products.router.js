import {Router} from 'express';
import ProductManager from '../../dao/ProductManager.js';

const router = Router();

router.get('/products', async (req, res) => {
    try {
        const products = await ProductManager.getProducts();
        res.render('products', { products: products.map(p =>p.toJSON()) });
    } catch (error) {
        console.error('No se pudieron traer los productos', error);
        res.status(500).send('Error al cargar productos');
    }
});

router.get('/products/:pid', async (req, res) => {
    try {
        const { params: {pid} } = req;
        const product = await ProductManager.getProductsById(pid)
        const {title, thumbnail, description,price,code,stock} = product
        res.render('product', { title, thumbnail, description,price,code,stock });
    } catch (error) {
        console.error('No se pudo traer el producto', error);
        res.status(500).send('Error al cargar producto');
    }
});

router.get('/createProduct', (req, res) => {
    res.render('createProduct');
});

router.post('/createProduct', async (req, res) => {
    try {
        const { id, title, description, price, thumbnail, code, stock } = req.body;
        const data = { id, title, description, price, thumbnail, code, stock };
        const product = await ProductManager.createProduct(data);
        console.log('Producto creado: ', product);
        res.redirect('/api/products');
    } catch (error) {
        console.error('No se pudo crear el producto', error.message);
        res.status(500).json({ success: false, message: 'Error al crear producto', error});
    }
});

router.get('/deleteProduct', async (req,res)=>{
    res.render('deleteProduct')
})

router.post('/deleteProduct', async (req, res) => {
    try {
        const { _id } = req.body;
        await ProductManager.deleteProductById(_id);
        console.log('Producto Eliminado', _id);
        res.status(204).redirect('/api/products');
    } catch (error) {
        console.error('No se pudo borrar el producto', error);
        res.status(500).send('Error al borrar producto');
    }
});

router.get('/updateProduct', async (req,res)=>{
    res.render('updateProduct')
})

router.post('/updateProduct', async (req, res) => {
    try {
        const { _id , title, description, price, thumbnail, code, stock } = req.body;
        const body = {title, description, price, thumbnail, code, stock};
        const product = await ProductManager.updateProductById(_id,body);
        console.log('Producto Actualizado', product);
        res.status(204).redirect('/api/products');;
    } catch (error) {
        console.error('No se pudo actualizar el producto', error);
        res.status(500).send('Error al actualizar producto');
    }
});


export default router;