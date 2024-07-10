

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
('6756756', 'טובה', 'tova@.com', '0548887766', '0527778899', 2),
('2584156', 'אורית', 'o@example.com', '0548841766', '0520878899', 1);
-- הוספת נתונים לטבלת clients
INSERT INTO clients(userId, weddingDate, dressStyle, remarks) VALUES
(1, '2024-05-30', 'קלאסי', 'חברות'),
(2, '2024-05-31', 'מודרני', 'אחות');

-- הוספת נתונים לטבלת passwords
INSERT INTO passwords (userId, password) VALUES
(1, '$2b$10$knwNDV/20eaD6UZLO5jcHeGy0C34NuRkJ.H8onO2rCu1Avdu979mC'),
(2, '$2b$10$vQrSNw9pAks3hsZ49bJCye31iSph97ZJTtU2NMLNcVJt9g672wmYm'),
(3, '$2b$10$VFZ6MEb61Kk9ZaaRmviBg.odjTCjNQD8pADCVsMESAHqMOZs1C8Aq'),
(4, '$2b$10$yGjqlEpP/TNxKy2gfPvnDO1tkEVa8XfQmqT.Whq8hOQdhvO.JaIp6');

-- הוספת נתונים לטבלת turnTypes
INSERT INTO turnTypes (type) VALUES 
('מדידות'),
('התרשמות');

-- הוספת נתונים לטבלת turns
INSERT INTO turns (date, hour, minutes, userId, typeId) VALUES 
('2024-05-30', 10, 0, 1, 1),
('2024-07-02', 13, 45, 1, 1),
('2024-05-31', 11, 30, 2, 1),
('2024-06-08', 11, 30, 2, 1),
('2024-06-10', 11, 30, 2, 1),
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
('2024-05-30', '2024-06-30', 1, 1, 'לקצר את השמלה', true),
('2024-05-30', '2024-06-30', 2, 2, 'להאריך את השמלה', false);

-- הוספת נתונים לטבלת accessoriesInOrder
INSERT INTO accessoriesInOrder (orderId, accessoryId) VALUES 
(1, 1),
(1, 2),
(1, 3);

-- הוספת נתונים לטבלת disabledTurns
INSERT INTO disabledTurns (date,startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes) VALUES 
('2024-05-30', 9, 0, 11, 0),
('2024-07-02',  9, 0, 12, 0),
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
VALUES (4, '2024-06-01', '20:30:00', '22:00:00',90);



-- משתמש: רחל
-- סיסמה: Password123
-- סיסמה מוצפנת: $2b$10$AfsWzeBLjOQgqavELYYaOu7lFh9j1n5smh7CwqBfNwG0VNZgeQXUy

-- משתמש: לאה
-- סיסמה: Summer2024
-- סיסמה מוצפנת: $2b$10$Q4Cxf91T5DrU3Tb7nGwRJeh0YfZ1t0DNDkXx12VJpZ2fNDyB9cf4y

-- משתמש: דבורה
-- סיסמה: Wedding!2024
-- סיסמה מוצפנת: $2b$10$M3JVT9emSb9b5XHUsI7CRuK8Uo7pJw0ngdHyB1H2lwpL76o/n8D3q

-- משתמש: עמית
-- סיסמה: SecurePass789
-- סיסמה מוצפנת: $2b$10$2VTL1Fk7yIWQKv4SxO55tum98UZizOYcZz/0aAQ9NAlNU4N2RPI7e

-- משתמש: נועה
-- סיסמה: Garden2023!
-- סיסמה מוצפנת: $2b$10$A66qDjz0ISUGzZ5CuVGFTuU5z10P0TYNzKsGwF1cLg3Xwyma5QJnG




















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
--       startTimeHour INT NOT NULL,
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
-- ('6756756', 'טובה', 'tova@.com', '0548887766', '0527778899', 2),
-- ('2584156', 'אורית', 'o@example.com', '0548841766', '0520878899', 1),
-- ('7856785', 'דינה', 'dina@.com', '0501112233', '0527778888', 1),
-- ('4564567', 'מרים', 'miriam@.com', '0549876543', '0501234567', 2),
-- ('5675678', 'חנה', 'hana@.com', '0522223344', '0508887777', 2),
-- ('6786789', 'מאיה', 'maia@.com', '0533334455', '0519998888', 3),
-- ('7897890', 'אלה', 'ela@.com', '0554445566', '0537779999', 3),
-- ('8908901', 'שרון', 'sharon@.com', '0565556677', '0546667778', 3),
-- ('9019012', 'דבורה', 'devora@.com', '0576667788', '0555556666', 3),
-- ('0120123', 'עדי', 'adi@.com', '0587778899', '0564445557', 3),
-- ('1231234', 'נועה', 'noa@.com', '0598889900', '0573334448', 3),
-- ('2342345', 'מיכל', 'michal@.com', '0589990001', '0582223339', 3);

