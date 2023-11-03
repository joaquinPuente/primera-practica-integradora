import { Router } from "express";
import CartManager from "../../dao/CartManager.js";

const router = Router();

router.get('/carts', async (req,res)=>{
    const carritos = await CartManager.getCarts();
    res.render('cart', {carritos: carritos.map(p =>p.toJSON())});
});

router.post('/addToCart', async (req, res) => {
    const { productId, cid} = req.body;
    const cartNumber = parseInt(cid);
    try {
        let cart = await CartManager.getCartByCartNumber(cartNumber);
        if (!cart) {
            cart = await CartManager.createCart(cartNumber);
        }
        const updatedCart = await CartManager.addProductToCart(cart._id, productId, 1);
        console.log('Producto agregado al carrito:', productId);
        res.redirect('/api/products');
    } catch (error) {
        console.error('Error al agregar producto al carrito:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.post('/removeFromCart', async (req, res) => {
    const { cartId, productId } = req.body;
    try {
        await CartManager.removeProductFromCart(cartId, productId);
        console.log('Producto eliminado del carrito');
        res.redirect('/api/carts');
    } catch (error) {
        console.error('Error al eliminar producto del carrito', error.message);
        res.status(500).json({ error: 'Error al eliminar producto del carrito' });
    }
});

export default router;