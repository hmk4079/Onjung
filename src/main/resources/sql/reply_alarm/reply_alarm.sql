create table tbl_reply_alarm(
    id bigint unsigned auto_increment primary key,
    alarm_content varchar(1000) not null,
    member_id bigint unsigned not null,
    reply_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    is_read boolean default false,
    constraint fk_reply_alarm_member foreign key (member_id)
    references tbl_member(id),
    constraint fk_reply_alarm_reply foreign key (reply_id)
    references tbl_reply(id)
);


use test2;


alter table tbl_reply_alarm add column is_read boolean default false;

select * from tbl_reply_alarm;