-- -- הוספת נתונים לטבלת clients
-- INSERT INTO clients(userId, weddingDate, dressStyle, remarks) VALUES
-- (1, '2024-05-30', 'קלאסי', 'חברות'),
-- (2, '2024-05-31', 'מודרני', 'אחות');

-- -- הוספת נתונים לטבלת passwords
-- INSERT INTO passwords (userId, password) VALUES
-- (1, '$2b$10$knwNDV/20eaD6UZLO5jcHeGy0C34NuRkJ.H8onO2rCu1Avdu979mC'),
-- (2, '$2b$10$vQrSNw9pAks3hsZ49bJCye31iSph97ZJTtU2NMLNcVJt9g672wmYm'),
-- (3, '$2b$10$VFZ6MEb61Kk9ZaaRmviBg.odjTCjNQD8pADCVsMESAHqMOZs1C8Aq'),
-- (4, '$2b$10$yGjqlEpP/TNxKy2gfPvnDO1tkEVa8XfQmqT.Whq8hOQdhvO.JaIp6'),
-- (5, '$2b$10$7VhOwJHcYwn6y5LSBgdjaOBULw0SjW0E4H6bTrNYoNrFG22COnmuG'),
-- (6, '$2b$10$G3tSgl39y5ToA5gtZU0Yl.EJ2n1PfFqDhR/1vq3uAq2FDbt/yEPMK'),
-- (7, '$2b$10$3I5w7Zy9DfCHI1IY/BIXE.rq3e8kz7IFzVUc3DpW3/2fheGr3/xzC'),
-- (8, '$2b$10$4a.Szlgp3jQ38txPMcpK8.7c1R9HrBCyoP3Lz0/No8mQ4AcA42HEe'),
-- (9, '$2b$10$6CquN1wFE3xJBB3XuAocg.vf.U4YbkIc2M2P8K9N0HoKSKpRboZTy'),
-- (10, '$2b$10$8Q8yph7Yg0GOb8ryyUTUT.p/K4Y0eYxuqX5bVJkZpB9AsrRCy3v4K');

-- -- הוספת נתונים לטבלת turnTypes
-- INSERT INTO turnTypes (type) VALUES 
-- ('מדידות'),
-- ('התרשמות');

-- -- הוספת נתונים לטבלת turns
-- INSERT INTO turns (date, hour, minutes, userId, typeId) VALUES 
-- ('2024-05-30', 10, 0, 1, 1),
-- ('2024-07-02', 13, 45, 1, 1),
-- ('2024-05-31', 11, 30, 2, 1),
-- ('2024-06-08', 11, 30, 2, 1),
-- ('2024-06-10', 11, 30, 2, 1),
-- ('2024-06-09', 11, 30, 2, 2),
-- ('2024-06-15', 10, 0, 5, 1),
-- ('2024-06-20', 14, 30, 6, 1),
-- ('2024-06-25', 11, 0, 7, 1);

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
-- ('2024-05-30', '2024-06-30', 1, 1, 'לקצר את השמלה', true),
-- ('2024-05-30', '2024-06-30', 2, 2, 'להאריך את השמלה', false);

-- -- הוספת נתונים לטבלת accessoriesInOrder
-- INSERT INTO accessoriesInOrder (orderId, accessoryId) VALUES 
-- (1, 1),
-- (1, 2),
-- (1, 3);

-- -- הוספת נתונים לטבלת disabledTurns
-- INSERT INTO disabledTurns (date, startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes) VALUES 
-- ('2024-05-30', 9, 0, 11, 0),
-- ('2024-07-02', 9, 0, 12, 0),
-- ('2024-05-31', 9, 0, 13, 0);

-- -- הוספת נתונים לטבלת activityTime
-- INSERT INTO activityTime (day, startTimeHour, startTimeMinutes, endTimeHour, endTimeMinutes)
-- VALUES
-- ('Sunday', 9, 0, 17, 0),
-- ('Monday', 9, 0, 17, 0),
-- ('Tuesday', 9, 0, 17, 0),
-- ('Wednesday', 9, 0, 17, 0),
-- ('Thursday', 9, 0, 13, 0),
-- ('Friday', 9, 0, 12, 0),
-- ('Saturday', 10, 0, 14, 0),
-- ('Saturday', 15, 0, 20, 0),
-- ('Sunday', 14, 0, 18, 0),
-- ('Monday', 15, 0, 19, 0),
-- ('Tuesday', 16, 0, 20, 0),
-- ('Wednesday', 17, 0, 21, 0),
-- ('Thursday', 18, 0, 22, 0),
-- ('Friday', 10, 0, 14, 0);

-- -- הוספת נתונים לטבלת gallery
-- INSERT INTO gallery (imageUrl) VALUES
-- ('image_1719350149221.png'),
-- ('image_1719350200134.png');

-- -- הוספת נתונים לטבלת work_hours
-- INSERT INTO workHours (employeeId, date, startTime, endTime, duration) 
-- VALUES (4, '2024-06-01', '20:30:00', '22:00:00', 90);


