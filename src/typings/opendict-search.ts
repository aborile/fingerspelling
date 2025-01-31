/**
 * 사전 검색 오픈 API
 */

export interface OpendictResult {
  channel: {
    /** 전체 개수 */
    total: number;
    /** 검색 결과로 제공하는 어휘 개수 */
    num: number;
    /** 우리말샘 오픈 API 제목 (고정값: 우리말샘 개발 지원(Open API) - 사전 검색) */
    title: string;
    /** 검색 결과 시작 번호 */
    start: number;
    /** 오픈 API 서비스 설명 (고정값: 우리말샘 개발 지원(Open API) – 사전 검색 결과) */
    description: string;
    /** 우리말샘 URL(고정값: http://opendict.korean.go.kr) */
    link: string;
    /** 개별 검색 결과를 포함하는 컨테이너. ‘num’ 만큼 반복함 */
    item: OpendictItem[];
    /** 검색 결과를 생성한 시간 */
    lastbuilddate: string;
  };
}

export interface OpendictItem {
  /** 표제어 */
  word: string;
  /** 개별 의미를 포함하는 컨테이너 */
  sense: OpendictSense[];
}

export interface OpendictSense {
  /** 전문 분야 */
  cat?: string;
  /** 뜻풀이 */
  definition: string;
  /** 사전 내용 보기 URL */
  link: string;
  /** 원어 */
  origin?: string;
  /** 의미번호(3자리 정수) */
  sense_no: string;
  /** 대상 코드 */
  target_code: string;
  /** 범주(일반어, 지역어(방언), 북한어, 옛말) */
  type: string;
  /** 품사 */
  pos?: string;
}
