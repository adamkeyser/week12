package edu.umn.msse.service

import edu.umn.msse.Repository.UserRepository
import edu.umn.msse.domain.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserService {

  @Autowired
  UserRepository userRepository

  User getUser(Long s) {
    userRepository.findOne(s)
  }

  Collection<User> getAllUsers() {
    userRepository.findAll()
  }

  User addUser(User user) {
    userRepository.save(user)
  }

  Boolean deleteUser(Long id) {
    userRepository.delete(id)
    return true
  }
}
