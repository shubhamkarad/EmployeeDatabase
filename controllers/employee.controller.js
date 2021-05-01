const { Employee } = require("../models");
const config = require("../config");
const employeeModel = require("../models/employee.model");

const create = async (req, res) => {
  console.log("create emp");

  const { empId, empName, empSalary } = req.body;

  let status;
  let message;

  try {
    const emp = new Employee({
      empId: empId,
      name: empName,
      salary: empSalary,
    });
    await emp.save();
    status = 200;
    message = "Employee create successfully";
  } catch (err) {
    console.log("Some error occured", err);
    console.log(err.stack);
    status = 400;
    message = "Bad request";
  }

  res.status(status).send({ message });
};

const getAll = async (req, res) => {
  let status;
  let message;

  const { filterByName } = req.query;

  console.log(filterByName);
  try {
    const query = {};
    if (filterByName) {
      query["name"] = filterByName;
    }
    message = await Employee.find(query);
    status = 200;
  } catch (err) {
    console.log("Some error occured", err);
    console.log(err.stack);
    status = 400;
    message = "Bad request";
  }
  res.status(status).send({
    message: message.map((emp) => ({
      empId: emp.empId,
      empSalary: emp.salary,
      empName: emp.name,
    })),
  });
};

const getById = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;

  let status;
  let message;

  try {
    const emp = await Employee.find({ empId: id });
    status = 200;
    message = emp;
    
  } catch (err) {
    console.log("Some error occured", err);
    console.log(err.stack);
    status = 400;
    message = "Bad request!!!";
  }

  res.status(status).send( {message} );
};
//update employee by Id
const updateById = async (req, res)=>{   
  let message;
  let statusCode;
  const id = req.params.id;

  const empName = req.body.name;
  const empSalary =  req.body.salary;

  try{
      let employee = await Employee.findOne({empId : id});
      if(empName){
        employee.name = empName;
      }
      if(empSalary){
        employee.salary = empSalary;
      }

      await employee.save();
      statusCode=200;
      message="updated";
  }catch(err){
    console.log("error occured",err);
    statusCode=400
    message="try again";
  }
    res.status(statusCode).send({message});
};
//delete employee by id
const deleteById= async(req, res)=>{
      let message;
      let statusCode;
      const id = req.params.id;
  try{
      let emp = await Employee.findOne({empId :id});
      console.log("deleting")
      if(!emp){
        return res.status(401).send("Employee not found");
      }
      await Employee.findByIdAndDelete(emp);
      res.status(200).send("deleted successfully");
  }catch(err){
    console.log("error occured",err);
    statusCode=400;
    message="try again";
  }
  res.status(statusCode).send({message}); 
}
module.exports = {
  create,
  getAll,
  getById,
  updateById,
  deleteById
};

