package edu.umn.msse.controller

import edu.umn.msse.domain.User
import edu.umn.msse.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class UserController {
  @Autowired
  UserService userService

  @GetMapping("/api/users/{id}")
  User getUser(@PathVariable Long id) {
    return userService.getUser(id)
  }

  @GetMapping("/api/users")
  Collection<User> getAllUsers() {
    return userService.getAllUsers()
  }

  @PostMapping("/api/users")
  User getUser(@RequestBody User user) {
    return userService.addUser(user)
  }

  @DeleteMapping("/api/users/{id}")
  Boolean deleteUser(@PathVariable Long id) {
    return userService.deleteUser(id)
  }
}
