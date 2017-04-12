package edu.umn.msse.pages

import geb.Page


class HomePage extends Page {
  static url = "/"

  static at = { title == 'Nyt' }

  static content = {
    homepage {
      $("app-root nav .navbar-brand")
    }
  }

  String getHomePageHeader() {
    homepage.text().trim()
  }
}
