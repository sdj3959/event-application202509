package com.study.event.service;

import com.study.event.domain.dto.request.SignupRequest;
import com.study.event.domain.entity.EmailVerification;
import com.study.event.domain.entity.EventUser;
import com.study.event.repository.EmailVerificationRepository;
import com.study.event.repository.EventUserRepository;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class EventUserService {

    // 메일 발송인의 정보
    @Value("${spring.mail.username}")
    private String mailHost;

    // 이메일 발송을 위한 의존객체
    private final JavaMailSender mailSender;

    private final EventUserRepository eventUserRepository;
    private final EmailVerificationRepository emailVerificationRepository;

    // 이메일 중복확인 처리
    @Transactional(readOnly = true)
    public boolean checkEmailDuplicate(String email) {

        // 중복확인
        boolean flag = eventUserRepository.existsByEmail(email);
        log.info("Checking email {} is duplicate: {}", email, flag);

        // 사용가능한 이메일인 경우 인증메일 발송
        if (!flag) processSignUp(email);

        return flag;
    }

    // 인증 코드를 발송할 때 사용할 임시 회원가입 로직
    // 인증코드를 데이터베이스에 저장하려면 회원정보가 필요
    private void processSignUp(String email) {
        // 1. 임시 회원가입
        EventUser tempUser = EventUser.builder()
                .email(email)
                .build();

        EventUser savedUser = eventUserRepository.save(tempUser);

        // 2. 인증 메일 발송
        String code = sendVerificationEmail(email);

        // 3. 인증 코드와 만료시간을 DB에 저장
        EmailVerification verification = EmailVerification.builder()
                .verificationCode(code)
                .expiryDate(LocalDateTime.now().plusMinutes(5))
                .eventUser(savedUser) // FK
                .build();
        emailVerificationRepository.save(verification);
    }

    // 이메일 인증코드 발송 로직
    private String sendVerificationEmail(String email) {

        // 인증코드 생성
        String code = generateCode();

        // 메일 전송 로직
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        try {
            MimeMessageHelper messageHelper
                    = new MimeMessageHelper(mimeMessage, false, "UTF-8");

            // 누구에게 이메일을 보낼지
            messageHelper.setTo(email);

            // 누가 보내는 건지
            messageHelper.setFrom(mailHost);

            // 이메일 제목 설정
            messageHelper.setSubject("[인증메일] 중앙정보스터디 가입 인증 메일입니다.");
            // 이메일 내용 설정
            messageHelper.setText(
                    "인증 코드: <b style=\"font-weight: 700; letter-spacing: 5px; font-size: 30px;\">" + code + "</b>"
                    , true
            );

            // 메일 보내기
            mailSender.send(mimeMessage);

            log.info("{} 님에게 이메일이 발송되었습니다.", email);
            return code;

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("메일 발송에 실패했습니다.");
        }

    }

    // 무작위로 1000~9999 사이의 랜덤 숫자를 생성
    private String generateCode() {
        return String.valueOf((int) (Math.random() * 9000) + 1000);
    }

    /**
     * 클라이언트가 전송한 인증코드를 검증하는 처리
     */
    public boolean isMatchCode(String email, String code) {

        // 이메일을 통해 사용자의 PK를 조회
        EventUser eventUser = eventUserRepository.findByEmail(email).orElseThrow();

        // 사용자의 인증코드를 FK를 통해 데이터베이스에서 조회
        EmailVerification verification = emailVerificationRepository
                .findByEventUser(eventUser).orElseThrow();

        // 코드가 일치하고 만료시간이 지나지 않았는지 체크
        if (
                code.equals(verification.getVerificationCode())
                        && verification.getExpiryDate().isAfter(LocalDateTime.now())
        ) {
            // 이메일 인증 완료처리
            eventUser.completeVerifying();
            eventUserRepository.save(eventUser);

            // 인증번호를 데이터베이스에서 삭제
            emailVerificationRepository.delete(verification);

            return true;
        }
        // 인증코드가 틀렸거나 만료된 경우 자동으로 인증코드를 재발송
        updateVerificationCode(email, verification);

        return false;
    }

    // 인증코드 재발급 처리
    private void updateVerificationCode(String email, EmailVerification verification) {

        // 1. 새 인증코드를 생성하고 메일을 재발송
        String newCode = sendVerificationEmail(email);

        // 2. 데이터베이스에 인증코드와 만료시간을 갱신
        verification.updateNewCode(newCode);
        emailVerificationRepository.save(verification);

    }

    // 회원가입 마무리 처리
    public void confirmSignup(SignupRequest dto) {

        // 임시 회원가입된 회원정보를 조회
        EventUser foundUser = eventUserRepository.findByEmail(dto.email()).orElseThrow();

        // 데이터베이스에 임시회원가입된 회원정보의 패스워드와 생성시간을 채워넣기
        foundUser.confirm(dto.password());
        eventUserRepository.save(foundUser);
    }
}






