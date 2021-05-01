const express = require('express');
const employeeController = require('./controllers/employee.controller');
const { Employee } = require('./models');


const employeeRouter = express.Router();

employeeRouter.post('/', employeeController.create);
employeeRouter.get('/all', employeeController.getAll);
employeeRouter.get('/:id', employeeController.getById); // /employees/
employeeRouter.put('/update/:id', employeeController.updateById);
employeeRouter.delete('/delete/:id', employeeController.deleteById);

const routes = (app) => {

    app.use('/employees', employeeRouter);

    app.get('/', (req, res) => {
        return res.send({ message: "Employee Service Up!" });
    })
}

module.exports = routes;