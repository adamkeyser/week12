package edu.umn.msse.domain

import javax.persistence.Entity


@Entity
class Phone extends AbstractEntity {
    String number
}
