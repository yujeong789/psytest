package com.psytest.fortuneCookie.service;

import com.psytest.fortuneCookie.dto.FortuneCookieResponse;
import com.psytest.fortuneCookie.dto.FortuneCookieCacheResponse;
import com.psytest.fortuneCookie.entity.FortuneShareEntity;
import com.psytest.fortuneCookie.repository.fortuneShareRepository;
import com.psytest.global.exception.ErrorCode;
import com.psytest.global.exception.GlobalException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class fortuneCookieService {

    private final fortuneCookieCache fortuneCookieCache;
    private final fortuneShareRepository fortuneShareRepository;

    public FortuneCookieResponse fortuneCookieOpen() {
        log.info("🥨포춘쿠키를 깨트립니다.");

        log.info("🥨 랜덤 인덱스를 선택합니다.");
        Random ramdom = new Random();
        int idx = ramdom.nextInt(500)+1; // 1-500 사이의 랜덤 숫자
        UUID fortuneCookieUuid = UUID.randomUUID();

        log.info("🥨 행운의 문구를 가져옵니다.");
        FortuneCookieCacheResponse fortuneCookieCacheResponse = fortuneCookieCache.getFortuneCookieOne(idx);
        // FortuneCookieEntity fortuneCookieEntity = fortuneCookieRepository.findByFortuneCookieId(idx);
        if (fortuneCookieCacheResponse == null) {
            log.warn("❌ fortuneCookieEntity 조회 실패. 행운의 문구를 가져오지 못했습니다. idx={}", idx);
            throw new GlobalException(HttpStatus.NOT_FOUND, ErrorCode.DATA_NOT_FOUND);
        }

        log.info("🥨 행운의 문구 : " + fortuneCookieCacheResponse.fortune());

        FortuneShareEntity fortuneShareEntity = new FortuneShareEntity();
        fortuneShareEntity.setFortuneCookieUuid(fortuneCookieUuid);
        fortuneShareEntity.setFortuneCookieId(idx);
        fortuneShareRepository.save(fortuneShareEntity);
        log.info("🥨 DB 저장 성공했습니다.");
        return new FortuneCookieResponse(
                fortuneCookieUuid,
                fortuneCookieCacheResponse.fortune()
        );
    }

    public FortuneCookieResponse getByShareId(UUID uuid) {
        log.info("🥨 공유된 포춭쿠키 결과지를 가져옵니다");

        // uuid로 fortune_id 찾기
        FortuneShareEntity fortuneShareEntity = fortuneShareRepository.findById(uuid)
                .orElseThrow(() -> new GlobalException(HttpStatus.NOT_FOUND, ErrorCode.DATA_NOT_FOUND));
        log.info("🥨 포춘쿠키 아이디를 탐색했습니다. {}", fortuneShareEntity.getFortuneCookieId());

        FortuneCookieCacheResponse fortuneCookieCacheResponse = fortuneCookieCache.getFortuneCookieOne(fortuneShareEntity.getFortuneCookieId());
        log.info("🥨 포춘쿠키 문구를 탐색했습니다. {}", fortuneCookieCacheResponse.fortune());
        return new FortuneCookieResponse(
                fortuneShareEntity.getFortuneCookieUuid(),
                fortuneCookieCacheResponse.fortune()
        );
    }
}
