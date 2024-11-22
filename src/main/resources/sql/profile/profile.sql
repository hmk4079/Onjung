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

select profile_file_name from tbl_profile pf join tbl_member m on pf.member_id = m.id where member_id = 35;

select *
from tbl_profile
where member_id = (select member_id from tbl_post where id = 37);


SELECT
    v.id,
    v.now_recruitment_count,
    v.recruitment_count,
    p.id AS postId,
    p.post_title AS postTitle,
    p.post_content AS postContent,
    p.member_id AS memberId,
    m.member_nickname AS memberNickname,
    m.member_name AS memberName,
    p.post_status AS postStatus,
    at.attachment_file_name AS attachmentFileName,
    at.attachment_file_path AS attachmentFilePath,
    at.attachment_file_size AS attachmentFileSize,
    at.attachment_file_type AS attachmentFileType,
    pf.profile_file_name AS profileFileName,
    pf.profile_file_path AS profileFilePath,
    pf.profile_file_size AS profileFileSize,
    pf.profile_file_type AS profileFileType,
    v.vt_s_date AS vtSDate,
    v.vt_e_date AS vtEDate,
    p.post_view_count AS postViewCount,
    p.post_type AS postType,
    p.post_summary AS postSummary,
    p.created_date AS createdDate
FROM
    tbl_vt v
        JOIN tbl_post p ON v.id = p.id
        JOIN tbl_member m ON m.id = p.member_id
        JOIN tbl_attachment at ON at.post_id = p.id
        LEFT JOIN tbl_profile pf ON pf.member_id = p.member_id
WHERE
    v.id = 35; -- 실제 존재하는 ID로 테스트
