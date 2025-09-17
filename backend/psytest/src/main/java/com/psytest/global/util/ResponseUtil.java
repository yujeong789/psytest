package com.psytest.global.util;

import com.psytest.global.exception.ErrorCode;
import com.psytest.global.exception.GlobalException;
import com.psytest.global.response.ResponseData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseUtil {

    public static <T> ResponseEntity<ResponseData<T>> success(T data) {
        return ResponseEntity.ok(
                ResponseData.<T>builder()
                        .httpStatus(HttpStatus.OK.value())
                        .code("S0000")
                        .message("성공적으로 처리되었습니다.")
                        .data(data)
                        .build()
        );
    }

    public static <T> ResponseEntity<ResponseData<T>> success() {
        return ResponseEntity.ok(
                ResponseData.<T>builder()
                        .httpStatus(HttpStatus.OK.value())
                        .code("S0000")
                        .message("성공적으로 처리되었습니다.")
                        .build()
        );
    }

    public static <T> ResponseEntity<ResponseData<T>> failure(GlobalException e) {
        return ResponseEntity.status(e.getStatus())
                .body(ResponseData.<T>builder()
                        .httpStatus(e.getStatus().value())
                        .code(e.getErrorCode().getCode())
                        .message(e.getErrorCode().getMessage())
                        .build());
    }

    public static <T> ResponseEntity<ResponseData<T>> failure(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ResponseData.<T>builder()
                        .httpStatus(HttpStatus.INTERNAL_SERVER_ERROR.value())
                        .code(ErrorCode.SYSTEM_ERROR.getCode())
                        .message(e.getMessage())
                        .build());
    }

    public static <T> ResponseEntity<ResponseData<T>> failure(ErrorCode errorCode) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ResponseData.<T>builder()
                        .httpStatus(HttpStatus.BAD_REQUEST.value())
                        .code(errorCode.getCode())
                        .message(errorCode.getMessage())
                        .build());
    }
}
