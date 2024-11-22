create table tbl_profile(
    id bigint unsigned auto_increment primary key,
    profile_file_name varchar(255),
    profile_file_path varchar(255),
    profile_file_size varchar(255),
    profile_file_type varchar(255),
    member_id bigint unsigned not null,
    created_date datetime default current_timestamp,
    constraint fk_profile_member foreign key (member_id)
    references tbl_member(id)
);

# alter table tbl_profile modify profile_file_type varchar(255);

select * from tbl_profile;

delete from tbl_profile
where member_id = 16;

drop table tbl_profile;
insert into tbl_profile(profile_file_name,profile_file_path, profile_file_size,profile_file_type,member_id)
values ('테스트파일이름2','테스트파일패스2', '테스트파일사이즈2','테스트파일타입2',3)

alter table tbl_profile modify profile_file_size varchar(255);

SELECT r.id,
       r.review_star_rate,
       r.vt_group_name,
       p.post_title,
       p.post_content,
       p.created_date,
       p.member_id,
       a.attachment_file_name,
       a.attachment_file_path,
       a.attachment_file_size,
       a.attachment_file_type,
       pr.profile_file_name,
       pr.profile_file_path,
       pr.profile_file_size,
       pr.profile_file_type
FROM tbl_review r
         JOIN tbl_post p ON r.id = p.id
         LEFT JOIN tbl_attachment a ON p.id = a.post_id
         LEFT JOIN tbl_profile pr ON p.member_id = pr.member_id
ORDER BY p.created_date DESC
LIMIT 10;


select v.id,v.now_recruitment_count, v.recruitment_count, p.id as post_id, p.post_title, p.post_content, m.member_nickname, m.member_name, p.post_status,
       at.attachment_file_name, at.attachment_file_path, at.attachment_file_size, at.attachment_file_type,
       pf.profile_file_name, pf.profile_file_path, pf.profile_file_size, pf.profile_file_type,
       v.vt_s_date, v.vt_e_date, p.post_view_count, p.post_type, p.post_summary, p.created_date
from tbl_vt v
         join tbl_post p on v.id = p.id
         join tbl_member m on p.member_id = m.id
         join tbl_attachment at on at.post_id = p.id
         left join tbl_profile pf on p.member_id = pf.id
where v.id =37;
