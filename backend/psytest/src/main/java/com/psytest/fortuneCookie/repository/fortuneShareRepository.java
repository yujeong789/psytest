package com.psytest.fortuneCookie.repository;

import com.psytest.fortuneCookie.entity.FortuneShareEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface fortuneShareRepository extends JpaRepository<FortuneShareEntity, UUID> {
}
