const ProductManager = require('./ProductManager');

const myProductManager = new ProductManager();

console.log("Productos al principio:", myProductManager.getProducts());

try {
  const newProduct = myProductManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
  console.log("Producto agregado:", newProduct);
} catch (error) {
  console.error(error.message);
}

console.log("Productos después de agregar uno:", myProductManager.getProducts());

try {
  const productById = myProductManager.getProductById(1); 
  console.log("Producto por ID:", productById);
} catch (error) {
  console.error("Error al obtener producto por ID:", error.message);
}

try {
  const updatedProduct = myProductManager.updateProduct(1, { price: 250 }); 
  console.log("Producto actualizado:", updatedProduct);
} catch (error) {
  console.error("Error al actualizar producto:", error.message);
}

try {
  myProductManager.deleteProduct(1); 
  console.log("Producto eliminado.");
} catch (error) {
  console.error("Error al eliminar producto:", error.message);
}

console.log("Productos después de eliminar uno:", myProductManager.getProducts());