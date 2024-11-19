package com.app.back.domain.volunteer;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class Pagination {
    private Integer page;
    private int startRow;
    private int endRow;
    private int rowCount;
    private int pageCount;
    private int startPage;
    private int endPage;
    private int realEnd;
    private boolean prev, next;
    private int total;
    private String order;
    private String postType;  // postType 필드 추가
    private int moreRowcount;

    public void progress() {
        // 현재 페이지 설정 (null인 경우 1로 초기화)
        this.page = page == null ? 1 : page;
        // 한 페이지에 보여줄 게시물 개수
        this.rowCount = 10;
        // 더보기 구현 시, 다음 페이지의 게시글 1개를 더 가져오기 위해 설정
        this.moreRowcount = rowCount + 1;
        // 한 블록에 보여줄 페이지 수 (예: 1, 2, 3, 4, 5)
        this.pageCount = 10;
        // 조회 끝 행 번호 계산
        this.endRow = page * rowCount;
        // 조회 시작 행 번호 계산
        this.startRow = endRow - rowCount + 1;
        // 현재 블록의 끝 페이지 번호 계산 (예: 10, 20, 30...)
        this.endPage = (int) (Math.ceil((double) page / pageCount) * pageCount);

        // 현재 블록의 시작 페이지 번호 계산
        this.startPage = endPage - pageCount + 1;
        // 전체 게시물 수에 따른 실제 마지막 페이지 번호 계산
        this.realEnd = (int) Math.ceil((double) total / rowCount);
        // 실제 마지막 페이지 번호가 현재 블록의 끝 페이지 번호보다 작으면 설정
        if (realEnd < endPage) {
            endPage = realEnd == 0 ? 1 : realEnd;
        }
        if (startPage < 1) startPage = 1;
        // 이전 페이지 블록 존재 여부 설정
        this.prev = startPage > 1;
        // 다음 페이지 블록 존재 여부 설정
        this.next = endPage < realEnd;
        // limit 문법에서 시작 인덱스는 0부터 시작하기 때문에 1 감소해준다.
        this.startRow--;

        log.info("Pagination 계산 결과 - 현재 페이지: {}, 시작 페이지: {}, 끝 페이지: {}, 실제 마지막 페이지: {}, 총 게시물 수: {}",
                page, startPage, endPage, realEnd, total);
    }



}