package MMentel.ex4.model

import javax.persistence.*


@Entity
class User {

	@Id @GeneratedValue(strategy=GenerationType.AUTO)
	val id: Long = 0
	
	@Column(unique = true)
	val username: String = ""
	
	@Column
	val password: String = ""

}
