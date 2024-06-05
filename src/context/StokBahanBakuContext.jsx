import { createContext, useState, useEffect } from "react";

export const BahanContext = createContext();

export const BahanProvider = ({ children }) => {
    const [stokBahan, setStokBahan] = useState(() => {
        const storedStokBahan = localStorage.getItem('stokBahan');
        return storedStokBahan ? JSON.parse(storedStokBahan) : [];
    });

    const updateStokBahan = (newStokBahan) => {
        setStokBahan(newStokBahan);
        localStorage.setItem('stokBahan', JSON.stringify(newStokBahan));
    };

    const addCheck = (order) => {
        const updatedStokBahan = [...stokBahan]; // Clone the array

        order.products.forEach((product) => {
            product.tblresep.tbldetailresep.forEach((ingredient) => {
                console.log(ingredient);
                const existingBahanIndex = updatedStokBahan.findIndex((item) => item.ID_Bahan_Baku === ingredient.ID_Bahan_Baku);

                if (existingBahanIndex !== -1) {
                    updatedStokBahan[existingBahanIndex].Kuantitas += ingredient.pivot.Kuantitas; // Add quantity if ingredient exists
                } else {
                    updatedStokBahan.push({ ...ingredient, Kuantitas: ingredient.pivot.Kuantitas }); // Add new ingredient
                }
            });
        });

        updateStokBahan(updatedStokBahan);
    };

    const removeCheck = (order) => {
        const updatedStokBahan = [...stokBahan]; // Clone the array

        order.products.forEach((product) => {
            product.tblresep.tbldetailresep.forEach((ingredient) => {
                const existingBahanIndex = updatedStokBahan.findIndex((item) => item.ID_Bahan_Baku === ingredient.ID_Bahan_Baku);

                if (existingBahanIndex !== -1) {
                    updatedStokBahan[existingBahanIndex].Kuantitas -= ingredient.pivot.Kuantitas; // Subtract quantity if ingredient exists
                    if (updatedStokBahan[existingBahanIndex].Kuantitas <= 0) {
                        updatedStokBahan.splice(existingBahanIndex, 1); // Remove ingredient if quantity is zero or less
                    }
                }
            });
        });

        updateStokBahan(updatedStokBahan);
    };

    useEffect(() => {
        localStorage.setItem('stokBahan', JSON.stringify(stokBahan));
    }, [stokBahan]);

    useEffect(() => {
        const storedStokBahan = localStorage.getItem('stokBahan');
        if (storedStokBahan) {
            setStokBahan(JSON.parse(storedStokBahan));
        }
    }, []);

    return (
        <BahanContext.Provider
            value={{
                stokBahan,
                addCheck,
                removeCheck
            }}
        >
            {children}
        </BahanContext.Provider>
    );
};

// import { useContext, createContext, useState, useEffect} from "react";

// export const BahanContext = createContext();

// export const BahanProvider = ({children}) => {
//     const [stokBahan, setStokBahan] = useState(localStorage.getItem('stokBahan') ? JSON.parse(localStorage.getItem('stokBahan')) : []);

//     const updateStokBahan = (newStokBahan) => {
//         setStokBahan(newStokBahan);
//         localStorage.setItem('stokBahan', JSON.stringify(newStokBahan));
//     };

//     const addCheck = (order) => {
//         //const updatedStokBahan = { ...stokBahan };

//         order.products.forEach((product) => {
//             product.tblresep.tbldetailresep.forEach((ingredient) => {
//                 console.log(ingredient);
//                 const existingBahan = stokBahan.find((item) => item.ID_Bahan_Baku === ingredient.ID_Bahan_Baku);
                

//                 if (existingBahan) {
//                     setStokBahan(
//                         stokBahan.map((bahan) => 
//                             bahan.ID_Bahan_Baku === ingredient.ID_Bahan_Baku
//                             ? { ...bahan, Kuantitas: ingredient.pivot.Kuantitas}
//                             : bahan
//                         )
//                     );
//                 } else {
//                     setStokBahan([ ...stokBahan, { ...ingredient, Kuantitas: ingredient.pivot.Kuantitas}]);
//                 }
//             })
//         });

//         //updateStokBahan(updatedStokBahan);
//     };

//     const removeCheck = (order) => {
//         const updatedStokBahan = { ...stokBahan };

//         order.products.forEach((product) => {
//             product.tblresep.tbldetailresep.forEach((ingredient) => {
//                 const existingBahan = stokBahan.find((item) => item.ID_Bahan_Baku === ingredient.ID_Bahan_Baku);

//                 if (existingBahan) {
//                     existingBahan.Kuantitas -= ingredient.pivot.Kuantitas;
//                     if (existingBahan.Kuantitas <= 0) {
//                         const index = updatedStokBahan.indexOf(existingProduct);
//                         updatedStokBahan.splice(index, 1);
//                     }
//                 }
//             })
//         });

//         updateStokBahan(updatedStokBahan);
//     }

//     useEffect(() => {
//         localStorage.setItem("stokBahan", JSON.stringify(stokBahan));
//     }, [stokBahan]);

//     useEffect(() => {
//         const stokBahan = localStorage.getItem("stokBahan");
//         if (stokBahan) {
//             setStokBahan(JSON.parse(stokBahan));
//         }
//     }, []);

//     return (
//         <BahanContext.Provider
//             value={{
//                 stokBahan,
//                 addCheck,
//                 removeCheck
//             }}
//         >
//             {children}
//         </BahanContext.Provider>
//     );
// }