create sequence tasks_seq;
create table if not exists tasks (
  id serial(11) not null primary key default next_val('tasks_seq'),
  task, // Text of task, Markdown strign
  part, // Part in exam, e.g.: A, B, C
  subject
);

create sequence exams_seq;
create table if not exists exams (
  id serial(11) not null primary key default next_val('exams_seq'),
  subject varchar()
  seq int(11) // List of tasks id
);

create sequence users_seq;
create table if not exists users (
  id serial(11) not null primary key default next_val('users_seq'),
  login varchar(11),
  password char(64) not null,
  fullname varchar(40) not null,
  rate int(11) not null
);
