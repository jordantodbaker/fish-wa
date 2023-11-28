 --DROP TABLE users;
 --DROP TABLE lakes;
 --DROP TABLE counties;

CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(11) NOT NULL ,
    salt VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS counties (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    shortName VARCHAR(4) NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO counties (name, shortName) VALUES 
('Asotin', 'ASOT'), 
('Benton', 'BENT'), 
('Chelan', 'CHEL'),
('Clallam', 'CLAL'),
('Clark', 'CLAR'),
('Columbia', 'COLU'),
('Cowlitz', 'COWL'),
('Douglas', 'DOUG'),
('Ferry', 'FERR'),
('Franklin', 'FRAN'),
('Grant', 'GRAN'),
('Grays Harbor', 'GRAY'),
('Island', 'ISLA'),
('Jefferson', 'JEFF'),
('King', 'KING'),
('Kitsap', 'KITS'),
('Kittitas', 'KITT'),
('Klickitat', 'KLIC'),
('Lewis', 'LEWI'),
('Lincoln', 'LINC'),
('Mason', 'MASO'),
('Okanogan', 'OKAN'),
('Pacific', 'PACI'),
('Pend Oreille', 'PEND'),
('Pierce', 'PIER'),
('San Juan', 'SAN'),
('Skagit', 'SKAG'),
('Skamania', 'SKAM'),
('Snohomish', 'SNOH'),
('Spokane', 'SPOK'),
('Stevens', 'STEV'),
('Thurston', 'THUR'),
('Walla Walla', 'WALL'),
('Whatcom', 'WHAT'),
('Whitman', 'WHIT'),
('Yakima', 'YAKI');

CREATE TABLE IF NOT EXISTS lakes (
    id INT UNSIGNED AUTO_INCREMENT,
    countyId INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (countyId) REFERENCES counties(id)
);