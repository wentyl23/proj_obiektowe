package MMentel.ex4.controller
import MMentel.ex4.model.User
import MMentel.ex4.repository.Repository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@Service
class Authenticator @Autowired constructor(val repository: Repository) {
    fun register(user: User) = repository.save(user)

    fun signin(username: String, password: String) = repository.findByUsernameAndPassword(username, password)

    fun signout(username: String) = repository.findByUsername(username)
}

@RestController
@RequestMapping("/user")
class UserController @Autowired constructor(val authenticator: Authenticator) {
    @PostMapping("/register")
    fun register(@RequestBody user: User): User {
        return authenticator.register(user)
    }
    @GetMapping("/signin")
    fun signin(@RequestParam("username") username: String, @RequestParam("password") password: String): String {
        val user = authenticator.signin(username, password)
        return user.username
    }
    @GetMapping("/signout")
    fun signin(@RequestParam("username") username: String): String {
        val user = authenticator.signout(username)
        return user.username
    }
}
