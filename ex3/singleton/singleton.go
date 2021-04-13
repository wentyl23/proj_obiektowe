package singleton

import (
	"github.com/wentyl23/proj_obiektowe/ex3/model"
	"database/sql"
	"sync"
	"fmt"
	_ "github.com/mattn/go-sqlite3"
)


var once sync.Once

type Singleton struct {
	db *sql.DB
}

var (
	instance *Singleton
)

func GetInstance() *Singleton {

	once.Do(func(){
	
		instance = new(Singleton)
	
	})
	
	return instance
}

func (s *Singleton)Open() *sql.DB {
	db, err := sql.Open("sqlite3", "./test.db")
	
	if err != nil {
		fmt.Println(err.Error())
	} 
	
	_, err = db.Exec("CREATE TABLE employee (id INTEGER PRIMARY KEY AUTOINCREMENT, name text NOT NULL, age INTEGER NOT NULL)") 
	
	if err != nil {
		fmt.Println(err.Error())
	}
	
	if err = db.Ping(); err != nil {
		panic(err)
	} else {
		fmt.Println("Connection with database established")
	}
	s.db=db
	return db
}

func (s *Singleton) Close(){
	if err := s.db.Close(); err != nil {
		panic(err)
	}
}

func (s *Singleton) Query(query string, args ...interface{}) (sql.Result){
	stmt, err := s.db.Prepare(query)
	if err != nil {
		fmt.Println(err.Error())
	}
	result, err2 := stmt.Exec(args...)
	if err2 != nil{
		panic(err2)
	}
	return result
}

func (s *Singleton) Create(name string, age string) {
	query := "INSERT INTO  employee(name, age) VALUES(?,?)"
	result := s.Query(query, name, age)
	fmt.Println(result.LastInsertId())
}

func (s *Singleton) Delete(id string) {
	query := "DELETE FROM employee Where id = ?"
	result := s.Query(query, id)
	fmt.Println(result.RowsAffected())
}

func (s *Singleton) Update(emp *model.Employee){
	query := "UPDATE employee SET name=?, age=? WHERE id=?"
	result := s.Query(query, emp.Name, emp.Age, emp.Id)
	fmt.Println(result.RowsAffected())
	fmt.Println("UPDATE employee SET name=" + emp.Name + ", age=" + emp.Age + " WHERE id=%v",emp.Id)
}

func (s *Singleton) GetAll() (*model.Employees, error) {
	query := "SELECT id, name, age FROM employee order by id"
		rows, err := s.db.Query(query)
		if err != nil {
			fmt.Println(err)
		}
		result := model.Employees{}
		
		for rows.Next() {
			employee := model.Employee{}
			err2 := rows.Scan(&employee.Id, &employee.Name, &employee.Age)
			if err2 != nil {
				return nil,err2
			}
			result.Employees = append(result.Employees, employee)
		}
	return &result, nil
}

func (s *Singleton) GetSingle(requested_id string) *model.Employee{
	var id int64
	var name string 
	var age string
	
	err := s.db.QueryRow("SELECT id, name, age FROM employee WHERE id = ?", requested_id).Scan(&id, &name, &age)
	if err != nil {
		fmt.Println(err)
	}
	response := model.Employee{Id: id, Name: name, Age: age}
	return &response
}

