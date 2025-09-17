package com.psytest.fortuneCookie.controller;

import com.psytest.fortuneCookie.dto.FortuneCookieResponse;
import com.psytest.fortuneCookie.service.fortuneCookieService;
import com.psytest.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/fortuneCookie")
@CrossOrigin(origins = "*")
public class fortuneCookieController {

    private final fortuneCookieService fortuneCookieService;

    public fortuneCookieController(fortuneCookieService fortuneCookieService) {
        this.fortuneCookieService = fortuneCookieService;
    }

    @Operation(summary = "쿠키 깨트리기", description = "쿠키를 클릭해서 행운의 문구를 볼 수 있도록 데이터베이스에서 랜덤으로 가져옵니다.")
    @GetMapping("/")
    public ResponseEntity<?> fortuneCookieOpen() {
        FortuneCookieResponse fortuneCookieResponse = fortuneCookieService.fortuneCookieOpen();
        return ResponseUtil.success(fortuneCookieResponse);
    }
}
