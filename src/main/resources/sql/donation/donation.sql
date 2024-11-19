create table tbl_donation(
    id bigint unsigned primary key ,
    goal_point int default 0,
    current_point int default 0,
    donation_s_date date not null,
    donation_e_date date not null,
    constraint fk_donation_post foreign key (id)
    references tbl_post(id)

);
select * from tbl_donation;

drop table tbl_donation;

alter table tbl_donation
    change column currnet_point current_point int default 0;

insert into tbl_donation(id,goal_point,current_point,donation_s_date, donation_e_date)
values (101,200000,0,'2024-12-04','2025-06-02');
