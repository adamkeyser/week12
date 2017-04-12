package edu.umn.msse.domain

import groovy.transform.EqualsAndHashCode
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.jpa.domain.support.AuditingEntityListener

import javax.persistence.*
import java.time.LocalDateTime

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode
abstract class AbstractEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  Long id

  @CreatedDate
  LocalDateTime createdDate

  @LastModifiedDate
  LocalDateTime modifiedDate
}
