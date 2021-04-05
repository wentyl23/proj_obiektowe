import Fluent
import Vapor

struct GameController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
    }

    func create(req: Request) throws -> EventLoopFuture<Response> {
        return try req.content.decode(Game.self).save(on: req.db).map { _ in return req.redirect(to: "/games") }
    }
    
    func readAll(_ req: Request) throws -> EventLoopFuture<View> {
    	let currentGames = Game.query(on: req.db).all()
    	return currentGames.flatMap { 
    		games in 
    		let info = ["gamesList": games]
    		return req.view.render("games", info)
    	}
    }
    
    func update(req: Request) throws -> EventLoopFuture<Response> {
    	let input = try req.content.decode(Game.self)
    	return Game.find(req.parameters.get("id"), on: req.db)
    		.unwrap(or: Abort(.notFound))
    		.flatMap { 
    		game in
    		game.name = input.name
    		game.publisherId = input.publisherId
    		return game.save(on: req.db).map { _ in return req.redirect(to: "/games")}
    		} 
    }

    func delete(req: Request) throws -> EventLoopFuture<Response> {
        return Game.find(req.parameters.get("id"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .map { _ in return req.redirect(to: "/games")}
    }
}
