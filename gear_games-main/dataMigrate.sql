DELETE FROM products;
DELETE FROM brands;
DELETE FROM categories;

ALTER SEQUENCE brands_id_seq RESTART WITH 1;
ALTER SEQUENCE products_id_seq RESTART WITH 1;
ALTER SEQUENCE categories_id_seq RESTART WITH 1;

INSERT INTO categories (categoryName) VALUES ('Videojuegos');
INSERT INTO brands (brandName) VALUES ('Nintendo');

INSERT INTO 
    products 
    (
        productName, 
        price, 
        stock, 
        description, 
        image, 
        id_brand, 
        id_category
    ) 
VALUES (
    'Nintendo Switch', 
    239990, 
    100, 
    'Consola de videojuegos portátil y para TV', 
    'https://home.ripley.cl/store/Attachment/WOP/D172/2000363222529/2000363222529_2.jpg', 
    1, 
    1
);

INSERT INTO 
    products 
    (
        productName, 
        price, 
        stock, 
        description, 
        image, 
        id_brand, 
        id_category
    ) 
VALUES (
    'The Legend of Zelda: Breath of the Wild', 
    47990, 
    50, 
    'Juego de aventuras y exploración', 
    'https://falabella.scene7.com/is/image/Falabella/5587019_1?wid=800&hei=800&qlt=70', 
    1, 
    1
);

INSERT INTO 
    products 
    (
        productName, 
        price, 
        stock, 
        description, 
        image, 
        id_brand, 
        id_category
    ) 
VALUES (
    'Mario Kart 8 Deluxe', 
    47990, 
    20, 
    'Juego de carreras multijugador', 
    'https://home.ripley.cl/store/Attachment/WOP/D172/2000363222536/2000363222536_2.jpg', 
    1, 
    1
);

INSERT INTO 
    products 
    (
        productName, 
        price, 
        stock, 
        description, 
        image, 
        id_brand, 
        id_category
    ) 
VALUES (
    'Super Smash Bros. Ultimate', 
    47990, 
    30, 
    'Juego de lucha multijugador', 
    'https://falabella.scene7.com/is/image/Falabella/6859205_1?wid=800&hei=800&qlt=70', 
    1, 
    1
);

INSERT INTO 
    products 
    (
        productName, 
        price, 
        stock, 
        description, 
        image, 
        id_brand, 
        id_category
    ) 
VALUES (
    'Animal Crossing: New Horizons', 
    47990, 
    10, 
    'Juego de simulación de vida en una isla desierta', 
    'https://http2.mlstatic.com/D_NQ_NP_2X_823409-MLA45732677004_042021-V.webp', 
    1, 
    1
);
