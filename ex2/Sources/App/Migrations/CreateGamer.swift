import Fluent

struct CreateGamer: Migration {
    func prepare(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("gamers")
            .id()
            .field("first_name", .string, .required)
            .field("last_name", .string, .required)
            .field("username", .string, .required)
            .create()
    }

    func revert(on database: Database) -> EventLoopFuture<Void> {
        return database.schema("gamers").delete()
    }
}
