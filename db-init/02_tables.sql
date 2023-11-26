CREATE TABLE EMPLOYEE (
    ID INT PRIMARY KEY,
    NAME VARCHAR2(100),
    TITLE VARCHAR2(100),
    SALARY VARCHAR2(50),
    BONUS_STRUCTURE VARCHAR2(50),
    TIME_OFF INT,
    SICK_TIME INT,
    HEALTH_PLAN VARCHAR2(100),
    VISION_PLAN VARCHAR2(100),
    DENTAL_PLAN VARCHAR2(100),
    PLAN INT,
    SAVINGS INT
);

INSERT INTO
    EMPLOYEE
VALUES
    (
        1,
        'Chris Montgomery',
        'Manager',
        '110,000',
        '5% Quarterly',
        15,
        5,
        'Blue Cross and Blue Shield',
        'Aetna Vision',
        'Delta Dental',
        25000,
        12000
    );

INSERT INTO
    EMPLOYEE
VALUES
    (
        2,
        'Marie Sylvester',
        'Programmer',
        '85,000',
        '1% Quarterly',
        10,
        5,
        'Blue Cross and Blue Shield',
        'Aetna Vision',
        'Aetna Dental',
        22000,
        16000
    );

INSERT INTO
    EMPLOYEE
VALUES
    (
        3,
        'George Garcia',
        'Senior Programmer',
        '100,000',
        '3% Quarterly',
        10,
        5,
        'Generic Health Plan',
        'Aetna Vision',
        'Delta Dental',
        18000,
        9600
    );

INSERT INTO
    EMPLOYEE
VALUES
    (
        4,
        'Mark Flynn',
        'Manager',
        '120,000',
        '5% Quarterly',
        15,
        5,
        'Blue Cross and Blue Shield',
        'Aetna Vision',
        'Aetna Dental',
        15000,
        22000
    );

INSERT INTO
    EMPLOYEE
VALUES
    (
        5,
        'Jennifer Ackerman',
        'Manager',
        '95,000',
        '5% Quarterly',
        15,
        5,
        'Generic Health Plan',
        'Aetna Vision',
        'Aetna Dental',
        18000,
        23000
    );

INSERT INTO
    EMPLOYEE
VALUES
    (
        6,
        'Jill Jones',
        'Senior Programmer',
        '110,000',
        '3% Quarterly',
        10,
        5,
        'Generic Health Plan',
        'Aetna Vision',
        'Delta Dental',
        12000,
        16000
    );

INSERT INTO
    EMPLOYEE
VALUES
    (
        7,
        'Katie Namamura',
        'Manager',
        '125,000',
        '5% Quarterly',
        15,
        5,
        'Generic Health Plan',
        'Aetna Vision',
        'Aetna Dental',
        25000,
        6000
    );

INSERT INTO
    EMPLOYEE
VALUES
    (
        8,
        'Scott Fuller',
        'Programmer',
        '95,000',
        '1% Quarterly',
        10,
        5,
        'Blue Cross and Blue Shield',
        'Aetna Vision',
        'Delta Dental',
        13500,
        9500
    );

INSERT INTO
    EMPLOYEE
VALUES
    (
        9,
        'Dave Lewis',
        'Programmer',
        '88,000',
        '0% Quarterly',
        10,
        5,
        'Blue Cross and Blue Shield',
        'Aetna Vision',
        'Delta Dental',
        16000,
        7600
    );

INSERT INTO
    EMPLOYEE
VALUES
    (
        10,
        'Guillermo Lopez',
        'Manager',
        '100,000',
        '4% Quarterly',
        15,
        5,
        'Generic Health Plan',
        'Aetna Vision',
        'Delta Dental',
        28520,
        1480
    );