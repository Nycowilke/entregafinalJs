
let menuPlatoPrincipal = [];
let menuAcompanamiento = [];
let menuBebidas = [];

class Producto {
  constructor(nombre, precio, id, img) {
    (this.nombre = nombre),
      (this.precio = precio),
      (this.id = id),
      (this.img = img);
  }
}

let alitas = menuPlatoPrincipal.push(new Producto("Alitas de Pollo", 3800, "ALI", "/assets/images/menu/wings.jpg"));
let pechuga = menuPlatoPrincipal.push(new Producto("Pechuga de Pollo", 6000, "PECH", "/assets/images/menu/breast.jpg"));
let hamburg = menuPlatoPrincipal.push(new Producto("Hamburguesa de Pollo", 9500, "HAMB", "/assets/images/menu/burger.jpg"));
let papas = menuAcompanamiento.push(new Producto("Papas Fritas", 4500, "PAPAS", "/assets/images/menu/fries.jpg"));
let arosCebolla = menuAcompanamiento.push(new Producto("Aros de Cebolla", 400, "AROS", "/assets/images/menu/onionRings.jpg"));
let agua = menuBebidas.push(new Producto("Agua Mineral", 3500, "AGUA", "/assets/images/menu/water.jpg"));
let gaseosa = menuBebidas.push(new Producto("Gaseosa", 1800, "GASEO", "/assets/images/menu/soda.jpg"));
let cerveza = menuBebidas.push(new Producto("Porrón de Cerveza", 3000, "CERV", "/assets/images/menu/beer.jpg"));
