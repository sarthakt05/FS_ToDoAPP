package com.proj.todo.service;


import com.proj.todo.model.Task;
import com.proj.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updatedTask) {
        Task existingTask = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        //existingTask.setName(updatedTask.getName());
        existingTask.setDone(updatedTask.getDone());
        return taskRepository.save(existingTask);
    }

    public List<Task> getTasksByDone(boolean done) {
        return taskRepository.findByDone(done);
    }

    public List<Task> getTasksSortedByDate(String order) {
        if ("asc".equalsIgnoreCase(order)) {
            return taskRepository.findByOrderByCreatedAtAsc();
        } else {
            return taskRepository.findByOrderByCreatedAtDesc();
        }
    }
}