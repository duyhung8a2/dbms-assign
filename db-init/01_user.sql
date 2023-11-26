CREATE USER DBTESTER IDENTIFIED BY password;

ALTER USER DBTESTER DEFAULT TABLESPACE users QUOTA UNLIMITED ON users;

ALTER USER DBTESTER TEMPORARY TABLESPACE temp;

GRANT create session,
create table,
create procedure,
create sequence,
create trigger,
create view,
create synonym,
alter session TO DBTESTER;