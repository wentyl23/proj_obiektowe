package main

import (
	"github.com/wentyl23/proj_obiektowe/ex3/singleton"
	"github.com/wentyl23/proj_obiektowe/ex3/model"
	"fmt"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"net/http"
)




func main() {
	fmt.Println("whatsUp?")
	e := echo.New()
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.PUT, echo.POST, echo.DELETE},
	}))

    route := "/employee"
	
	s := singleton.GetInstance()
	s.Open()
	
	e.DELETE(route + "/:id", func(c echo.Context) error{
	
		requestedId := c.Param("id")
		s.Delete(requestedId)
		return c.JSON(http.StatusOK, "Deleted")
	
	})
	e.POST(route, func(c echo.Context) error{
		emp := new (model.Employee)
		if err := c.Bind(emp); err != nil {
			return err
		}
		s.Create(emp.Name, emp.Age)
		return c.JSON(http.StatusCreated, emp.Name)
	})
	
	e.PUT(route, func(c echo.Context) error{
		emp := new (model.Employee)
		if err := c.Bind(emp); err != nil {
			return err 
		}
		s.Update(emp)
		return c.JSON(http.StatusCreated, emp)
	})
	
	
	e.GET(route, func(c echo.Context) error{
		result, err := s.GetAll()
		if err != nil{
			return err
		}
		return c.JSON(http.StatusCreated, result)
	})
	
	e.GET(route + "/:id", func(c echo.Context) error{
		requestedId := c.Param("id")
		result := s.GetSingle(requestedId)
		return c.JSON(http.StatusOK, result)
	})
	
	fmt.Println("Starting server")
	if err := e.Start(":8080"); err != nil {
		panic(err)
	}
	s.Close()
}

