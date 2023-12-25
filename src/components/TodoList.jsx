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
import BorderColorIcon from '@mui/icons-material/BorderColor';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState('');
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    axios
      .get('https://worried-tux-toad.cyclic.app/api/v1/get-movies')
      .then((response) => {
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setTasks(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    if (editTask) {
      axios
        .put(
          `https://worried-tux-toad.cyclic.app/api/v1/update-movie/${editTask.id}`,
          {
            author: author,
            title: newTask,
            image: image,
          }
        )
        .then((response) => {
          if (Array.isArray(response.data)) {
            setTasks(
              tasks.map((task) =>
                task.id === editTask.id ? response.data[0] : task
              )
            );
            setEditTask(null);
          } else {
            console.error(
              'Update API response is not an array:',
              response.data
            );
          }
        })
        .catch((error) => console.error('Error updating task:', error));
    } else {
      axios
        .post('https://worried-tux-toad.cyclic.app/api/v1/send-movie/', {
          author: author,
          title: newTask,
          image: image,
        })
        .then((response) => {
          if (Array.isArray(response.data)) {
            setTasks([...tasks, response.data[0]]);
          } else {
            console.error('Add API response is not an array:', response.data);
          }
        })
        .catch((error) => console.error('Error adding task:', error));
    }

    setNewTask('');
    setAuthor('');
    setImage('');
  };

  const deleteTask = (id) => {
    axios
      .delete(`https://worried-tux-toad.cyclic.app/api/v1/delete-movie/${id}`)
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) => console.error('Error deleting task:', error));
  };

  const startEdit = (task) => {
    setEditTask(task);
    setNewTask(task.title);
    setAuthor(task.author);
    setImage(task.image);
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
              {editTask && editTask.id === task.id ? (
                <>
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
                </>
              ) : (
                <Link to={`/movies/${task.id}`}>{task.title}</Link>
              )}
            </div>
            <div>
              {editTask && editTask.id === task.id ? (
                <Button variant="contained" color="primary" onClick={addTask}>
                  Update
                </Button>
              ) : (
                <IconButton
                  variant="outlined"
                  color="error"
                  onClick={() => deleteTask(task.id)}
                  style={{ marginLeft: '10px' }}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              {!editTask && (
                <IconButton
                  variant="outlined"
                  color="primary"
                  onClick={() => startEdit(task)}
                  style={{ marginLeft: '10px' }}
                >
                  <BorderColorIcon />
                </IconButton>
              )}
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
          {editTask ? 'Update Task' : 'Add Task'}
        </Button>
      </div>
    </div>
  );
};

export default TodoList;
