package com.psytest.fortuneCookie.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "fortune_cookie_share")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FortuneShareEntity {

    @Id
    @Column(name = "fortune_cookie_uuid", columnDefinition = "BINARY(16)")
    @JdbcTypeCode(SqlTypes.BINARY)
    private UUID fortuneCookieUuid;

    @Column(name = "fortune_cookie_id", nullable = false)
    private Integer fortuneCookieId;

    @Column(name = "fortune_luck", nullable = false)
    private Integer fortuneLuck;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
