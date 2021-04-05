import Fluent
import Vapor

struct PublisherController: RouteCollection {
    func boot(routes: RoutesBuilder) throws {
    }

    func create(req: Request) throws -> EventLoopFuture<Response> {
        return try req.content.decode(Publisher.self).save(on: req.db).map { _ in return req.redirect(to: "/publishers") }
    }
    
    func readAll(_ req: Request) throws -> EventLoopFuture<View> {
    	let currentPublishers = Publisher.query(on: req.db).all()
    	return currentPublishers.flatMap { 
    		publishers in 
    		let info = ["publishersList": publishers]
    		return req.view.render("publishers", info)
    	}
    }
    
    func update(req: Request) throws -> EventLoopFuture<Response> {
    	let input = try req.content.decode(Publisher.self)
    	return Publisher.find(req.parameters.get("id"), on: req.db)
    		.unwrap(or: Abort(.notFound))
    		.flatMap { 
    		publisher in
    		publisher.name = input.name
    		publisher.publisherSite = input.publisherSite
    		return publisher.save(on: req.db).map { _ in return req.redirect(to: "/publishers")}
    		} 
    }

    func delete(req: Request) throws -> EventLoopFuture<Response> {
        return Publisher.find(req.parameters.get("id"), on: req.db)
            .unwrap(or: Abort(.notFound))
            .flatMap { $0.delete(on: req.db) }
            .map { _ in return req.redirect(to: "/publishers")
            }
    }
}
