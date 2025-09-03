package com.study.event.repository;

import com.study.event.domain.entity.EventUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventUserRepository extends JpaRepository<EventUser, Long> {

    boolean existsByEmail(String email);

    Optional<EventUser> findByEmail(String email);
}