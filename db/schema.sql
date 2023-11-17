DROP TABLE users;

CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(11),
    salt VARCHAR(255) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    iterations INT NOT NULL,
    PRIMARY KEY (id)
);