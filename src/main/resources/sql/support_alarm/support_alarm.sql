create table tbl_support_alarm(
    id bigint unsigned auto_increment primary key,
    alarm_content varchar(1000) not null,
    member_id bigint unsigned not null,
    support_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    is_read boolean default false,
    constraint fk_support_alarm_member foreign key (member_id)
    references tbl_member(id),
    constraint fk_support_alarm_support foreign key (support_id)
    references tbl_support(id)
);


use test2;

select * from tbl_support_alarm;

alter table tbl_support_alarm add column is_read boolean default false;

