create table tbl_vt_alarm(
    id bigint unsigned auto_increment primary key,
    alarm_content varchar(1000) not null,
    member_id bigint unsigned not null,
    vt_id bigint unsigned not null,
    vt_application_id BIGINT UNSIGNED NOT NULL,
    created_date datetime default current_timestamp,
    is_read boolean default false,

    constraint fk_vt_alarm_member foreign key (member_id)
    references tbl_member(id),
    constraint fk_vt_alarm_vt foreign key (vt_id)
    references tbl_vt(id),
        CONSTRAINT fk_vt_alarm_vt_application
        FOREIGN KEY (vt_application_id) REFERENCES tbl_vt_application(id)
);

select * from tbl_vt_alarm;

alter table tbl_vt_alarm add column is_read boolean default false;




use test2;

ALTER TABLE tbl_vt_alarm
    ADD COLUMN vt_application_id BIGINT UNSIGNED NOT NULL,
    ADD CONSTRAINT fk_vt_alarm_vt_application
        FOREIGN KEY (vt_application_id) REFERENCES tbl_vt_application(id);


delete from tbl_vt_alarm
where is_read = 1;