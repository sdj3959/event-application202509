package com.study.event.api;

import com.study.event.domain.dto.request.EventCreate;
import com.study.event.domain.dto.response.EventResponse;
import com.study.event.domain.entity.Event;
import com.study.event.service.EventService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/events")
@Slf4j
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    // 전체 조회 요청
    @GetMapping
    public ResponseEntity<?> getList() {
        List<EventResponse> events = eventService.getEvents();

        return ResponseEntity.ok().body(events);
    }

    // 생성 요청
    @PostMapping
    public ResponseEntity<?> create(@RequestBody EventCreate dto) {
        eventService.saveEvent(dto);

        return ResponseEntity.ok().body(Map.of(
                "message", "이벤트가 정상 등록되었습니다."
        ));
    }
}