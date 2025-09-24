package com.psytest.fortuneCookie.controller;

import com.psytest.fortuneCookie.dto.FortuneCookieResponse;
import com.psytest.fortuneCookie.service.fortuneCookieService;
import com.psytest.global.util.ResponseUtil;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/fortuneCookie")
@CrossOrigin(origins = "*")
public class fortuneCookieController {

    private final fortuneCookieService fortuneCookieService;

    public fortuneCookieController(fortuneCookieService fortuneCookieService) {
        this.fortuneCookieService = fortuneCookieService;
    }

    @Operation(summary = "쿠키 깨트리기", description = "쿠키를 클릭해서 행운의 문구를 볼 수 있도록 데이터베이스에서 랜덤으로 가져옵니다.")
    @PostMapping
    public ResponseEntity<?> fortuneCookieOpen() {
        FortuneCookieResponse fortuneCookieResponse = fortuneCookieService.fortuneCookieOpen();
        return ResponseUtil.success(fortuneCookieResponse);
    }

    @Operation(summary = "공유 받기", description = "공유된 링크 타고 결과값 공유하기")
    @GetMapping("/{uuid}")
    public ResponseEntity<?> getByShareId(@PathVariable UUID uuid) {
        FortuneCookieResponse fortuneCookieResponse = fortuneCookieService.getByShareId(uuid);
        return ResponseUtil.success(fortuneCookieResponse);
    }


}
