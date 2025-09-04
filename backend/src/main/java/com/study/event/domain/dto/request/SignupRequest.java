package com.study.event.domain.dto.request;

import lombok.Builder;

@Builder
public record SignupRequest(
        String email,
        String password
) {
}
