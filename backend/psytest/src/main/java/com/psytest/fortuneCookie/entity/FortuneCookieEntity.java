package com.psytest.fortuneCookie.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "fortune_cookie")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FortuneCookieEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Integer fortuneCookieId;

    @Column(nullable = false, length=1000)
    public String fortune;
}
