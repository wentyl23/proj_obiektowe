package MMentel.ex4.repository

import MMentel.ex4.model.User
import org.springframework.data.repository.CrudRepository
import org.springframework.lang.Nullable

interface Repository: CrudRepository<User, Int> {
	@Nullable 
	fun findByUsernameAndPassword(username: String, password: String): User
	
	@Nullable
	fun findByUsername(username: String): User

}
