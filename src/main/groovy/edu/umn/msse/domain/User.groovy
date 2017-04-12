package edu.umn.msse.domain

import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.OneToMany
import javax.persistence.OneToOne

@Entity
class User extends AbstractEntity {

  String firstName
  String lastName
  Date birthday

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  Address address

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  List<Phone> phoneList

}
