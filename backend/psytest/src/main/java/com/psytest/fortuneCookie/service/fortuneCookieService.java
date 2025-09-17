package com.psytest.fortuneCookie.service;

import com.psytest.fortuneCookie.dto.FortuneCookieResponse;
import com.psytest.fortuneCookie.entity.FortuneCookieEntity;
import com.psytest.fortuneCookie.repository.fortuneCookieRepository;
import com.psytest.global.exception.ErrorCode;
import com.psytest.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class fortuneCookieService {

    private final fortuneCookieRepository fortuneCookieRepository;

    public FortuneCookieResponse fortuneCookieOpen() {
        log.info("😊 포춘쿠키를 깨트립니다.");

        log.info("😊 랜덤 인덱스를 선택합니다.");
        Random ramdom = new Random();
        int idx = ramdom.nextInt(500)+1; // 1-500 사이의 랜덤 숫자

        log.info("😊 행운의 문구를 가져옵니다.");
        FortuneCookieEntity fortuneCookieEntity = fortuneCookieRepository.findByFortuneCookieId(idx);
        if (fortuneCookieEntity == null) {
            log.warn("❌ fortuneCookieEntity 조회 실패. 행운의 문구를 가져오지 못했습니다. idx={}", idx);
            throw new GlobalException(HttpStatus.NOT_FOUND, ErrorCode.DATA_NOT_FOUND);
        }

        log.info("😊 행운의 문구 : " + fortuneCookieEntity.getFortune());
        return new FortuneCookieResponse(fortuneCookieEntity.getFortune());
    }
}
