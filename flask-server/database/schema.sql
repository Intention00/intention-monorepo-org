CREATE TABLE User ( 
    UserID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 

    Email VARCHAR(255), 

    Password VARCHAR(255) NOT NULL, 

    UserName VARCHAR(255) NOT NULL, 

    PersonType VARCHAR(255)
); 


CREATE TABLE Contact ( 

    ContactID INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 

    FirstName VARCHAR(255) NOT NULL, 

    LastName VARCHAR(255) NOT NULL, 

    UserID INT NOT NULL,

    LastContactedDate DATETIME, 

    ContactFrequency INT, 

    Phone VARCHAR(15), 

    Email VARCHAR(255), 

    BucketID INT NULL

); 


-- INSERTS

INSERT INTO User (Email, Password, UserName, PersonType) VALUES 

('user1@example.com', 'pass123', 'UserOne', 'Admin');

INSERT INTO Contact (FirstName, LastName, UserID, LastContactedDate, ContactFrequency, Phone, Email, BucketID) VALUES 

('John', 'Doe', 1, '2024-01-01 06:24:59', 5, '555-1234', 'johndoe@example.com', 1);