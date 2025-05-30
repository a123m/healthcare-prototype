// src/components/AdminDashboardTab.js
import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TableSortLabel,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const initialStaff = [
  {
    id: 'S001',
    name: 'Alice',
    role: 'Nurse',
    department: 'ICU',
    shift: 'Morning',
    date: '2025-05-30',
    contact: '1234567890',
    preference: 'Morning',
  },
  {
    id: 'S001',
    name: 'Alice',
    role: 'Nurse',
    department: 'ICU',
    shift: 'Evening',
    date: '2025-05-30',
    contact: '1234567890',
    preference: 'Morning',
  },
  {
    id: 'S002',
    name: 'Bob',
    role: 'Doctor',
    department: 'ER',
    shift: 'Evening',
    date: '2025-05-30',
    contact: '1234567890',
    preference: 'Morning',
  },
  {
    id: 'S003',
    name: 'Charlie',
    role: 'Support',
    department: 'ICU',
    shift: 'Night',
    date: '2025-05-30',
    contact: '1234567890',
    preference: 'Morning',
  },
];

const uniqueValues = (list, key) => [...new Set(list.map((item) => item[key]))];

export default function AdminDashboardTab() {
  const [staffData, setStaffData] = useState(initialStaff);
  const [filters, setFilters] = useState({
    id: '',
    name: '',
    role: '',
    department: '',
    shift: '',
    date: '',
  });
  const [editingStaff, setEditingStaff] = useState(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({
    id: '',
    name: '',
    role: '',
    department: '',
    shift: '',
    date: new Date().toISOString().slice(0, 10),
  });
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  const handleFilterChange = (field) => (e) => {
    setFilters((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleDelete = (id, date, shift) => {
    setStaffData((prev) =>
      prev.filter((s) => !(s.id === id && s.date === date && s.shift === shift))
    );
  };

  const handleEdit = (staff) => {
    setEditingStaff({ ...staff });
  };

  const handleEditChange = (field) => (e) => {
    setEditingStaff((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleEditSave = () => {
    setStaffData((prev) =>
      prev.map((s) => (s.id === editingStaff.id ? editingStaff : s))
    );
    setEditingStaff(null);
  };

  const handleEditCancel = () => {
    setEditingStaff(null);
  };

  const handleNewStaffChange = (field) => (e) => {
    setNewStaff((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleCreateStaff = () => {
    if (
      newStaff.id &&
      newStaff.name &&
      newStaff.role &&
      newStaff.department &&
      newStaff.shift &&
      newStaff.date
    ) {
      setStaffData((prev) => [...prev, newStaff]);
      setNewStaff({
        id: '',
        name: '',
        role: '',
        department: '',
        shift: '',
        date: new Date().toISOString().slice(0, 10),
      });
      setCreateDialogOpen(false);
    }
  };

  const filteredStaff = staffData.filter((staff) =>
    Object.entries(filters).every(
      ([key, value]) =>
        value === '' || staff[key].toLowerCase().includes(value.toLowerCase())
    )
  );

  const sortedStaff = [...filteredStaff].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const roles = uniqueValues([...staffData, newStaff], 'role');
  const departments = uniqueValues([...staffData, newStaff], 'department');
  const shifts = uniqueValues([...staffData, newStaff], 'shift');

  const getRowColor = (staff) => {
    const sameDayAssignments = staffData.filter(
      (s) => s.id === staff.id && s.date === staff.date
    );
    return sameDayAssignments.length > 1 ? '#f8d7da' : 'inherit';
  };

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Staff Overview
      </Typography>

      <Box display='flex' flexWrap='wrap' gap={2} mb={2}>
        <TextField
          label='Staff ID'
          value={filters.id}
          onChange={handleFilterChange('id')}
          sx={{ width: 150 }}
        />
        <TextField
          label='Name'
          value={filters.name}
          onChange={handleFilterChange('name')}
          sx={{ width: 150 }}
        />
        <TextField
          label='Role'
          select
          value={filters.role}
          onChange={handleFilterChange('role')}
          sx={{ width: 150 }}
        >
          <MenuItem value=''>All</MenuItem>
          {roles.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label='Department'
          select
          value={filters.department}
          onChange={handleFilterChange('department')}
          sx={{ width: 150 }}
        >
          <MenuItem value=''>All</MenuItem>
          {departments.map((d) => (
            <MenuItem key={d} value={d}>
              {d}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label='Shift'
          select
          value={filters.shift}
          onChange={handleFilterChange('shift')}
          sx={{ width: 150 }}
        >
          <MenuItem value=''>All</MenuItem>
          {shifts.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label='Date'
          type='date'
          value={filters.date}
          onChange={handleFilterChange('date')}
          sx={{ width: 150 }}
          InputLabelProps={{ shrink: true }}
        />
        <Button variant='contained' onClick={() => setCreateDialogOpen(true)}>
          Add Staff
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              {[
                'id',
                'name',
                'role',
                'department',
                'shift',
                'preference',
                'date',
                'contact',
              ].map((col) => (
                <TableCell key={col}>
                  <TableSortLabel
                    active={sortConfig.key === col}
                    direction={
                      sortConfig.key === col ? sortConfig.direction : 'asc'
                    }
                    onClick={() => handleSort(col)}
                  >
                    {col.charAt(0).toUpperCase() + col.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStaff.map((staff) => (
              <TableRow
                key={`${staff.id}-${staff.date}-${staff.shift}`}
                sx={{ backgroundColor: getRowColor(staff) }}
              >
                <TableCell>{staff.id}</TableCell>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>{staff.department}</TableCell>
                <TableCell>{staff.shift}</TableCell>
                <TableCell>{staff.preference}</TableCell>
                <TableCell>{staff.date}</TableCell>
                <TableCell>{staff.contact}</TableCell>
                <TableCell align='right'>
                  <IconButton size='small' onClick={() => handleEdit(staff)}>
                    <EditIcon fontSize='small' />
                  </IconButton>
                  <IconButton
                    size='small'
                    onClick={() =>
                      handleDelete(staff.id, staff.date, staff.shift)
                    }
                  >
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {sortedStaff.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align='center'>
                  No matching staff found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={!!editingStaff} onClose={handleEditCancel}>
        <DialogTitle>Edit Staff</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label='Name'
            value={editingStaff?.name || ''}
            onChange={handleEditChange('name')}
          />
          <TextField
            label='Role'
            select
            value={editingStaff?.role}
            onChange={handleEditChange('role')}
          >
            {uniqueValues([...staffData], 'role').map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label='Department'
            select
            value={editingStaff?.department}
            onChange={handleEditChange('department')}
          >
            {uniqueValues([...staffData], 'department').map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label='Shift'
            select
            value={editingStaff?.shift}
            onChange={handleEditChange('shift')}
          >
            {uniqueValues([...staffData], 'shift').map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label='Date'
            type='date'
            value={editingStaff?.date}
            onChange={handleEditChange('date')}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel}>Cancel</Button>
          <Button onClick={handleEditSave} variant='contained'>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Dialog */}
      <Dialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
      >
        <DialogTitle>Add New Staff</DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
        >
          <TextField
            label='Staff ID'
            value={newStaff.id}
            onChange={handleNewStaffChange('id')}
          />
          <TextField
            label='Name'
            value={newStaff.name}
            onChange={handleNewStaffChange('name')}
          />
          <TextField
            label='Role'
            select
            value={editingStaff?.role}
            onChange={handleNewStaffChange('role')}
          >
            {uniqueValues([...staffData], 'role').map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label='Department'
            select
            value={editingStaff?.department}
            onChange={handleNewStaffChange('department')}
          >
            {uniqueValues([...staffData], 'department').map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label='Shift'
            select
            value={editingStaff?.shift}
            onChange={handleNewStaffChange('shift')}
          >
            {uniqueValues([...staffData], 'shift').map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label='Date'
            type='date'
            value={editingStaff?.date}
            onChange={handleNewStaffChange('date')}
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateStaff} variant='contained'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
