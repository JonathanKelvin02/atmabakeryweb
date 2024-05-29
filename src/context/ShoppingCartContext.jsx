import { useContext, createContext, useState, useEffect} from "react"
import { GetProfile } from "../api/apiCustomer";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []);
    const [poin, setDataUser] = useState(localStorage.getItem('poin') ? JSON.parse(localStorage.getItem("poin")) : 0);

    const initialPoin = localStorage.getItem('poin') ? JSON.parse(localStorage.getItem("poin")) : 0;

    const initialDate = new Date();

    const [selectedDate, setSelectedDate] = useState(localStorage.getItem('selectedDate') ? new Date(JSON.parse(localStorage.getItem('selectedDate'))) : initialDate.setDate(initialDate.getDate() + 2));

    const addToCart = (item, size) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.ID_Produk === item.ID_Produk && cartItem.size === size);

        if (isItemInCart) {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.ID_Produk === item.ID_Produk && cartItem.size === size
                    ? { ...cartItem, Kuantitas: Math.min(cartItem.Kuantitas + 1, item.ID_Kategori === 4 ? item.StokReady : item.Stok)}
                    : cartItem
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, size, Kuantitas: 1 }]);
        }
    };

    const removeFromCart = (item, size) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.ID_Produk === item.ID_Produk && cartItem.size === size);

        if (isItemInCart.Kuantitas === 1) {
            setCartItems(cartItems.filter((cartItem) => !(cartItem.ID_Produk === item.ID_Produk && cartItem.size === size)));
        } else {
            setCartItems(
                cartItems.map((cartItem) =>
                    cartItem.ID_Produk === item.ID_Produk && cartItem.size === size
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
        setCartItems(cartItems.filter((cartItem) => !(cartItem.ID_Produk === item.ID_Produk && cartItem.size === item.size)));
    }

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemTotal = item.size === "0.5" 
                ? (item.Harga + 50000) / 2 * item.Kuantitas 
                : item.Harga * item.Kuantitas;
            return total + itemTotal;
        }, 0);
    };

    const getItemQty = (item, size) => {
        const isItemInCart = cartItems.find((cartItem) => cartItem.ID_Produk === item.ID_Produk && cartItem.size === size);
        return isItemInCart ? isItemInCart.Kuantitas : 0;
    };

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("selectedDate", JSON.stringify(selectedDate));
    }, [selectedDate]);

    useEffect(() => {
        const selectedDate = localStorage.getItem("selectedDate");
        if (selectedDate) {
            setSelectedDate(JSON.parse(selectedDate));
        }
    }, [initialDate.setDate(initialDate.getDate() + 2)])

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
                selectedDate,
                increasePoin,
                decreasePoin,
                addToCart,
                removeFromCart,
                clearCart,
                getCartTotal,
                getItemQty,
                removeItem,
                setSelectedDate
            }}
        >
            {children}
        </CartContext.Provider>
    );
}