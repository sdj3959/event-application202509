package com.study.event.repository;

import com.study.event.domain.entity.Event;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(false)
class EventRepositoryImplTest {

    @Autowired
    EventRepository eventRepository;

//    @Test
//    @DisplayName("bulkInsert")
//    void bulkInsert() {
//        for (int i=1;i<=300;i++) {
//            Event event = Event.builder()
//                    .title("더미 제목" + i)
//                    .description("더미 내용" + i)
//                    .date(LocalDate.now())
//                    .image("https://imgnews.pstatic.net/image/215/2025/09/01/A202509010672_1_20250901195810405.jpg?type=w860")
//                    .build();
//
//            eventRepository.save(event);
//        }
//    }


}