import Fluent
import Vapor

final class Publisher: Model, Content {
    static let schema = "publishers"
    
    @ID(key: .id)
    var id: UUID?

    @Field(key: "name")
    var name: String

    @Field(key: "publisher_site")
    var publisherSite: String

    init() { }

    init(id: UUID? = nil, name: String, publisherSite: String) {
        self.id = id
        self.name = name
        self.publisherSite = publisherSite
    }
}
