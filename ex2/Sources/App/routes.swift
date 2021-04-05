import Fluent
import Vapor

func routes(_ app: Application) throws {
    let gameController = GameController()
    let gamerController = GamerController()
    let publisherController = PublisherController()
    
    //create
    app.post("game", "create", use: gameController.create)
    app.post("gamer", "create", use: gamerController.create)
    app.post("publisher", "create", use: publisherController.create)
    
    
    
    //read
    app.get("games", use: gameController.readAll)
    app.get("gamers", use: gamerController.readAll)
    app.get("publishers", use: publisherController.readAll)
    
    
    //update
    app.post("game", "update", ":id", use: gameController.update)
    app.post("gamer", "update", ":id", use: gamerController.update)
    app.post("publisher", "update", ":id", use: publisherController.update)
    
    
    
    //delete
    app.post("game", "delete", ":id", use: gameController.delete)
      app.post("gamer", "delete", ":id", use: gamerController.delete)
      app.post("publisher", "delete", ":id", use: publisherController.delete)
}
