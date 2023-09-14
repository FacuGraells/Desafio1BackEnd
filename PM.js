class ProductManager {
  constructor() {
    this.products = [];
    this.productIdCounter = 1;
  }

  generateProductId() {
    return this.productIdCounter++;
  }

  addProduct(productData) {
    const { title, description, price, thumbnail, code, stock } = productData;

    // Verificar si el código ya existe en la lista de productos
    if (this.products.some((product) => product.code === code)) {
      throw new Error("El producto con el mismo código ya existe.");
    }

    const newProduct = {
      id: this.generateProductId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    return newProduct;
  }

  getProducts() {
    return this.products;
  }

  getProductById(productId) {
    const product = this.products.find((product) => product.id === productId);
    if (!product) {
      throw new Error("Producto no encontrado.");
    }
    return product;
  }

  updateProduct(productId, updatedData) {
    const productIndex = this.products.findIndex((product) => product.id === productId);
    if (productIndex === -1) {
      throw new Error("Producto no encontrado para actualizar.");
    }

    const updatedProduct = { ...this.products[productIndex], ...updatedData };
    this.products[productIndex] = updatedProduct;

    return updatedProduct;
  }

  deleteProduct(productId) {
    const initialProductCount = this.products.length;
    this.products = this.products.filter((product) => product.id !== productId);
    if (initialProductCount === this.products.length) {
      throw new Error("Producto no encontrado para eliminar.");
    }
  }
}

// Ejemplo de cómo usar la clase ProductManager con las funcionalidades adicionales
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
  const productById = myProductManager.getProductById(1); // Intentar obtener un producto por ID
  console.log("Producto por ID:", productById);
} catch (error) {
  console.error("Error al obtener producto por ID:", error.message);
}

try {
  const updatedProduct = myProductManager.updateProduct(1, { price: 250 }); // Actualizar el precio del producto
  console.log("Producto actualizado:", updatedProduct);
} catch (error) {
  console.error("Error al actualizar producto:", error.message);
}

try {
  myProductManager.deleteProduct(1); // Eliminar el producto por ID
  console.log("Producto eliminado.");
} catch (error) {
  console.error("Error al eliminar producto:", error.message);
}

console.log("Productos después de eliminar uno:", myProductManager.getProducts());