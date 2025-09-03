package com.study.event.repository;

import com.study.event.domain.entity.EmailVerification;
import com.study.event.domain.entity.EventUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Long> {

    // 사용자의 ID를 통해 인증코드정보 조회
    Optional<EmailVerification> findByEventUser(EventUser eventUser);
}