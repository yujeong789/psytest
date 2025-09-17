package com.psytest.fortuneCookie.dto;

import lombok.Getter;

public record FortuneCookieResponse(
        Integer fortuneCookieId,
        String fortune
) {}
