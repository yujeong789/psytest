package com.psytest.fortuneCookie.service;

import com.psytest.fortuneCookie.dto.FortuneCookieCacheResponse;
import com.psytest.fortuneCookie.repository.fortuneCookieRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class fortuneCookieCache {

    private final fortuneCookieRepository fortuneCookieRepository;

    private final Map<Integer, FortuneCookieCacheResponse> fortune = new HashMap<>();

    @PostConstruct
    public void loadCache() {
        log.info("🥨 포춘쿠키 캐싱을 시작합니다.");
        fortuneCookieRepository.findAll().forEach(entity ->
                fortune.put(
                        entity.getFortuneCookieId(),
                        new FortuneCookieCacheResponse(entity.getFortuneCookieId(), entity.getFortune())
                        )
                );
        log.info("🥨 포춘쿠키 캐싱이 완료되었습니다. size=" + fortune.size());
    }

    public FortuneCookieCacheResponse getFortuneCookieOne(int idx) {
        return fortune.get(idx);
    }

}
