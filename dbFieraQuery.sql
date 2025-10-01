
-------------------------Crear base de datos-------------------------
create database dbFiera
----------------------- tabla categorias---------------------------
create table category(
idCategory serial UNIQUE NOT NULL PRIMARY KEY,
name varchar(30) NOT NULL
)
------------------------tabla sub categoria--------------------------
create table subCategory(
idSubCategory serial UNIQUE NOT NULL PRIMARY KEY,
idCategory serial NOT NULL REFERENCES category(idCategory),
name varchar(30) NOT NULL
)
------------------------tabla marca--------------------------
create table brand(
idBrand serial UNIQUE NOT NULL PRIMARY KEY,
name varchar(30) NOT NULL
)
------------------------tabla marca y categoría------------------
create table brandAndCategory(
idBrandAndCategory bigSerial UNIQUE NOT NULL PRIMARY KEY,
idSubCategory serial NOT NULL REFERENCES subCategory(idSubCategory),
isBrand serial NOT NULL REFERENCES brand(idBrand)
)
------------------------tabla productos------------------
create table product(
idProduct bigSerial UNIQUE NOT NULL PRIMARY KEY,
idBrandAndCategory bigSerial NOT NULL REFERENCES brandAndCategory(idBrandAndCategory),
name varchar(100) NOT NULL,
urlImage text NOT NULL,
description Text
) 
------------------------tabla estado del producto------------------
create table productState(
idProductState serial UNIQUE NOT NULL PRIMARY KEY,
name varchar(30) NOT NULL
)
------------------------tabla color------------------
create table color(
idColor bigSerial UNIQUE NOT NULL PRIMARY KEY,
name varchar(30) NOT NULL,
hexagecimalCode varchar(10) NOT NULL
)
------------------------tabla publico objetivo------------------
create table publicObjetive(
idPublicObjetive serial UNIQUE NOT NULL,
name varchar(30) NOT NULL
)
------------------------tabla detalles de producto------------------
create table productDetails(
idProductDetails bigSerial UNIQUE NOT NULL PRIMARY KEY,
idProduct bigSerial NOT NULL REFERENCES product(idProduct),
idProductState serial NOT NULL REFERENCES productState(idProductState),
idColor bigSerial NOT NULL REFERENCES color(idColor),
idPublicObjetive serial NOT NULL REFERENCES publicObjetive(idPublicObjetive),
productPrice bigInt NOT NULL,
stock int NOT NULL,
size varchar(50) NOT NULL,
ageRangeRecomended varchar(30)
)
------------------------tabla metodo de pago------------------
create table paymentMethod(
idPaymentMethod serial UNIQUE NOT NULL PRIMARY KEY,
name varchar(30) NOT NULL
)
------------------------tabla orden de venta------------------
create table saleOrder(
idSaleOrder bigSerial UNIQUE NOT NULL PRIMARY KEY,
idPaymentMethod serial NOT NULL REFERENCES paymentMethod(idPaymentMethod),
totalPrice bigInt NOT NULL,
creationDate timeStamp WITHOUT TIME ZONE NOT NULL
)
------------------------tabla item de la orden de venta------------------
create table saleOrderItem(
idSaleOrderItem bigSerial UNIQUE NOT NULL PRIMARY KEY,
idProductDetails bigSerial NOT NULL REFERENCES productDetails(idProductDetails),
idSaleOrder bigSerial NOT NULL REFERENCES saleOrder(idSaleOrder),
productPrice bigInt NOT NULL,
partialPrice bigInt NOT NULL,
quantity int NOT NULL
)
------------------------tabla genero------------------
create table gender(
idGender serial UNIQUE NOT NULL PRIMARY KEY,
name varchar(30) NOT NULL
)
------------------------tabla dirección usuario------------------
create table userAddress(
idUserAddress bigSerial UNIQUE NOT NULL PRIMARY KEY,
name varchar(80) NOT NULL,
address varchar(150) NOT NULL,
city varchar(150) NOT NULL,
postalCode varchar(15) NOT NULL,
details text NOT NULL
)
------------------------tabla usuario------------------
create table users(
idUsers bigSerial UNIQUE NOT NULL PRIMARY KEY,
idAddress bigSerial NOT NULL REFERENCES userAddress(idUserAddress),
idGender serial NOT NULL REFERENCES gender(idGender),
fullName varchar(150) NOT NULL,
email varchar(150) NOT NULL,
password varchar(20) NOT NULL,
age varchar(3) NOT NULL,
registerDate timeStamp WITHOUT TIME ZONE NOT NULL,
modificationDate timeStamp WITHOUT TIME ZONE NOT NULL
)
------------------------tabla carrito de compras------------------
create table shoppingCart(
idShoppingCart bigSerial UNIQUE NOT NULL PRIMARY KEY,
idUsers bigSerial UNIQUE NOT NULL REFERENCES users(idUsers),
modificationDate timeStamp WITHOUT TIME ZONE NOT NULL,
totalPrice bigInt Not NUll
)
------------------------tabla estado del producto------------------
create table state(
idState serial UNIQUE NOT NULL PRIMARY KEY,
name varchar(30) NOT NULL
)
------------------------tabla item carrito de venta------------------
create table shoppingCartItem(
idShoppingCartItem bigSerial UNIQUE NOT NULL PRIMARY KEY,
idProductDetails bigSerial NOT NULL REFERENCES productDetails(idProductDetails),
idShoppingCart bigSerial NOT NULL REFERENCES shoppingCart(idShoppingCart),
idState serial NOT NULL REFERENCES state(idState),
quantity int NOT NULL
)
