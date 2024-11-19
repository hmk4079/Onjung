create table tbl_reply(
    id bigint unsigned auto_increment primary key,
    reply_content varchar(1000) not null,
    member_id bigint unsigned not null,
    post_id bigint unsigned not null,
    reply_status varchar(100) default 'VISIBLE',
    created_date datetime default current_timestamp,
    updated_date datetime default current_timestamp,
    constraint fk_reply_member foreign key (member_id)
    references tbl_member(id),
    constraint fk_reply_post foreign key (post_id)
    references tbl_post(id)
);

select * from tbl_reply;

drop table tbl_reply;