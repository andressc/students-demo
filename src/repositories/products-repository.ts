const products = [
    {id: 1, title: 'potato'},
    {id: 2, title: 'tomato'},
    {id: 3, title: 'carrot'},
    {id: 4, title: 'melon'},
    {id: 5, title: 'lemon'},
];

export const productsRepository = {
    findProducts(title: string | null | undefined) {
        if(title) {
            return products.filter(p => p.title.indexOf(title) > -1);
        }

        return products;
    },

    getProductById(id: number) {
        return products.filter(v => v.id === id);
    },

    deleteProduct(id: number) {
        for(let i=0; i< products.length; i++) {
            if(products[i].id === id) {
                products.splice(i, 1);
                return true;
            }
        }

        return false;
    },

    updateProduct(id: number, title: string) {
        const product = products.find(p => p.id === id)
        if(product) {
            product.title = title
            return product;
        }

        return false
    },

    createProduct(title: string) {
        const newProduct = {
            id: +(new Date()),
            title
        };
        products.push(newProduct);
        return newProduct;
    }
}