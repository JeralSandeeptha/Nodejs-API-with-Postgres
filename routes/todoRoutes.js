const express = require('express');
const pool = require('./db');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { task } = req.body;

        const insertQuery = "INSERT INTO todos (task) VALUES ($1) RETURNING *";

        pool.query(insertQuery, [task], (error, data) => {
            if (error) {
                return res.status(500).json({
                    message: "Insert todo failed",
                    error: error
                });
            }
            return res.status(201).json({
                message: "Todo inserted successfully",
                data: data.rows[0]
            });
        });
    }catch (error){
        res.status(500).json({
            message: 'Create user query successful',
            error: error.message
        });
    }
});

router.get('/', async (req, res) => {
    try {

        const query = "SELECT * FROM todos";
        
        pool.query(query, (error, data) => {
            if(error){
                return res.status(500).json({
                    message: "Get all todos query failed",
                    error: error
                });
            }
            return res.status(500).json({
                message: "Get all todos query successful",
                data: data.rows
            });
        });

    }catch (error){
        res.status(500).json({
            message: 'Get all users query successful',
            error: error.message
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const todoId = req.params.id;

        const selectQuery = "SELECT * FROM todos WHERE id = $1";

        pool.query(selectQuery, [todoId], (error, data) => {
            if (error) {
                return res.status(500).json({
                    message: "Error fetching todo",
                    error: error
                });
            }

            if (data.rows.length === 0) {
                return res.status(404).json({
                    message: "Todo not found"
                });
            }

            return res.status(200).json({
                message: "Todo retrieved successfully",
                data: data.rows[0]
            });
        });
    }catch (error){
        res.status(500).json({
            message: 'Get user query successful',
            error: error.message
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const todoId = req.params.id;
        const newTask = req.body.task;

        const updateQuery = "UPDATE todos SET task = $1 WHERE id = $2";
        const values = [newTask, todoId];

        const result = await pool.query(updateQuery, values);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            message: "Todo updated successfully"
        });
    }catch (error){
        res.status(500).json({
            message: 'Update todo query successful',
            error: error.message
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const todoId = req.params.id;

        const deleteQuery = "DELETE FROM todos WHERE id = $1";
        const values = [todoId];

        const result = await pool.query(deleteQuery, values);

        if (result.rowCount === 0) {
            return res.status(404).json({
                message: "Todo not found"
            });
        }

        return res.status(200).json({
            message: "Todo deleted successfully"
        });
    }catch (error){
        res.status(500).json({
            message: 'Delete todo query successful',
            error: error.message
        });
    }
});

module.exports = router;