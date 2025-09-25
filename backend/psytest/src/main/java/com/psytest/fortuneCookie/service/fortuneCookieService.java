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

import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Slf4j
@Service
@RequiredArgsConstructor
public class fortuneCookieService {

    private static final Map<Integer, String> KEYWORDS;
    static {
        Map<Integer, String> m = new LinkedHashMap<>();
        m.put(1,  "😌 휴식");
        m.put(2,  "🧹 정리");
        m.put(3,  "🚶‍♀️ 산책");
        m.put(4,  "💧 수분");
        m.put(5,  "🌬️ 호흡");
        m.put(6,  "🙏 감사");
        m.put(7,  "📵 디지털 다이어트");
        m.put(8,  "📚 배움");
        m.put(9,  "🤝 연결");
        m.put(10, "🔁 루틴 리셋");
        m.put(11, "🎯 집중");
        m.put(12, "🧠 마음챙김");
        m.put(13, "🗂️ 계획");
        m.put(14, "💤 수면");
        m.put(15, "🧘 스트레칭");
        m.put(16, "🍎 건강 식단");
        m.put(17, "✍️ 기록/저널");
        m.put(18, "🎧 음악");
        m.put(19, "☀️ 햇빛 쬐기");
        m.put(20, "🧑‍🍳 취미");
        KEYWORDS = Collections.unmodifiableMap(m);
    }
    private final fortuneCookieCache fortuneCookieCache;
    private final fortuneShareRepository fortuneShareRepository;

    public FortuneCookieResponse fortuneCookieOpen() {
        log.info("🥨포춘쿠키를 깨트립니다.");
        Random random = new Random();
        int idx = random.nextInt(500)+1; // 1-500 사이의 랜덤 숫자
        UUID fortuneCookieUuid = UUID.randomUUID();

        log.info("🥨 행운의 문구를 가져옵니다.");
        FortuneCookieCacheResponse fortuneCookieCacheResponse = fortuneCookieCache.getFortuneCookieOne(idx);
        // FortuneCookieEntity fortuneCookieEntity = fortuneCookieRepository.findByFortuneCookieId(idx);
        if (fortuneCookieCacheResponse == null) {
            log.warn("❌ fortuneCookieEntity 조회 실패. 행운의 문구를 가져오지 못했습니다. idx={}", idx);
            throw new GlobalException(HttpStatus.NOT_FOUND, ErrorCode.DATA_NOT_FOUND);
        }

        log.info("🥨 행운의 문구 : " + fortuneCookieCacheResponse.fortune());

        // 행운지수
        ThreadLocalRandom r = ThreadLocalRandom.current();
        // 70%는 81~100, 30%는 1~80
        int luck = (r.nextInt(10) > 3)    // 0~9 중 0..6 == 70%
                ? r.nextInt(71, 101)      // 상한 미포함이므로 101
                : r.nextInt(1, 71);       // 1~80

        // 행운
        int keywordIdx = random.nextInt(KEYWORDS.size())+1;
        String keyword = KEYWORDS.get(keywordIdx);

        FortuneShareEntity fortuneShareEntity = new FortuneShareEntity();
        fortuneShareEntity.setFortuneCookieUuid(fortuneCookieUuid);
        fortuneShareEntity.setFortuneLuck(luck);
        fortuneShareEntity.setFortuneCookieId(idx);
        fortuneShareEntity.setKeyword(keyword);
        fortuneShareRepository.save(fortuneShareEntity);
        log.info("🥨 DB 저장 성공했습니다.");
        return new FortuneCookieResponse(
                fortuneCookieUuid,
                fortuneCookieCacheResponse.fortune(),
                fortuneShareEntity.getFortuneLuck(),
                fortuneShareEntity.getKeyword()
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
                fortuneCookieCacheResponse.fortune(),
                fortuneShareEntity.getFortuneLuck(),
                fortuneShareEntity.getKeyword()
        );
    }
}
