package model

type Employee struct{
	Id int64 `json:"id"`
	Name string `json:"name"`
	Age string `json:"age"`
}

type Employees struct {
	Employees []Employee `json:"employees"`
}

