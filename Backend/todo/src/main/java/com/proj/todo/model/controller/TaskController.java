package com.proj.todo.model.controller;

import com.proj.todo.model.Task;
import com.proj.todo.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {
 @Autowired
 private TaskService taskService;

 @GetMapping
 public List<Task> getAllTasks() {
     return taskService.getAllTasks();
 }
 
 @GetMapping("/done")
 public List<Task> getTasksByDone(@RequestParam boolean done) {
     return taskService.getTasksByDone(done);
 }

 @GetMapping("/sorted")
 public List<Task> getTasksSortedByDate(@RequestParam String order) {
     return taskService.getTasksSortedByDate(order);
 }

 @PostMapping
 public Task createTask(@RequestBody Task task) {
     return taskService.createTask(task);
 }

 @PutMapping("/{id}")
 public Task updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
     return taskService.updateTask(id, updatedTask);
 }
 
}
