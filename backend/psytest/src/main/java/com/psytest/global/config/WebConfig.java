package com.psytest.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // CORS를 사용할 URL패턴 정의
                .allowedOrigins("*") // localhost:8080과 같이 자원 공유를 허락할 Origin 지정 가능
                .allowedMethods("GET", "POST", "PUT", "DELETE") // 허용할 HTTP 메서드 지정
                .allowedHeaders("Authorization", "Content-Type") // 헤더 지정
                .exposedHeaders("Custom-Header") // 클라이언트 측 응답에서 노출되는 헤더 지정
                .allowCredentials(true) // 클라이언트 요청에 credentials(쿠키, 인증 헤더)포함 여부 지정 
                .maxAge(3600); // 원하는 시간만큼 pre-flight 리퀘스트 캐싱 가능
    }
}
