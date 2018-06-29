drop table products;

create table products(
	item_id int not null auto_increment,
	product_name varchar(100) null,
	department_name varchar(100) null,
	price int null,
	stock_quantity varchar(100) null,
	primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity)
value ("Beanie Baby tag protectors", "Collectibles", 5, 100);

insert into products (product_name, department_name, price, stock_quantity)
value ("A Banana", "Produce", 20, 5);

insert into products (product_name, department_name, price, stock_quantity)
value ("Jerry Maguire VHS Tape", "TV and Movies", 1, 100000);

insert into products (product_name, department_name, price, stock_quantity)
value ("Jerry Seinfeld's Puffy Shirt", "Men's Apparel", 10000, 1);

insert into products (product_name, department_name, price, stock_quantity)
value ("Nickelback on Vinyl", "Music", 3, 5000);

insert into products (product_name, department_name, price, stock_quantity)
value ("Snuggie", "Linens", 30, 300);

insert into products (product_name, department_name, price, stock_quantity)
value ("Floppy Disk", "Electronics", 20, 400);

insert into products (product_name, department_name, price, stock_quantity)
value ("Jnco Jeans", "Apparel", 50, 80);

insert into products (product_name, department_name, price, stock_quantity)
value ("Cat Stroller", "Pet Accessories", 100, 20);

insert into products (product_name, department_name, price, stock_quantity)
value ("Energy Dome", "Headwear", 75, 10);

select * from products;