CREATE DATABASE IF NOT EXISTS mySql_Project;

-- שימוש במסד הנתונים שנוצר
USE mySql_Project;

-- מחיקת טבלאות אם הן קיימות
DROP TABLE IF EXISTS passwords;
DROP TABLE IF EXISTS accessoriesInOrder;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS dresses;
DROP TABLE IF EXISTS clients;
DROP TABLE IF EXISTS accessories;
DROP TABLE IF EXISTS turns;
DROP TABLE IF EXISTS workHours;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS turnTypes;
DROP TABLE IF EXISTS roles;

DROP TABLE IF EXISTS disabledTurns;
DROP TABLE IF EXISTS gallery;
DROP TABLE IF EXISTS activityTime;


-- יצירת הטבלאות
CREATE TABLE roles(
      id INT auto_increment PRIMARY KEY,
      type  varchar(12) NOT NULL
);

CREATE TABLE users(
      id INT auto_increment PRIMARY KEY,
      userId varchar(20),
      name varchar(20) NOT NULL,
      email varchar(25) NOT NULL,
      phone1 varchar(10) NOT NULL,
      phone2 varchar(10),
      roleId int NOT NULL,
      FOREIGN KEY (roleId) REFERENCES roles (id)
);

CREATE TABLE clients(
      id INT auto_increment PRIMARY KEY,
      userId int NOT NULL,
      weddingDate date,
      dressStyle varchar(30),
      remarks varchar(30),
      FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE passwords(
      id int auto_increment PRIMARY KEY,
      userId int,
      password varchar(100),
      FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE turnTypes(
      id int auto_increment PRIMARY KEY,
      type varchar(25) NOT NULL
);

CREATE TABLE turns(
      id INT auto_increment PRIMARY KEY,
      date DATE,
      hour int NOT NULL,
      minutes int NOT NULL,
      userId int NOT NULL,
      typeId int NOT NULL,
      FOREIGN KEY(userId) REFERENCES users(id),
      FOREIGN KEY(typeId) REFERENCES turnTypes(id)
);

CREATE TABLE disabledTurns(
      id INT auto_increment PRIMARY KEY,
      date DATE NOT NULL,
	  startTimeHour INT NOT NULL,
      startTimeMinutes INT NOT NULL,
      endTimeHour INT NOT NULL,
      endTimeMinutes INT NOT NULL
);

CREATE TABLE activityTime(
      id INT auto_increment PRIMARY KEY,
      day varchar(10),
      startTimeHour INT NOT NULL CHECK (startTimeHour >= 0 AND startTimeHour <= 23),
      startTimeMinutes INT NOT NULL CHECK (startTimeMinutes >= 0 AND startTimeMinutes <= 59),
      endTimeHour INT NOT NULL CHECK (endTimeHour >= 0 AND endTimeHour <= 23),
      endTimeMinutes INT NOT NULL CHECK (endTimeMinutes >= 0 AND endTimeMinutes <= 59)
);

CREATE TABLE dresses(
      id INT auto_increment PRIMARY KEY,
      model varchar(30),
      price double,
      uses int NOT NULL,
      advancePayment int NOT NULL
);

CREATE TABLE accessories(
      id INT auto_increment PRIMARY KEY,
      type varchar(25) NOT NULL
);

CREATE TABLE orders(
      id INT auto_increment PRIMARY KEY,
      date DATE,
      returnDate date,
      clientId int NOT NULL,
      dressId INT NOT NULL,
      repairs varchar(100) NOT NULL,
      paidInAdvance bool,
      FOREIGN KEY(dressId) REFERENCES dresses(id),
      FOREIGN KEY(clientId) REFERENCES clients(id)
);

CREATE TABLE accessoriesInOrder(
      id INT auto_increment PRIMARY KEY,
      orderId int NOT NULL,
      accessoryId int NOT NULL,
      FOREIGN KEY(orderId) REFERENCES orders(id),
      FOREIGN KEY(accessoryId) REFERENCES accessories(id)
);

CREATE TABLE gallery(
      id INT auto_increment PRIMARY KEY,
      imageUrl varchar(200)
);

CREATE TABLE workHours (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeId INT NOT NULL,
    date DATE,
    startTime varchar(15),
    endTime varchar(15),
    duration int,
    FOREIGN KEY (employeeId) REFERENCES users(id)
);


-- הוספת נתונים לטבלאות roles ו-users
INSERT INTO roles (type) VALUES 
('admin'),
('employee'),
('client');

INSERT INTO users (userId, name, email, phone1, phone2, roleId) VALUES 
('54645776', 'שרה', 'sara@.com', '0501234567', '0549876543', 3),
('5675675', 'רבקה', 'rachel@.com', '0521112233', '0509998877', 3),
('9123456', 'דנה', 'dana@.com', '0502233445', '0547788990', 3),
('6756756', 'טובה', 'tova@.com', '0548887766', '0527778899', 2),
('9012345', 'עדי', 'adi@.com', '0501122334', '0546677889', 2),
('2584156', 'אורית', 'ey3242363@gmail.com', '0548841766', '0520878899', 1);
-- הוספת נתונים לטבלת clients
INSERT INTO clients(userId, weddingDate, dressStyle, remarks) VALUES
(1, '2024-07-11', 'קלאסי', 'חברות'),
(2, '2024-07-09', 'מודרני', 'אחות'),
(3, '2024-06-04', 'בוהו', 'חברות');


-- הוספת נתונים לטבלת passwords
INSERT INTO passwords (userId, password) VALUES
    (  1, '$2a$10$i/cwt/hlYfjw0tXchnmwPe9k56rtGu.B2LhPaiF6m4c22wnQtr.qK' ),
    (   2, '$2a$10$h5C7DJoMV7Xuoa7MAuCva.H/mDz5aNo4EKUSI.kKpuzd0A60mULGS' ),
    (   3,  '$2a$10$GiQHNorjX6nnX5Kdwvbt3.Z5SEQI7oYeYwVBn6awKtWmDab3thvZS' ),
    (  4, '$2a$10$KwM4OcRYS//wQVToN8ug8OWGirnbEsUYj/.ZcofcVr.PXdahVvOeS' ),
    ( 5,  '$2a$10$uMpI0w0BE1e0hi9CrPc/nO2U2a9RDMxv4zVZducCGZb/WGUBMg9bu'  ),
    (  6,  '$2b$10$Mi6ICs1rsUrVA3vwRH7Njuhj1Md21gDCHdbOVgjK7AjBf1DMwPKaC' );
-- הוספת נתונים לטבלת turnTypes
INSERT INTO turnTypes (type) VALUES 
('מדידות'),
('התרשמות');

-- הוספת נתונים לטבלת turns
INSERT INTO turns (date, hour, minutes, userId, typeId) VALUES 
('2024-05-30', 10, 0, 1, 1),
('2024-07-10', 13, 45, 1, 1),
('2024-07-10', 11, 30, 2, 1),
('2024-07-08', 11, 30, 2, 1),
('2024-07-09', 11, 30, 2, 1),
('2024-06-09', 11, 30, 2, 2);

-- הוספת נתונים לטבלת accessories
INSERT INTO accessories (type) VALUES 
('תכשיטים'),
('שיער'),
('הינומה קצרה');

-- הוספת נתונים לטבלת dresses
INSERT INTO dresses (model, price, uses, advancePayment) VALUES 
('בלרינה', 5000, 0, 1500),
('קוציטה', 4500, 0, 1350),
('לובינה', 3500, 0, 1050);

-- הוספת נתונים לטבלת orders
INSERT INTO orders (date, returnDate, clientId, dressId, repairs, paidInAdvance) VALUES 
('2024-07-11', '2024-08-10', 1, 1, 'לקצר את השמלה', true),
('2024-07-10', '2024-08-10', 2, 2, 'להאריך את השמלה', false),
('2024-06-05', '2024-08-15', 1, 1, 'להתאים את המחשוף', true);

-- הוספת נתונים לטבלת accessoriesInOrder
INSERT INTO accessoriesInOrder (orderId, accessoryId) VALUES 
(1, 1),
(1, 2),
(1, 3);

-- הוספת נתונים לטבלת disabledTurns
INSERT INTO disabledTurns (date,startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes) VALUES 
('2024-05-30', 9, 0, 11, 0),
('2024-07-08',  12, 0, 13, 0),
('2024-05-31',  9, 0,13, 0);
INSERT INTO activityTime (day, startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes)
VALUES
('Sunday', 9, 0, 17, 0),
('Monday', 9, 0, 17, 0),
('Tuesday', 9, 0, 17, 0),
('Wednesday', 9, 0, 17, 0),
('Thursday', 9, 0, 13, 0),
('Friday', 9, 0, 12, 0);
-- הוספת נתונים לטבלת gallery
INSERT INTO gallery (imageUrl) VALUES
('1.png'),
('2.png'),
('3.png'),
('4.png'),
('5.png'),
('6.png'),
('7.png'),
('8.png'),
('9.png'),
('10.png'),
('11.png'),
('4.png');

-- הוספת נתונים לטבלת work_hours
INSERT INTO workHours (employeeId, date, startTime, endTime, duration) 
VALUES 
(6, '2024-06-01', '20:30:00', '22:00:00',90),
-- (4, '2024-06-01', '20:30:00', '22:00:00',90),
-- (4, '2024-06-01', '20:30:00', '22:00:00',90),
(5, '2024-06-01', '20:30:00', '22:00:00',90);


-- CREATE DATABASE IF NOT EXISTS mySql_Project;

-- -- שימוש במסד הנתונים שנוצר
-- USE mySql_Project;

-- -- מחיקת טבלאות אם הן קיימות
-- DROP TABLE IF EXISTS passwords;
-- DROP TABLE IF EXISTS accessoriesInOrder;
-- DROP TABLE IF EXISTS orders;
-- DROP TABLE IF EXISTS dresses;
-- DROP TABLE IF EXISTS clients;
-- DROP TABLE IF EXISTS accessories;
-- DROP TABLE IF EXISTS turns;
-- DROP TABLE IF EXISTS workHours;
-- DROP TABLE IF EXISTS users;
-- DROP TABLE IF EXISTS turnTypes;
-- DROP TABLE IF EXISTS roles;

-- DROP TABLE IF EXISTS disabledTurns;
-- DROP TABLE IF EXISTS gallery;
-- DROP TABLE IF EXISTS activityTime;


-- -- יצירת הטבלאות
-- CREATE TABLE roles(
--       id INT auto_increment PRIMARY KEY,
--       type  varchar(12) NOT NULL
-- );

-- CREATE TABLE users(
--       id INT auto_increment PRIMARY KEY,
--       userId varchar(20),
--       name varchar(20) NOT NULL,
--       email varchar(25) NOT NULL,
--       phone1 varchar(10) NOT NULL,
--       phone2 varchar(10),
--       roleId int NOT NULL,
--       FOREIGN KEY (roleId) REFERENCES roles (id)
-- );

-- CREATE TABLE clients(
--       id INT auto_increment PRIMARY KEY,
--       userId int NOT NULL,
--       weddingDate date,
--       dressStyle varchar(30),
--       remarks varchar(30),
--       FOREIGN KEY (userId) REFERENCES users (id)
-- );

-- CREATE TABLE passwords(
--       id int auto_increment PRIMARY KEY,
--       userId int,
--       password varchar(100),
--       FOREIGN KEY (userId) REFERENCES users (id)
-- );

-- CREATE TABLE turnTypes(
--       id int auto_increment PRIMARY KEY,
--       type varchar(25) NOT NULL
-- );

-- CREATE TABLE turns(
--       id INT auto_increment PRIMARY KEY,
--       date DATE,
--       hour int NOT NULL,
--       minutes int NOT NULL,
--       userId int NOT NULL,
--       typeId int NOT NULL,
--       FOREIGN KEY(userId) REFERENCES users(id),
--       FOREIGN KEY(typeId) REFERENCES turnTypes(id)
-- );

-- CREATE TABLE disabledTurns(
--       id INT auto_increment PRIMARY KEY,
--       date DATE NOT NULL,
-- 	  startTimeHour INT NOT NULL,
--       startTimeMinutes INT NOT NULL,
--       endTimeHour INT NOT NULL,
--       endTimeMinutes INT NOT NULL
-- );

-- CREATE TABLE activityTime(
--       id INT auto_increment PRIMARY KEY,
--       day varchar(10),
--       startTimeHour INT NOT NULL CHECK (startTimeHour >= 0 AND startTimeHour <= 23),
--       startTimeMinutes INT NOT NULL CHECK (startTimeMinutes >= 0 AND startTimeMinutes <= 59),
--       endTimeHour INT NOT NULL CHECK (endTimeHour >= 0 AND endTimeHour <= 23),
--       endTimeMinutes INT NOT NULL CHECK (endTimeMinutes >= 0 AND endTimeMinutes <= 59)
-- );

-- CREATE TABLE dresses(
--       id INT auto_increment PRIMARY KEY,
--       model varchar(30),
--       price double,
--       uses int NOT NULL,
--       advancePayment int NOT NULL
-- );

-- CREATE TABLE accessories(
--       id INT auto_increment PRIMARY KEY,
--       type varchar(25) NOT NULL
-- );

-- CREATE TABLE orders(
--       id INT auto_increment PRIMARY KEY,
--       date DATE,
--       returnDate date,
--       clientId int NOT NULL,
--       dressId INT NOT NULL,
--       repairs varchar(100) NOT NULL,
--       paidInAdvance bool,
--       FOREIGN KEY(dressId) REFERENCES dresses(id),
--       FOREIGN KEY(clientId) REFERENCES clients(id)
-- );

-- CREATE TABLE accessoriesInOrder(
--       id INT auto_increment PRIMARY KEY,
--       orderId int NOT NULL,
--       accessoryId int NOT NULL,
--       FOREIGN KEY(orderId) REFERENCES orders(id),
--       FOREIGN KEY(accessoryId) REFERENCES accessories(id)
-- );

-- CREATE TABLE gallery(
--       id INT auto_increment PRIMARY KEY,
--       imageUrl varchar(200)
-- );

-- CREATE TABLE workHours (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     employeeId INT NOT NULL,
--     date DATE,
--     startTime varchar(15),
--     endTime varchar(15),
--     duration int,
--     FOREIGN KEY (employeeId) REFERENCES users(id)
-- );


-- -- הוספת נתונים לטבלאות roles ו-users
-- INSERT INTO roles (type) VALUES 
-- ('admin'),
-- ('employee'),
-- ('client');

-- INSERT INTO users (userId, name, email, phone1, phone2, roleId) VALUES 
-- ('54645776', 'שרה', 'sara@.com', '0501234567', '0549876543', 3),
-- ('5675675', 'רבקה', 'rachel@.com', '0521112233', '0509998877', 3),
-- ('9123456', 'דנה', 'dana@.com', '0502233445', '0547788990', 3),
-- ('6756756', 'טובה', 'tova@.com', '0548887766', '0527778899', 2),
-- ('9012345', 'עדי', 'adi@.com', '0501122334', '0546677889', 2),
-- ('2584156', 'אורית', 'ey3242363@gmail.com', '0548841766', '0520878899', 1);
-- -- הוספת נתונים לטבלת clients
-- INSERT INTO clients(userId, weddingDate, dressStyle, remarks) VALUES
-- (1, '2024-07-11', 'קלאסי', 'חברות'),
-- (2, '2024-07-09', 'מודרני', 'אחות'),
-- (3, '2024-06-04', 'בוהו', 'חברות');


-- -- הוספת נתונים לטבלת passwords
-- INSERT INTO passwords (userId, password) VALUES
--     (  1, '$2a$10$i/cwt/hlYfjw0tXchnmwPe9k56rtGu.B2LhPaiF6m4c22wnQtr.qK' ),
--     (   2, '$2a$10$h5C7DJoMV7Xuoa7MAuCva.H/mDz5aNo4EKUSI.kKpuzd0A60mULGS' ),
--     (   3,  '$2a$10$GiQHNorjX6nnX5Kdwvbt3.Z5SEQI7oYeYwVBn6awKtWmDab3thvZS' ),
--     (  4, '$2a$10$KwM4OcRYS//wQVToN8ug8OWGirnbEsUYj/.ZcofcVr.PXdahVvOeS' ),
--     ( 5,  '$2a$10$uMpI0w0BE1e0hi9CrPc/nO2U2a9RDMxv4zVZducCGZb/WGUBMg9bu'  ),
--     (  6,  '$2b$10$s9r1xNf273BS.g1nbzX38u5wvHFqXHremmr/172jhgVzIJ0dPZ3/G' );
-- -- הוספת נתונים לטבלת turnTypes
-- INSERT INTO turnTypes (type) VALUES 
-- ('מדידות'),
-- ('התרשמות');

-- -- הוספת נתונים לטבלת turns
-- INSERT INTO turns (date, hour, minutes, userId, typeId) VALUES 
-- ('2024-05-30', 10, 0, 1, 1),
-- ('2024-07-10', 13, 45, 1, 1),
-- ('2024-07-10', 11, 30, 2, 1),
-- ('2024-07-08', 11, 30, 2, 1),
-- ('2024-07-09', 11, 30, 2, 1),
-- ('2024-06-09', 11, 30, 2, 2);

-- -- הוספת נתונים לטבלת accessories
-- INSERT INTO accessories (type) VALUES 
-- ('תכשיטים'),
-- ('שיער'),
-- ('הינומה קצרה');

-- -- הוספת נתונים לטבלת dresses
-- INSERT INTO dresses (model, price, uses, advancePayment) VALUES 
-- ('בלרינה', 5000, 0, 1500),
-- ('קוציטה', 4500, 0, 1350),
-- ('לובינה', 3500, 0, 1050);

-- -- הוספת נתונים לטבלת orders
-- INSERT INTO orders (date, returnDate, clientId, dressId, repairs, paidInAdvance) VALUES 
-- ('2024-07-11', '2024-08-10', 1, 1, 'לקצר את השמלה', true),
-- ('2024-07-10', '2024-08-10', 2, 2, 'להאריך את השמלה', false),
-- ('2024-06-05', '2024-08-15', 3, 1, 'להתאים את המחשוף', true);

-- -- הוספת נתונים לטבלת accessoriesInOrder
-- INSERT INTO accessoriesInOrder (orderId, accessoryId) VALUES 
-- (1, 1),
-- (1, 2),
-- (1, 3);

-- -- הוספת נתונים לטבלת disabledTurns
-- INSERT INTO disabledTurns (date,startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes) VALUES 
-- ('2024-05-30', 9, 0, 11, 0),
-- ('2024-07-08',  13, 0, 14, 0),
-- ('2024-05-31',  9, 0,13, 0);
-- INSERT INTO activityTime (day, startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes)
-- VALUES
-- ('Sunday', 9, 0, 17, 0),
-- ('Monday', 9, 0, 17, 0),
-- ('Tuesday', 9, 0, 17, 0),
-- ('Wednesday', 9, 0, 17, 0),
-- ('Thursday', 9, 0, 13, 0),
-- ('Friday', 9, 0, 12, 0);
-- -- הוספת נתונים לטבלת gallery
-- INSERT INTO gallery (imageUrl) VALUES
-- ('1.png'),
-- ('2.png'),
-- ('3.png'),
-- ('4.png'),
-- ('5.png'),
-- ('6.png'),
-- ('7.png'),
-- ('8.png'),
-- ('9.png'),
-- ('10.png'),
-- ('11.png'),
-- ('4.png');

-- -- הוספת נתונים לטבלת work_hours
-- INSERT INTO workHours (employeeId, date, startTime, endTime, duration) 
-- VALUES 
-- (4, '2024-06-01', '20:30:00', '22:00:00',90),
-- (6, '2024-06-01', '20:30:00', '22:00:00',90),
-- -- (4, '2024-06-01', '20:30:00', '22:00:00',90),
-- (5, '2024-06-01', '20:30:00', '22:00:00',90);