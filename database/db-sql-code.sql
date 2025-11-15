-- Create account_type ENUM
CREATE TYPE account_type AS ENUM ('Client', 'Employee', 'Admin');

-- Create classification table
CREATE TABLE IF NOT EXISTS classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(255) NOT NULL
);

-- Create account table
CREATE TABLE IF NOT EXISTS account (
    account_id SERIAL PRIMARY KEY,
    account_firstname VARCHAR(255) NOT NULL,
    account_lastname VARCHAR(255) NOT NULL,
    account_email VARCHAR(255) NOT NULL UNIQUE,
    account_password VARCHAR(255) NOT NULL,
    account_type account_type DEFAULT 'Client'
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(255) NOT NULL,
    inv_model VARCHAR(255) NOT NULL,
    inv_year INTEGER NOT NULL,
    inv_description TEXT NOT NULL,
    inv_image VARCHAR(255) NOT NULL,
    inv_thumbnail VARCHAR(255) NOT NULL,
    inv_price DECIMAL(10, 2) NOT NULL,
    inv_miles INTEGER NOT NULL,
    inv_color VARCHAR(255) NOT NULL,
    classification_id INTEGER NOT NULL,
    FOREIGN KEY (classification_id) REFERENCES classification(classification_id)
);

-- Insert data into classification table
INSERT INTO classification (classification_name) VALUES
    ('Custom'),
    ('Sport'),
    ('SUV'),
    ('Truck'),
    ('Sedan');

-- Insert data into inventory table
INSERT INTO inventory (
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
) VALUES
    ('Chevy', 'Camaro', 2018, 'If you want to look cool, this is the car you need! This car has great performance at an affordable price. Own it today!', '/images/camaro.jpg', '/images/camaro-tn.jpg', 25000.00, 101, 'Silver', 2),
    ('Batmobile', 'Custom', 2007, 'Ever want to be a super hero? Now you can with the Batmobile. This car is a wonder of performance and design.', '/images/batmobile.jpg', '/images/batmobile-tn.jpg', 65000.00, 29, 'Black', 1),
    ('FBI', 'Surveillance Van', 2016, 'do you like police shows? You will feel right at home in this van, packed with surveillance equipment.', '/images/fbi-van.jpg', '/images/fbi-van-tn.jpg', 35000.00, 19, 'Green', 3),
    ('GM', 'Hummer', 2016, 'Do you have 6 kids and like to go off-roading? The Hummer gives you the small interiors with an engine to get you out of any muddy or rocky situation.', '/images/hummer.jpg', '/images/hummer-tn.jpg', 58000.00, 41, 'Yellow', 3),
    ('Mechanic', 'Cracker Car', 1969, 'Nothing says cool like a vintage car. This car has been completely restored and is ready to show.', '/images/cracker-car.jpg', '/images/cracker-car-tn.jpg', 14000.00, 83, 'Red', 1),
    ('Lamborghini', 'Aventador', 2016, 'Do you like to go fast? This car is for you. This car makes all of your driving dreams come true.', '/images/lambo-adventador.jpg', '/images/lambo-adventador-tn.jpg', 417000.00, 71, 'Blue', 2),
    ('Monster', 'Truck', 1995, 'Most trucks are for working or hauling. This truck is for fun. This beast comes with 60in tires.', '/images/monster-truck.jpg', '/images/monster-truck-tn.jpg', 150000.00, 15, 'Purple', 4),
    ('Cadillac', 'Escalade', 2019, 'This is the ultimate in luxury. This car is loaded with features to make your driving experience a great one.', '/images/escalade.jpg', '/images/escalade-tn.jpg', 75000.00, 41, 'Black', 3),
    ('GM', 'Jeep Wrangler', 2019, 'The Jeep Wrangler is a true off-road vehicle. This car is for those who like to live on the edge.', '/images/jeep-wrangler.jpg', '/images/jeep-wrangler-tn.jpg', 28045.00, 41, 'Orange', 3),
    ('Dodge', 'Charger', 2020, 'This car is for those who like to drive fast. This car is for those who like to drive in style.', '/images/dodge-charger.jpg', '/images/dodge-charger-tn.jpg', 35000.00, 21, 'Red', 5),
    ('Ford', 'F-150', 2021, 'This is Americas most popular truck. This truck is for those who like to work hard and play hard.', '/images/ford-f150.jpg', '/images/ford-f150-tn.jpg', 45000.00, 10, 'Blue', 4);