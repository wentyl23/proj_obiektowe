import Fluent
import Vapor 

final class Game: Model, Content {
    static let schema = "games"
    
    @ID(key: .id)
    var id: UUID?

    @Field(key: "name")
    var name: String

    @Field(key: "publisher_id")
    var publisherId: UUID

    init() { }

    init(id: UUID? = nil, name: String, publisherId: String) {
        self.id = id
        self.name = name
        self.publisherId = UUID(uuidString: publisherId)!
    }
}
