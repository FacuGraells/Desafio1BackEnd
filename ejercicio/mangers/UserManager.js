const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = this.loadProducts();
    this.productIdCounter = this.products.length > 0 ? Math.max(...this.products.map(product => product.id)) + 1 : 1;
  }

  loadProducts() {
    try {
      const data = fs.readFileSync('productos.txt', 'utf-8');
      const lines = data.split('\n');
      const products = [];

      lines.forEach((line) => {
        const [id, title, description, price, thumbnail, code, stock] = line.split(',');
        products.push({ id, title, description, price, thumbnail, code, stock });
      });

      return products;
    } catch (error) {
      console.error('Error al cargar productos:', error.message);
      return [];
    }
  }

  saveProducts() {
    const productLines = this.products.map((product) => {
      return `${product.id},${product.title},${product.description},${product.price},${product.thumbnail},${product.code},${product.stock}`;
    });
    const data = productLines.join('\n');
    fs.writeFileSync('productos.txt', data, 'utf-8');
  }

  addProduct(productData) {
    const { title, description, price, thumbnail, code, stock } = productData;

    // Verificar si el código ya existe en la lista de productos
    if (this.products.some((product) => product.code === code)) {
      throw new Error("El producto con el mismo código ya existe.");
    }

    const newProduct = {
      id: this.productIdCounter++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    this.saveProducts();
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
    this.saveProducts();

    return updatedProduct;
  }

  deleteProduct(productId) {
    const initialProductCount = this.products.length;
    this.products = this.products.filter((product) => product.id !== productId);
    if (initialProductCount === this.products.length) {
      throw new Error("Producto no encontrado para eliminar.");
    }
    this.saveProducts();
  }
}

module.exports = ProductManager;