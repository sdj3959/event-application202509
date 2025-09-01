package com.study.event.service;

import com.study.event.domain.dto.request.EventCreate;
import com.study.event.domain.dto.response.EventResponse;
import com.study.event.domain.entity.Event;
import com.study.event.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class EventService {

    private final EventRepository eventRepository;

    // 전체 조회
    @Transactional(readOnly = true)
    public List<EventResponse> getEvents() {
        return eventRepository.findAll()
                .stream()
                .map(EventResponse::from)
                .collect(toList());
    }

    // 이벤트 생성
    public void saveEvent(EventCreate dto) {
        eventRepository.save(dto.toEntity());
    }
}