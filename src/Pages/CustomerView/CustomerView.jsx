//import Component
import TopNavbar from './TopNavbar';
import { CartProvider } from '../../context/ShoppingCartContext';

function CustomerView() {
    return (
        <CartProvider>
            <TopNavbar/>
        </CartProvider>
    )
}

export default CustomerView;