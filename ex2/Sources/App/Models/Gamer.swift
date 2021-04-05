import Fluent
import Vapor

final class Gamer: Model, Content {
    static let schema = "gamers"
    
    @ID(key: .id)
    var id: UUID?

    @Field(key: "first_name")
    var firstName : String

    @Field(key: "last_name")
    var lastName : String
    
    @Field(key: "username")
    var username: String

    init() { }

    init(id: UUID? = nil, firstName : String, lastName : String, username : String) {
        self.id = id
        self.firstName = firstName
        self.lastName = lastName
        self.username = username
    }
}
