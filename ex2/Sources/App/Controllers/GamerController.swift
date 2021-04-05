import Fluent
import Vapor

struct GamerController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
    }

    func create(req: Request) throws -> EventLoopFuture<Response> {
        let gamer = try req.content.decode(Gamer.self)
        return gamer.save(on: req.db).map { _ in return req.redirect(to: "/gamers") }
    }
    
    func readAll(_ req: Request) throws -> EventLoopFuture<View> {
    	let currentGamers = Gamer.query(on: req.db).all()
    	return currentGamers.flatMap { 
    		gamers in 
    		let info = ["gamersList": gamers]
    		return req.view.render("gamers", info)
    	}
    }
    
    func update(req: Request) throws -> EventLoopFuture<Response> {
    	let input = try req.content.decode(Gamer.self)
    	return Gamer.find(req.parameters.get("id"), on: req.db)
    		.unwrap(or: Abort(.notFound))
    		.flatMap { 
    		gamer in
    		gamer.firstName = input.firstName
    		gamer.lastName = input.lastName
    		gamer.username = input.username
    		return gamer.save(on: req.db).map { _ in return req.redirect(to: "/gamers")}
    		} 
    }

    func delete(req: Request) throws -> EventLoopFuture<Response> {
        return Gamer.find(req.parameters.get("id"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .map { _ in return req.redirect(to: "/gamers")
            }
    }
}
