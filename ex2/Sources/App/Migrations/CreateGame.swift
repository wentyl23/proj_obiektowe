import Fluent

struct CreateGame: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("games")
            .id()
            .field("name", .string, .required)
            //.field("publisher_id", .uuid, .required, .references("publishers","id"))
            .field("publisher_id", .uuid, .required)
            .foreignKey("publisher_id", references: "publishers", "id", onDelete: .cascade, onUpdate: .noAction)
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("games").delete()
    }
}
