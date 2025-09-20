package com.psytest.fortuneCookie.dto;

import java.util.UUID;

public record FortuneCookieResponse(
        UUID fortuneCookieUuid,
        String fortune
) {}
