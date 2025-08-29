import products from "./products.js";

const productsValue = products()

const productTableBody = document.getElementById('product-table-body')

function convert(cents) {
  let dollars = 0
  dollars = cents / 100;
  return dollars;
}


document.addEventListener('DOMContentLoaded', () => {
  productsValue.forEach((product) => {
    productTableBody.innerHTML += `
      <tr>
        <th><img src=${product.image} height="50px"></th> 
        <th>${product.name}</th>
        <th>${product.quantityInStock}</th>
        <th>${convert(product.unitPrice)}</th>
        <th class="stock-manager-only">Actions</th>
      </tr>`
  })
  
})