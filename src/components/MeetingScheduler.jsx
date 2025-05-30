// src/components/MeetingScheduler.js
import React, { useState } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../CalendarUtils';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { DateTimePicker } from '@mui/lab';

export default function MeetingScheduler() {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date(),
  });

  const handleSelectSlot = ({ start, end }) => {
    setNewEvent({ title: '', start, end });
    setOpen(true);
  };

  const handleSave = () => {
    setEvents([...events, newEvent]);
    setOpen(false);
  };

  return (
    <Box>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        style={{ height: 600 }}
        onSelectSlot={handleSelectSlot}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Schedule Meeting</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mt: 1 }}>
            <TextField
              fullWidth
              label='Meeting Title'
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
              margin='dense'
            />
            <DateTimePicker
              renderInput={(props) => <TextField {...props} margin='dense' />}
              label='Start Time'
              value={newEvent.start}
              onChange={(date) => setNewEvent({ ...newEvent, start: date })}
            />
            <DateTimePicker
              renderInput={(props) => <TextField {...props} margin='dense' />}
              label='End Time'
              value={newEvent.end}
              onChange={(date) => setNewEvent({ ...newEvent, end: date })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSave}
            disabled={!newEvent.title || newEvent.end <= newEvent.start}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
