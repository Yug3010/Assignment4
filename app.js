var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./config/database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
 
var port     = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


mongoose.connect(database.url);

var Employee = require('./models/employee');
 
 
//get all employee data from db

app.get('/',(req,res)=>{
    res.send('hello world');
})


app.get('/api/employees', async function(req, res) {
    try {
        // Fetch all employees from the database
        const employees = await Employee.find();
        
        // Send the retrieved employees as JSON response
        res.json(employees);
    } catch (err) {
        // If an error occurs, send a 500 status along with the error message
        res.status(500).send(err.message);
    }
});


// get a employee with ID of 1
app.get('/api/employees/:employee_id', async function(req, res) {
    try {
        let id = req.params.employee_id;
        // Use await to wait for the promise returned by findById()
        const employee = await Employee.findById(id);
        
        // If employee is null, return a 404 Not Found status
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        
        // If employee is found, return it as JSON response
        res.json(employee);
    } catch (err) {
        // If an error occurs, send a 500 status along with the error message
        res.status(500).send(err.message);
    }
});



// create employee and send back all employees after creation
app.post('/api/employees', async function(req, res) {
    console.log(req.body);
    try {
        // create a new employee record
        const newEmployee = await Employee.create({
            name: req.body.name,
            salary: req.body.salary,
            age: req.body.age
        });
        
        // fetch all employees after the new record has been created
        const employees = await Employee.find();
        
        res.json(employees);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// create employee and send back all employees after creation
app.put('/api/employees/:employee_id', async function(req, res) {
    console.log(req.body);
    try {
        // Extract employee ID from request parameters
        let id = req.params.employee_id;

        // Extract updated data from request body
        let data = {
            name: req.body.name,
            salary: req.body.salary,
            age: req.body.age
        };

        // Update the employee using findByIdAndUpdate with async/await
        let updatedEmployee = await Employee.findByIdAndUpdate(id, data, { new: true });

        // Check if the employee is found and updated successfully
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // If the employee is successfully updated, send a success response
        res.json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (err) {
        // If an error occurs during the update operation, send a 500 status code along with the error message
        res.status(500).send(err.message);
    }
});



// delete a employee by id
app.delete('/api/employees/:employee_id', async function(req, res) {
    console.log(req.params.employee_id);
    try {
        // Extract employee ID from request parameters
        let id = req.params.employee_id;

        // Delete the employee using findByIdAndDelete with async/await
        let deletedEmployee = await Employee.findByIdAndDelete(id);

        // Check if the employee is found and deleted successfully
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // If the employee is successfully deleted, send a success response
        res.json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (err) {
        // If an error occurs during the delete operation, send a 500 status code along with the error message
        res.status(500).send(err.message);
    }
});


app.listen(port);
console.log("App listening on port : " + port);

