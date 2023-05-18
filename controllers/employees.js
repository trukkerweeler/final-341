const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const passwordUtil = require('../util/passwordComplexityCheck');



const getAll = async (req, res) => {
  //#swagger.tags=['Employees']
  try{
    const result = await mongodb.getDb().db('corrective').collection('employees').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOne = async (req, res) => {
    //#swagger.tags=['Employees']
  try {
    const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('corrective').collection('employees').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  })
  } catch {
    res.status(500).json(err);
  }
};

const createEmployee = async (req, res) => {
    //#swagger.tags=['Employees']
    try{ 
    const employee = 
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday,
            password: req.body.password,
        }
    if (!req.body.firstName || !req.body.lastName) {
        res.status(400).send({message: 'firstname and lastname cannot be empty'});
        return;
    }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) {
      res.status(400).send({ message: passwordCheck.error });
      return;
    }

    const response = await mongodb.getDb().db('corrective').collection('employees').insertOne(employee);
    if (response.acknowledged) {
    res.status(201).json(response);
    } else {
    res.status(500).json(response.error || 'Error occured shile creating employee.');
    }  
} catch (err) {
  res.status(500).json(err);
}
};

const updateEmployee = async (req, res) => {
    //#swagger.tags=['Employees']
    try { 
  const userId = new ObjectId(req.params.id);
  const employee = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  if (!req.body.firstName || !req.body.lastName) 
  {
    res.status(400).send({message: 'firstname and lastname cannot be empty'});
    return;
  }
    const password = req.body.password;
    const passwordCheck = passwordUtil.passwordPass(password);
    if (passwordCheck.error) 
    {
    res.status(400).send({ message: passwordCheck.error });
    return;
    }

const response = await mongodb.getDb().db('corrective').collection('employees').replaceOne({_id: userId }, employee);
console.log(response);
if (response.acknowledged) {
  res.status(204).send();
} else {
  res.status(500).json(response.error || 'Error occured while updating employee.');
}  
} catch {
  res.status(500).json(err);
}
};

const deleteEmployee = async (req, res) => {
    //#swagger.tags=['Employees']
    try{
    const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('corrective').collection('employees').deleteOne({_id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Error occured while deleting employee.');
  }  
} catch {
  res.status(500).json(err);
}
};

module.exports = { getAll, getOne, createEmployee, updateEmployee, deleteEmployee };