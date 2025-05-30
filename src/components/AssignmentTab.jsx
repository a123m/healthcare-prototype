// src/components/AssignmentTab.js
import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  Checkbox,
  ListItemText,
  Grid,
} from '@mui/material';
import { format, parseISO } from 'date-fns';

const initialAssignments = [
  { title: 'Morning Shift', date: '2025-05-30', capacity: 5, users: ['Alice'] },
  {
    title: 'Evening Shift',
    date: '2025-05-30',
    capacity: 4,
    users: ['Bob', 'Charlie'],
  },
];

const shiftOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];
const allUsers = ['Alice', 'Bob', 'Charlie', 'David', 'Eva'];

export default function AssignmentTab() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [filterShift, setFilterShift] = useState('');
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [newAssignment, setNewAssignment] = useState({
    shift: 'Morning',
    capacity: '',
    date: new Date().toISOString().slice(0, 10),
    users: [],
  });

  const filteredAssignments = assignments.filter((a) => {
    const shiftMatch = filterShift ? a.title.startsWith(filterShift) : true;
    const dateMatch = filterDate ? a.date === filterDate : true;
    return shiftMatch && dateMatch;
  });

  const handleEdit = (index) => {
    const a = assignments[index];
    const shift = shiftOptions.find((s) => a.title.startsWith(s)) || 'Morning';
    setNewAssignment({
      shift,
      capacity: a.capacity.toString(),
      date: a.date,
      users: a.users,
    });
    setEditingIndex(index);
    setOpen(true);
  };

  const handleSave = () => {
    const { shift, capacity, date, users } = newAssignment;
    if (!shift || !capacity || !date) return;
    const updatedAssignment = {
      title: shift + ' Shift',
      date,
      capacity: parseInt(capacity, 10),
      users,
    };
    setAssignments((prev) => {
      const copy = [...prev];
      if (editingIndex !== null) copy[editingIndex] = updatedAssignment;
      else copy.push(updatedAssignment);
      return copy;
    });
    setOpen(false);
    setEditingIndex(null);
    setNewAssignment({ shift: 'Morning', capacity: '', date: '', users: [] });
  };

  const getAssignmentColor = (assignment) => {
    if (assignment.users.length < assignment.capacity) return '#c8e6c9'; // green
    if (assignment.users.length > assignment.capacity) return '#ffcdd2'; // red
    return '#e0e0e0'; // grey
  };

  return (
    <Box>
      <Box display='flex' gap={2} mb={2} alignItems='center'>
        <Button
          variant='contained'
          onClick={() => {
            setOpen(true);
            setEditingIndex(null);
          }}
        >
          Create Shift
        </Button>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Shift Filter</InputLabel>
          <Select
            value={filterShift}
            label='Shift Filter'
            onChange={(e) => setFilterShift(e.target.value)}
          >
            <MenuItem value=''>
              <em>All</em>
            </MenuItem>
            {shiftOptions.map((shift) => (
              <MenuItem key={shift} value={shift}>
                {shift}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label='Date Filter'
          type='date'
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </Box>

      <Grid container spacing={2}>
        {filteredAssignments.map((a, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Box
              border={1}
              borderRadius={2}
              p={2}
              bgcolor={getAssignmentColor(a)}
            >
              <Typography variant='h6'>{a.title}</Typography>
              <Typography>Date: {a.date}</Typography>
              <Typography>
                Capacity: {a.users.length}/{a.capacity}
              </Typography>
              <Typography>Users: {a.users.join(', ')}</Typography>
              <Button
                variant='outlined'
                onClick={() => handleEdit(idx)}
                sx={{ mt: 1 }}
              >
                Edit
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          {editingIndex !== null ? 'Edit' : 'Create'} Assignment
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel>Shift</InputLabel>
            <Select
              value={newAssignment.shift}
              label='Shift'
              onChange={(e) =>
                setNewAssignment((prev) => ({ ...prev, shift: e.target.value }))
              }
            >
              {shiftOptions.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label='Date'
            type='date'
            fullWidth
            sx={{ my: 1 }}
            value={newAssignment.date}
            onChange={(e) =>
              setNewAssignment((prev) => ({ ...prev, date: e.target.value }))
            }
          />
          <TextField
            label='Capacity'
            type='number'
            fullWidth
            sx={{ my: 1 }}
            value={newAssignment.capacity}
            onChange={(e) =>
              setNewAssignment((prev) => ({
                ...prev,
                capacity: e.target.value,
              }))
            }
          />
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel>Users</InputLabel>
            <Select
              multiple
              value={newAssignment.users}
              onChange={(e) =>
                setNewAssignment((prev) => ({ ...prev, users: e.target.value }))
              }
              renderValue={(selected) => selected.join(', ')}
            >
              {allUsers.map((user) => (
                <MenuItem key={user} value={user}>
                  <Checkbox checked={newAssignment.users.includes(user)} />
                  <ListItemText primary={user} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
