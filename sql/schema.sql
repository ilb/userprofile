drop schema if exists userprofile;
create schema userprofile;
grant all privileges on userprofile.* to 'userprofile'@'localhost' identified by 'userprofile';
grant all privileges on userprofile.* to 'userprofile'@'%' identified by 'userprofile';

