import { useContext, createContext, useState, useEffect} from "react"
import { GetProfile } from "../api/apiCustomer";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);
    const [poin, setDataUser] = useState(localStorage.getItem('poin') ? JSON.parse(localStorage.getItem("poin")) : 0);
    const initialPoin = localStorage.getItem('poin') ? JSON.parse(localStorage.getItem("poin")) : 0;

    const addToCart = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.ID_Produk === item.ID_Produk);

        if (isItemInCart) {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.ID_Produk === item.ID_Produk
                    ? { ...cartItem, Kuantitas: cartItem.Kuantitas + 1}
                    : cartItem
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, Kuantitas: 1 }]);
        }
    };

    const removeFromCart = (item) => {
        console.log(item);
        const isItemInCart = cartItems.find((cartItem) => cartItem.ID_Produk === item.ID_Produk);

        if (isItemInCart.Kuantitas === 1) {
            setCartItems(cartItems.filter((cartItem) => cartItem.ID_Produk !== item.ID_Produk));
        } else {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.ID_Produk === item.ID_Produk
                    ? { ...cartItem, Kuantitas: cartItem.Kuantitas - 1}
                    : cartItem
                )
            );
        }
    };

    const increasePoin = () => {
        setDataUser((prevPoin) => Math.min(prevPoin + 1, initialPoin));
    };

    const decreasePoin = () => {
        setDataUser((prevPoin) => Math.max(prevPoin - 1, 0));
    }

    const removeItem = (item) => {
        setCartItems(cartItems.filter((cartItem) => cartItem.ID_Produk !== item.ID_Produk));
    }

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.Harga * item.Kuantitas, 0);
    };

    const getItemQty = (item) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.ID_Produk === item.ID_Produk);
        return isItemInCart ? isItemInCart.Kuantitas : 0;
    }

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {

        const cartItems = localStorage.getItem("cartItems");
        if (cartItems) {
            setCartItems(JSON.parse(cartItems));
        }
    }, []);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                poin,
                increasePoin,
                decreasePoin,
                addToCart,
                removeFromCart,
                clearCart,
                getCartTotal,
                getItemQty,
                removeItem
            }}
        >
            {children}
        </CartContext.Provider>
    );
}