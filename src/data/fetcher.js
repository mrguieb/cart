import { ProductStore } from "./ProductStore";

export const fetchData = async () => {

    const json = ["sip_in.json", "papa_italiano.json", "mcdonalds.json"];

    var products = [];

    json.forEach( async category => {

        const products = await fetchProducts(category);

        let categoryName = category.replace(".json", "");
        categoryName = categoryName.replace("_", " ");
        categoryName = uppercaseWords(categoryName);

        const productCategory = {

            name: categoryName,
            slug: category.replace(".json", ""),
            cover: products[0].image,
            products
        };

        ProductStore.update(s => { s.products = [ ...s.products, productCategory ]; });
    });

    return products;
}

const fetchProducts = async category => {

    const response = await fetch(`products/${ category }`);
    const data = await response.json();

    //  Set a product id
    await data.forEach((d, i) => {

        d.id = i + 1;
    });

    return data;
}

const uppercaseWords = words => {

    words = words.toLowerCase()
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');

    return words;
}