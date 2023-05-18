const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');
const validator = require('../validator');


const getAll = async (req, res) => {
    //#swagger.tags=['Corrective']
    try{
    const result = await mongodb.getDb().db('corrective').collection('corrective').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOne = async (req, res) => {
    //#swagger.tags=['Corrective']
    try {
    const corrective = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db('corrective').collection('corrective').find({ _id: corrective });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  })
  } catch {
    res.status(500).json(err);
  }
};

const createCorrective = async (req, res) => {
    //#swagger.tags=['Corrective']
    try{ 
    const corrective = {
    corrective_id: req.body.corrective_id,
    description: req.body.description,
    subject: req.body.subject,
    assigned_to: req.body.assigned_to,
    closed: req.body.closed,
    created_date: req.body.created_date,
    closed_date: req.body.closed_date
  };
  if (!req.body.corrective_id || !req.body.description) {
    res.status(400).send({message: 'content cannot be empty'});
    return;
  }
const response = await mongodb.getDb().db('corrective').collection('corrective').insertOne(corrective);
if (response.acknowledged) {
  res.status(201).json(response);
} else {
  res.status(500).json(response.error || 'Error occured while creating corrective.');
}  
} catch (err) {
  res.status(500).json(err);
}
};

const updateCorrective = async (req, res) => {
    //#swagger.tags=['Corrective']
    try { 
  const correctiveId = new ObjectId(req.params.id);
  const corrective = {
    corrective_id: req.body.corrective_id,
    description: req.body.description,
    subject: req.body.subject,
    assigned_to: req.body.assigned_to,
    closed: req.body.closed,
    created_date: req.body.created_date,
    closed_date: req.body.closed_date
  };
const response = await mongodb.getDb().db('corrective').collection('corrective').replaceOne({_id: correctiveId }, corrective);
console.log(response);
if (response.acknowledged) {
  res.status(204).send();
} else {
  res.status(500).json(response.error || 'Error occured shile updating corrective.');
}  
} catch {
  res.status(500).json(err);
}
};

const deleteCorrective = async (req, res) => {
    //#swagger.tags=['Corrective']
    try{
    const correctiveId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('corrective').collection('corrective').deleteOne({_id: correctiveId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Error occured while deleting corrective.');
  }  
} catch {
  res.status(500).json(err);
}
};

module.exports = { getAll, getOne, createCorrective, updateCorrective, deleteCorrective };
