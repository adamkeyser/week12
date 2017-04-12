package edu.umn.msse.domain

import javax.persistence.Entity

@Entity
class Address extends AbstractEntity {

  String street1
  String street2
  String city
  String state
  Integer zip
}
