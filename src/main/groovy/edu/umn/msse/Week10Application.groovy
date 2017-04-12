package edu.umn.msse

import edu.umn.msse.Repository.UserRepository
import edu.umn.msse.domain.Address
import edu.umn.msse.domain.User
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.data.jpa.repository.config.EnableJpaAuditing
import org.springframework.http.client.ClientHttpRequestFactory
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.transaction.annotation.Transactional
import org.springframework.web.client.RestTemplate

@SpringBootApplication
@EnableJpaAuditing
class Week10Application {


	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder

	@Bean
	RestTemplate restTemplate(RestTemplateBuilder builder) {
		builder.requestFactory(getClientHttpRequestFactory())
		return builder.build()
	}

	private static ClientHttpRequestFactory getClientHttpRequestFactory() {
		HttpComponentsClientHttpRequestFactory clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory()
		clientHttpRequestFactory.setConnectTimeout(200)
		clientHttpRequestFactory.setConnectionRequestTimeout(100)
		clientHttpRequestFactory.setReadTimeout(3000)
		return clientHttpRequestFactory
	}

  @Bean
  CommandLineRunner onStart(UserRepository userRepository) {
    return new CommandLineRunner() {
      @Override
      @Transactional
      void run(String... args) throws Exception {
        User user = new User(firstName: 'Adam', lastName: 'Keyser', birthday: new Date(), address: new Address(state: 'MN', street1: '1234 Fake Lane', zip: 55444, city: 'Rogers'))
        User user1 = new User(firstName: 'Bob', lastName: 'Thompson', birthday: new Date(), address: new Address(state: 'WI', street1: '1234 Not Real Ave', zip: 45432, city: 'City Name'))
        User user2 = new User(firstName: 'Sara', lastName: 'Schutlz', birthday: new Date(), address: new Address(state: 'SD', street1: '1234 Nope Street', zip: 43234, city: 'Ports'))
        User user3 = new User(firstName: 'Martha', lastName: 'Baker', birthday: new Date(), address: new Address(state: 'TX', street1: '1234 Alley Park Drive', zip: 23444, city: 'Fraggle'))
        userRepository.save(user)
        userRepository.save(user1)
        userRepository.save(user2)
        userRepository.save(user3)

      }
    }
  }

	static void main(String[] args) {
		SpringApplication.run Week10Application, args
	}
}
