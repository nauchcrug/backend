# backend

Structure:
* routes - Controllers
* lib - Libraries
* public - Static files

###### Build: ```npm run  build```   
###### Deploy: ```npm run deploy ```   
###### Start development: ```npm run start```   
###### Apply migration: ```npm run migrate <migration_name>```    

About migrations:
Extension not important, script will autodetect it
Migration can be SQL file, that creates or deletes table or script, that has two props - up and down, that containt two props - table and fields (not important if down migration)
Example:
```coffeescript
exports.table = 'users'
exports.fields = [
  'name varchar(11) not null'
  'login varchar(26) not null'
]
```
or
```sql
create table if not exists users (
  name varchar(255) not null,
  login varchar(11) not null
);
```
You also can scaffold new migration
Usage: npm run migrate scaffold <migration_name>
