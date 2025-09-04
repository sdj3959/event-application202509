package com.study.event.domain.dto.request;

import lombok.Builder;

@Builder
public record LoginRequest(
        String email,
        String password,
        boolean autoLogin
) {
}
