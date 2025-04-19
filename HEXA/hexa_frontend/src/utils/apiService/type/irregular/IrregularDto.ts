import { PageSearchParam } from "../common/Page.type";

export interface Irregular extends PageSearchParam {
    stationId: string;
    stationName: string;
    status: string;
    asType: string;
    code: string;
    codeName: string;
    irrObject: string;
    chassisNum: number;
    slotNum: number;

}

export interface IrregularResponseDto {
    stationId: string;
    stationName: string;
    status: string;
    statusName: string;
    chassisNum: number;
    slotNum: number;
    createdAt?: Date;
    updatedAt?: Date;
    code: string;
    description: string;
    asType: string;
    level: string;
    irrLevel: string;
    codeName: string;
    irrObject: string;
    irrTarget: string;
    object: string;
    handledUserId: string;
    handleDetail: string;
    handledAt?: Date;
    countByStatus?: number;
}

export interface BsmsAsHistRequestDto extends PageSearchParam {
    bssNm: string; // 스테이션명
    mhrlsTyCd: string; // 대상(E:스테이션, B:배너리, S:슬롯)
    errKnd: string; // 레벨
    recptnDefectTyCd: string; // 고장코드
    errCdNm: string; // 코드명
    status: string; // 상태
    processCn: string; // 처리내용
    asChargerId: string; // 처리자
}

export interface BsmsAsHistResponseDto {
    occrrncDthms: Date; // 발생일시
    bssNm: string; // 스테이션명
    mhrlsTyCd: string; // 대상(E:스테이션, B:배너리, S:슬롯)
    errKnd: string; // 레벨
    recptnDefectTyCd: string; // 고장코드
    errCdNm: string; // 코드명
    status: string; // 상태
    processCn: string; // 처리내용
    processDthms: Date; // 처리완료일시
    asChargerId: string; // 처리자
    bssId: string; // 스테이션 ID
    btryId: string; // 배터리 ID
    bssSlotId: string; // 슬롯 ID
}