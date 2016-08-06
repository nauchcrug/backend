create sequence exams_seq;
create table if not exists variants (
  id int(11) not null, // Exam ID
  subject varchar(11) not null, // Subject name
  questions
);

create sequence tasks_seq;
create tables tasks (
  id int(11) not null,
  primary key id
);

create sequence users_seq;
create table if not exists users (
  id int(11) not null,
  name varchar(11) not null, // User login
  rate int(11) not null, // User rating
  password varchar(255) not null,
  primary key id
)
