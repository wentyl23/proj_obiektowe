package MMentel.ex4.controller

import javax.servlet.http.HttpServletRequest
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.*
import org.springframework.beans.factory.annotation.Autowired
import MMentel.ex4.model.User
import MMentel.ex4.repository.Repository


@Service 
class Authenticator @Autowired constructor(val repository: Repository){
	fun register(user: User): User {
		return repository.save(user)
	}
}



@RestController
@RequestMapping("/user")
class UserController @Autowired constructor(val authenticator: Authenticator) {
	@PostMapping("/register")
	fun register(@RequestBody user: User): User {
		return authenticator.register(user)
	}


}
