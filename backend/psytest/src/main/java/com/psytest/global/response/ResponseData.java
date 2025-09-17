package com.psytest.global.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL) // NULL 값이 아닌 경우에만 직렬화된 출력
@Schema(description = "결과 공통 정보") // 스웨거 문서화 설명용
public class ResponseData<T> {

    // http 상태 코드
    @Schema(description = "HTTP 상태코드 (예: 200, 404)")
    @JsonProperty("httpStatus")
    private Integer httpStatus;

    // 결과 코드
    @Schema(description = "결과 코드 (예: S0000, E3001)")
    @JsonProperty("code")
    private String code;

    // 결과 메시지
    @Schema(description = "결과 메시지 (예: 성공, 토큰 만료)")
    @JsonProperty("message")
    private String message;

    // 결과 데이터
    @Schema(description = "API 응답 데이터")
    @JsonProperty("data")
    private T data = null;
}
