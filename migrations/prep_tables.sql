create table if not exists images (
  id serial(11) not null primary key,
  name varchar(11) not null,
  type varchar(11) not null,
  content blob not null
);

create table if not exists tasks (
  id serial(11) not null primary key,
  task text not null, /* Text of task, Markdown strign */
  part int(1) not null, /* Part in exam, e.g.: A, B, C */
  subject varchar(11) not null
);

create table if not exists exams (
  id serial(11) not null primary key,
  subject varchar(11) not null,
  exam int(11) not null,
  seq int(11) /* List of tasks id */
);

create table if not exists users (
  id serial(11) not null primary key,
  login varchar(11),
  password char(64) not null,
  fullname varchar(40) not null,
  rate int(11) not null,
  status varchar(40) not null
);
