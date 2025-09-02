package com.study.event.service;

import com.study.event.domain.dto.request.EventCreate;
import com.study.event.domain.dto.response.EventDetailResponse;
import com.study.event.domain.dto.response.EventResponse;
import com.study.event.domain.entity.Event;
import com.study.event.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Objects;
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
    public Map<String, Object> getEvents(int pageNo) {

        Slice<Event> eventSlice = eventRepository.findEvents(PageRequest.of(pageNo-1, 4));

        List<EventResponse> events = eventSlice.getContent()
                    .stream()
                    .map(EventResponse::from)
                    .collect(Collectors.toList());

        return Map.of(
                "hasNext", eventSlice.hasNext(),
                "eventList", events
        );
    }

    // 이벤트 생성
    public void saveEvent(EventCreate dto) {
        eventRepository.save(dto.toEntity());
    }

    // 이벤트 단일 조회
    @Transactional(readOnly = true)
    public EventDetailResponse findOne(Long id) {

        Event event = eventRepository.findById(id).orElseThrow();

        return EventDetailResponse.from(event);
    }

    // 이벤트 삭제
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    // 이벤트 수정
    public void modifyEvent(EventCreate dto, Long id) {
        Event event = eventRepository.findById(id).orElseThrow();
        event.changeEvent(dto);
        eventRepository.save(event);
    }
}