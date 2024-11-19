create table tbl_donation_record(
    id bigint unsigned auto_increment primary key ,
    donation_amount int default 0,
    created_date datetime default current_timestamp,
    member_id bigint unsigned not null ,
    donation_id bigint unsigned not null,
    constraint fk_donation_record_member foreign key (member_id)
    references tbl_member(id),
    constraint fk_donation_record_donation foreign key (donation_id)
    references tbl_donation(id)
);

select * from tbl_donation_record;

 select * from tbl_donation;