
 DROP TABLE usersLakes;
 DROP TABLE stockingReport;
 DROP TABLE lakes;
 DROP TABLE counties;
 DROP TABLE users;

CREATE TABLE IF NOT EXISTS users (
    id INT UNSIGNED AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(11),
    lastLogin DATETIME,
    lastNotification DATETIME,
    sendText BOOLEAN,
    sendEmail BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS counties (
    id INT UNSIGNED AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    shortName VARCHAR(4) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS lakes (
    id INT UNSIGNED AUTO_INCREMENT,
    countyId INT UNSIGNED NOT NULL,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (countyId) REFERENCES counties(id)
);

CREATE TABLE IF NOT EXISTS usersLakes (
    userId INT UNSIGNED NOT NULL,
    lakeId INT UNSIGNED NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (lakeId) REFERENCES lakes(id)
);

CREATE TABLE IF NOT EXISTS stockingReport (
    id INT UNSIGNED AUTO_INCREMENT,
    lakeId INT UNSIGNED NOT NULL,
    date DATETIME NOT NULL,
    number INT NOT NULL,
    size FLOAT NOT NULL,
    species VARCHAR(32),
    notes TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (lakeId) REFERENCES lakes(id)
);