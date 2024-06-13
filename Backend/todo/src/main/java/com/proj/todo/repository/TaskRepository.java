package com.proj.todo.repository;

import com.proj.todo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByDone(boolean done);
    List<Task> findByOrderByCreatedAtAsc();
    List<Task> findByOrderByCreatedAtDesc();
}