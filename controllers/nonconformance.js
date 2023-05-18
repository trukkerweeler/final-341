const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const getAll = async (req, res) => {
  //#swagger.tags=['Nonconformance-Ref']
  try{
    const result = await mongodb.getDb().db('corrective').collection('nonconformance_id').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOne = async (req, res) => {
    //#swagger.tags=['Nonconformance-Ref']
  try {
    const correctiveId = new ObjectId(req.params.corrective_id);
  const result = await mongodb.getDb().db('corrective').collection('nonconformance_id').find({ corrective_id: correctiveId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  })
  } catch {
    res.status(500).json(err);
  }
};

const createNonconformanceRef= async (req, res) => {
    //#swagger.tags=['Nonconformance-Ref']
    try{ 
    const nonconformanceRef = 
        {
            corrective_id: req.body.corrective_id,
            nonconformance_id: req.body.nonconformance_id,
        }

    const response = await mongodb.getDb().db('corrective').collection('nonconformance_id').insertOne(nonconformanceRef);
    if (response.acknowledged) {
    res.status(201).json(response);
    } else {
    res.status(500).json(response.error || 'Error occured while creating nonconformance-ref.');
    }  
} catch (err) {
  res.status(500).json(err);
}
};

const updateNonconformanceRef = async (req, res) => {
    //#swagger.tags=['Nonconformance-Ref']
    try { 
  const correctiveId = new ObjectId(req.params.corrective_id);
  const nonconformanceRef = {
    corrective_id: req.body.correctiveId,
    nonconformance_id: req.body.nonconformance_id
  };

const response = await mongodb.getDb().db('corrective').collection('nonconformance_id').replaceOne({corrective_id: correctiveId }, nonconformanceRef);
console.log(response);
if (response.acknowledged) {
  res.status(204).send();
} else {
  res.status(500).json(response.error || 'Error occured while updating nonconformance-ref.');
}  
} catch {
  res.status(500).json(err);
}
};

const deleteNonconformanceRef = async (req, res) => {
    //#swagger.tags=['Nonconformance-Ref']
    try{
    const correctiveId = new ObjectId(req.params.corrective_id);
  const response = await mongodb.getDb().db('corrective').collection('nonconformance_id').deleteOne({corrective_id: correctiveId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || 'Error occured while deleting nonconformance-ref.');
  }  
} catch {
  res.status(500).json(err);
}
};

module.exports = { getAll, getOne, createNonconformanceRef, updateNonconformanceRef, deleteNonconformanceRef };