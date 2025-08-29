export default function products(){
  products = [
    {
      name: "Sewing Machine",
      unitPrice: 49999,
      quantityInStock: 8,
      reorderLevel: 9,
      category: "appliances",
      description: "description",
      image: "SewingMachine.jpeg",
    },
    {
      name: "Air Conditional",
      unitPrice: 79900,
      quantityInStock: 18,
      reorderLevel: 9,
      category: "appliances",
      description: "description",
      image: "AC.jpeg",
    }
  ]

  return products;
}
