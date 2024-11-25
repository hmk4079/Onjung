create table tbl_vt(
    id bigint unsigned primary key ,
    recruitment_count smallint not null ,
    now_recruitment_count smallint default 0,
    vt_s_date date not null,
    vt_e_date date not null,
    constraint fk_vt_post foreign key(id)
    references tbl_post(id)
);

select *from tbl_post order by post_view_count desc;

select *from tbl_member;
select * from tbl_vt;


select v.id, p.id, m.id, p.post_title
from tbl_vt v
         join tbl_post p on v.id = p.id
         join tbl_member m on p.member_id = m.id
         join tbl_profile pf on p.member_id = pf.id;

# DESCRIBE tbl_vt;
# drop table tbl_vt;

select p.id, m.id, v.id, v.recruitment_count, p.post_title, m.member_nickname, p.post_status,
       pf.profile_file_name, pf.profile_file_path, pf.profile_file_size, pf.profile_file_type,
       v.vt_s_date, v.vt_e_date,p.post_view_count, p.post_type, p.post_summary, p.created_date
from tbl_vt v
         left join tbl_post p on v.id = p.id
         left join tbl_member m on p.member_id = m.id
         left join tbl_profile pf on p.member_id = pf.id
order by p.id desc;
#
alter table tbl_vt add now_recruitment_count smallint after recruitment_count;
alter table tbl_vt modify now_recruitment_count smallint default 0;
#
SELECT v.id, v.recruitment_count, p.post_title, m.member_nickname, p.post_status,
       at.attachment_file_name, at.attachment_file_path, at.attachment_file_size, at.attachment_file_type,
       v.vt_s_date, v.vt_e_date, p.post_view_count, p.post_type, p.post_summary, p.created_date
FROM tbl_vt v
         LEFT JOIN tbl_post p ON v.id = p.id
         LEFT JOIN tbl_member m ON p.member_id = m.id
         LEFT JOIN tbl_attachment at ON at.post_id = p.id
WHERE p.id = 23;

select count(*) from tbl_vt ;

SELECT COUNT(*) FROM tbl_post WHERE post_type = 'VOLUNTEER';  -- 특정 조건의 데이터 개수 확인

select * from tbl_vt;

INSERT INTO tbl_vt (id, recruitment_count, vt_s_date, vt_e_date)
VALUES (1, 11, '2024-11-19', '2024-11-21'),
       (2, 12, '2024-11-19', '2024-11-22'),
       (3, 13, '2024-11-19', '2024-11-23'),
       (4, 14, '2024-11-19', '2024-11-24'),
       (5, 15, '2024-11-19', '2024-11-25'),
       (6, 16, '2024-11-19', '2024-11-26'),
       (7, 17, '2024-11-19', '2024-11-27'),
       (8, 18, '2024-11-19', '2024-11-28'),
       (9, 19, '2024-11-19', '2024-11-29'),
       (10, 20, '2024-11-19', '2024-11-30'),
       (11, 21, '2024-11-19', '2024-12-01'),
       (12, 22, '2024-11-19', '2024-12-02'),
       (13, 23, '2024-11-19', '2024-12-03'),
       (14, 24, '2024-11-19', '2024-12-04'),
       (15, 25, '2024-11-19', '2024-12-05'),
       (16, 26, '2024-11-19', '2024-12-06'),
       (17, 27, '2024-11-19', '2024-12-07'),
       (18, 28, '2024-11-19', '2024-12-08'),
       (19, 29, '2024-11-19', '2024-12-09'),
       (20, 30,'2024-11-19', '2024-12-10'),
       (21, 31,'2024-11-19', '2024-12-11'),
       (22, 32,'2024-11-19', '2024-12-12'),
       (23, 33,'2024-11-19', '2024-12-13'),
       (24, 34,'2024-11-19', '2024-12-14'),
       (25, 35,'2024-11-19', '2024-12-15'),
       (26, 36,'2024-11-19', '2024-12-16'),
       (27, 37,'2024-11-19', '2024-12-17'),
       (28, 38,'2024-11-19', '2024-12-18'),
       (29, 39,'2024-11-19', '2024-12-19'),
       (30, 40,'2024-11-19', '2024-12-20');

SELECT now_recruitment_count, recruitment_count
FROM tbl_vt
WHERE id = 37
