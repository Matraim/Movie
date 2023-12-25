import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Input,
  List,
  ListItem,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    axios
      .get('https://worried-tux-toad.cyclic.app/api/v1/get-movies')
      .then((response) => {
        console.log('API Response:', response.data);
        setTasks(response.data);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    axios
      .post('https://worried-tux-toad.cyclic.app/api/v1/send-movie/', {
        author: author,
        title: newTask,
        image: image,
      })
      .then((response) => setTasks([...tasks, response.data]))
      .catch((error) => console.error('Error adding task:', error));
  };

  const deleteTask = (id) => {
    axios
      .delete(`https://worried-tux-toad.cyclic.app/api/v1/delete-movie/${id}`)
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) => console.error('Error deleting task:', error));
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Movie Todo List
      </Typography>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={task.image}
                alt="Icon"
                style={{ width: '24px', height: '24px', marginRight: '10px' }}
              />
              <Link to={`/movies/${task.id}`}>{task.title}</Link>
            </div>
            <div>
              <IconButton
                variant="outlined"
                color="error"
                onClick={() => deleteTask(task.id)}
                style={{ marginLeft: '10px' }}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          </ListItem>
        ))}
      </List>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <Input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Movie Title"
          style={{ marginRight: '10px' }}
        />
        <Input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
          style={{ marginRight: '10px' }}
        />
        <Input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={addTask}>
          Add Task
        </Button>
      </div>
    </div>
  );
};

export default TodoList;