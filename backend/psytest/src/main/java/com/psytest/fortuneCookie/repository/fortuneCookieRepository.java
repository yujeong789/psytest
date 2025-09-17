package com.psytest.fortuneCookie.repository;

import com.psytest.fortuneCookie.entity.FortuneCookieEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

public interface fortuneCookieRepository extends JpaRepository<FortuneCookieEntity, Integer> {

    FortuneCookieEntity findByFortuneCookieId(@Param("idx") Integer fortuneCookieId);
}
