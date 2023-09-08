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
  myProductManager.addProduct({
    title: "producto repetido",
    description: "Este producto tiene el mismo código",
    price: 150,
    thumbnail: "Sin imagen",
    code: "abc123", // Repetido
    stock: 10,
  });
} catch (error) {
  console.error("Error al agregar producto repetido:", error.message);
}

try {
  const productById = myProductManager.getProductById(2); // Intentar obtener un producto que no existe
  console.log("Producto por ID:", productById);
} catch (error) {
  console.error("Error al obtener producto por ID:", error.message);
}