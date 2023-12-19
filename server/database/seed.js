const order = `CREATE TABLE cafeorders(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    price INT,
    items VARCHAR(1000),
    address VARCHAR(1000)
)`;