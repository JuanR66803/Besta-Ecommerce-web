
------------------Crear base de datos--------------
create database db_fiera

-------------------tabla categorias-----------------
create table category(
idCategory bigSerial  PRIMARY KEY,
category_name varchar(30) NOT NULL
)
-------------------tabla sub categorias-----------------
create table sub_category(
id_sub_category bigSerial  PRIMARY KEY,
id_category bigInt NOT NULL REFERENCES category(id_category) ON DELETE CASCADE,
sub_category_name varchar(30) NOT NULL
)
-------------------tabla productos-----------------
create table product(
id_product bigSerial PRIMARY KEY,
id_sub_category bigInt NOT NULL REFERENCES sub_category(id_sub_category)
product_name varchar(100) NOT NULL,
description text,
url_image text NOT NULL
)
-------------------tabla estado del producto-----------------
create table product_state{
id_product_state bigSerial PRIMARY KEY,
product_state_name varchar(30) NOT NULL
}
-------------------tabla color -----------------
crete table color{
id_color bigSerial PRIMARY KEY,
hexagecimal_code varchar(16) NOT NULL
}
-------------------tabla detalles de producto-----------------
create table product_details(
id_product_details bigSerial PRIMARY KEY,
id_product bigInt NOT NULL REFERENCES product(id_product) ON DELETE CASCADE,
id_product_state bigInt NOT NULL REFERENCES product_state(id_product_state) ON DELETE CASCADE,
id_color bigInt NOT NULL REFERENCES color(id_color) ON DELETE CASCADE,
id_public_objetive varchar(50) NOT NULL,
id_expertice varchar(50) NOT NULL ,
product_price bigInt NOT NULL,
stock bigInt NOT NULL,
product_size varchar(50) NOT NULL
)
-------------------tabla metodo de pago-----------------
create table payment_method(
id_payment_method bigSerial PRIMARY KEY,
method_name varchar(30) NOT NULL
)
-------------------tabla orden de venta-----------------
create table sale_order(
id_sale_order bigSerial PRIMARY KEY,
id_payment_method NOT NULL REFERENCES payment_method(id_payment_method),	
total_price bigInt NOT NULL,
creation_date timeStampt WITHOUT TIME ZONE NOT NULL
)
-------------------tabla item de la orden de venta-----------------
create table sale_order_item(
id_sale_order_item bigSerial PRIMARY KEY,
id_product_details bigInt NOT NULL REFERENCES product_details(id_product_details),
id_sale_order bigInt NOT NULL REFERENCES sale_order(id_sale_order),
product_price bigInt NOT NULL,
partial_price bigInt NOT NULL,
quantity int not null
)

-------------------tabla rol-----------------
create table role(
id_role bigSerial PRIMARY KEY,
role_name varchar(20) UNIQUE NOT NULL
)
-------------------tabla generos-----------------
create table gender(
id_gender bigSerial PRIMARY KEY,
gender_name varchar(30) UNIQUE NOT NULL
)
-------------------tabla dirección del usuario-----------------
create table user_address(
id_user_address bigSerial PRIMARY KEY,
address_name varchar(80) NOT NULL UNIQUE,
address varchar(150) NOT NULL,
city varchar(150) NOT NULL,
postal_code varchar(15) NOT NULL,
details text
)
-------------------tabla usuarios-----------------
create table users(
id_users bigSerial PRIMARY KEY,
id_user_address bigInt NOT NULL REFERENCES user_address(id_user_address),
id_gender bigInt NOT NULL REFERENCES gender(id_gender),
id_role bigInt NOT NULL REFERENCES role(id_role),
full_name varchar(150) NOT NULL,
email varchar(150) NOT NULL,
user_password varchar(20) NOT NULL,
phone_number varchar(20) NOT NULL,
register_dare timeStamp WITHOUT TIME ZONE NOT NULL,
modification_date timeStamp WITHOUT TIME ZONE NOT NULL,
birth_date date NOT NULL
)
-------------------tabla carrito de compras-----------------
create table shopping_cart(
id_shopping_cart bigSerial PRIMARY KEY,
id_user bigInt NOT NULL REFERENCES users(id_users), 
modification_date timeStamp WITHOUT TIME ZONE NOT NULL,
total_price bigInt NOT NULL
)
-------------------tabla item state-----------------
create table item_state(
id_state_state bigSerial PRIMARY KEY,
item_state_name varchar(30) NOT NULL
)
-------------------tabla item carrito de compras-----------------
create table shopping_cart_item(
id_shopping_cart_item bigSerial PRIMARY KEY,
id_product_details bigInt NOT NULL REFERENCES product_details(id_product_details),
id_shopping_cart bigInt NOT NULL REFERENCES shoping_cart(id_shopping_cart),
id_item_state bigInt NOT NULL REFERENCES item_state(id_item_state),
quantity int NOT NULL
)
-------------------tabla wish list_products-----------------
create table wish_list_products(
id_wish_list_products bigSerial PRIMARY KEY,
id_users bigInt NOT NULL REFERENCES users(id_users)
)

