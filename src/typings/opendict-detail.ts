/**
 * 사전 내용 오픈 API
 */

export interface OpendictDetail {
  channel: {
    /** 우리말샘 오픈 API 제목 (고정값: 우리말샘 개발 지원(Open API) - 사전 검색) */
    title: string;
    /** 우리말샘 사전 내용 URL */
    link: string;
    /** 오픈 API 서비스 설명 (고정값: 우리말샘 개발 지원(Open API) – 사전 내용 검색 결과) */
    description: string;
    /** 검색 결과를 생성한 시간 */
    lastBuildDate: number;
    /** 검색 건수(1: 결과 있음, 0이면 결과 없음) */
    total: number;
    /** 검색 결과 리스트 */
    item: OpendictDetailItem[];
  };
}

export interface OpendictDetailItem {
  /** 대상 코드 */
  target_code: number;
  /** 다의어 번호(고유한 구분 KEY 값 – 다의어 묶음 정보로 사용) */
  group_code: number;
  /** 다의어 순번(다의어 묶음 정보로 사용) */
  group_order: number;
  /** 형태 항목을 포함하는 컨테이너 */
  wordInfo: OpendictWordInfo;
  /** 의미 항목을 포함하는 컨테이너 */
  senseInfo: OpendictSenseInfo[];
}

export interface OpendictWordInfo {
  /** 표제어 */
  word: string;
  /** 구성 단위 */
  word_unit: string;
  /** 고유어 여부 */
  word_type: string;
  /** 원어 항목을 포함하는 컨테이너(반복) */
  original_language_info?: OpendictOriginalLanguageInfo[];
  /** 표제어 발음 항목을 포함하는 컨테이너(반복) */
  pronunciation_info?: string | string[];
  /** 활용, 준말 항목을 포함하는 컨테이너(반복) */
  conju_info?: OpendictConjugationInfo;
  /** 어원 */
  origin?: string;
  /** 이형태 */
  allomorph?: string;
}

export interface OpendictOriginalLanguageInfo {
  /** 원어 */
  original_language: string;
  /** 언어 */
  language_type: string;
}

export interface OpendictConjugationInfo {
  conjugation_info?: {
    /** 활용 */
    conjugation: string;
    /** 활용의 발음 항목을 포함하는 컨테이너(반복) */
    pronunciation_info?: string[];
  }[];
  abbreviation_info?: {
    /** 준말 */
    abbreviation: string;
    /** 준말의 발음 항목을 포함하는 컨테이너(반복) */
    pronunciation_info?: string[];
  }[];
}

export interface OpendictSenseInfo {
  /** 의미번호(3자리 정수) */
  sense_no: string;
  /** 품사. 구, 속담, 관용구는 품사가 없음 */
  pos?: string;
  /** 범주(일반어, 지역어(방언), 북한어, 옛말) */
  type: string;
  /** 뜻풀이(태그 정보: IN-미확정, DR-방언 지역, FL-비규범) */
  definition: string;
  /** 뜻풀이(어휘링크 포함) */
  definition_original: string;
  /** 학명 */
  scientific_name?: string;
  /** 문형 항목을 포함하는 컨테이너(반복) */
  pattern_info?: string[];
  /** 문법 항목을 포함하는 컨테이너(반복) */
  grammar_info?: string[];
  /** 전문 분야 항목을 포함하는 컨테이너(반복) */
  cat_info?: string[];
  /** 방언 지역 항목을 포함하는 컨테이너(반복) */
  region_info?: string[];
  /** 용례 항목을 포함하는 컨테이너(반복) */
  example_info?: OpendictExampleInfo[];
  /** 관련 어휘 항목을 포함하는 컨테이너(반복) */
  relation_info?: OpendictRelationInfo[];
  /** 대역어 항목을 포함하는 컨테이너(반복) */
  translation_info?: OpendictTranslationInfo[];
  /** 역사 정보 항목을 포함하는 컨테이너 */
  history_info?: OpendictHistoryInfo;
  /** 멀티미디어 항목을 포함하는 컨테이너(반복) */
  multimedia_info?: OpendictMultimediaInfo[];
  /** 규범 정보 항목을 포함하는 컨테이너(반복) */
  norm_info?: OpendictNormInfo[];
  /** 관용구/속담 항목을 포함하는 컨테이너(반복) */
  proverb_info?: OpendictProverbInfo[];
  /** 수어 정보 링크 */
  sl_info_link?: string;
}

export interface OpendictExampleInfo {
  /** 용례(태그 정보: IN-미확정, FL-비규범) */
  example: string;
  /** 출처 */
  source?: string;
  /** 원문 */
  origin?: string;
  /** 번역 */
  translation?: string;
  /** 방언 지역 */
  region?: string;
}

export interface OpendictRelationInfo {
  /** 표제어(예: 나무001) */
  word: string;
  /** 유형 */
  type: string;
  /** 링크 대상 코드 */
  link_target_code?: string;
  /** 링크 */
  link: string;
}

export interface OpendictTranslationInfo {
  /** 대역 */
  translation: string;
  /** 언어 */
  language_type: string;
}

export interface OpendictHistoryInfo {
  /** 어형 변화/시기 */
  word_form?: string;
  /** 설명 */
  desc?: string;
  /** 이형태/이표기 */
  allomorph?: string;
  /** 관련 정보 */
  remark?: string;
  /** 역사정보 의미 항목을 포함하는 컨테이너(반복) */
  history_sense_info?: OpendictHistorySenseInfo[];
}

export interface OpendictHistorySenseInfo {
  /** 뜻풀이(태그 정보: IN-미확정, DR-방언 지역, FL-비규범) */
  definition?: string;
  /** 역사 정보 세기 항목을 포함하는 컨테이너(반복) */
  history_century_info?: OpendictHistoryCenturyInfo[];
}

export interface OpendictHistoryCenturyInfo {
  /** 세기 */
  century?: string;
  /** 표기 */
  mark?: string;
  /** 역사정보 용례 항목을 포함하는 컨테이너(반복) */
  history_example_info?: OpendictHistoryExampleInfo[];
}

export interface OpendictHistoryExampleInfo {
  /** 용례(태그 정보: IN-미확정, FL-비규범) */
  example: string;
  /** 출전 */
  source?: string;
  /** 원문 */
  origin?: string;
  /** 번역 */
  translation?: string;
}

export interface OpendictMultimediaInfo {
  /** 제목 */
  label: string;
  /** 유형 */
  type: string;
  /** 링크 */
  link: string;
}

export interface OpendictNormInfo {
  /** 규범 정보 유형 */
  type: string;
  /** 관련 조항 */
  role?: string;
  /** 설명 */
  desc?: string;
}

export interface OpendictProverbInfo {
  /** 표제어 */
  word: string;
  /** 뜻풀이 */
  definition: string;
  /** 유형(관용구/속담) */
  type: string;
  /** 링크 대상 코드 */
  link_target_code?: string;
  /** 링크 */
  link: string;
}
