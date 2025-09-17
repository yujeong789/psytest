# 1단계: 빌드 단계 (Gradle로 JAR 생성)
FROM gradle:8.5-jdk17 AS build
WORKDIR /app
COPY . .
RUN gradle bootJar --no-daemon

# 2단계: 실행 단계 (JAR만 복사해서 실행)
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
