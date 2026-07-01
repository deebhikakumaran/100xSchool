// Problem Statement
// Create a type for a Product with the following properties:
// name (a string)
// price (a number)
type Product = {
    name: string,
    price: number
}
// Create another type for DigitalProduct with the following properties:
// downloadLink (a string)
type DigitalProduct = {
    downloadLink: string
}
// Combine these two types into a new type FullProduct to represent a product that can either be digital or physical. Create an object of type FullProduct and print its details.
type FullProduct = Product & DigitalProduct
// Example Input:
// const fullProduct = {
//     name: "E-book",
//     price: 10,
//     downloadLink: "https://example.com/ebook",
//   };
// console.log(fullProduct);
// Example Output:
// {
//     name: 'E-book',
//     price: 10,
//     downloadLink: 'https://example.com/ebook'
// }
export const fullProduct: FullProduct = {
    name: "E-book",
    price: 10,
    downloadLink: "https://example.com/ebook",
};

console.log(fullProduct)

