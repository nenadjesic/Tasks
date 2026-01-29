import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import Tasks from '../src/screens/Tasks';
import { saveTask, getTasks } from '../src//utils/storage';


jest.mock('../src//utils/storage', () => ({
  getTasks: jest.fn(),
  saveTask: jest.fn(),
}));

describe('Tasks - saveTask test', () => {
  
  test('uspešno shrani nalogo, ko so vsa polja pravilno izpolnjena', async () => {
    render(<Tasks />);

    
    const titleInput = screen.getByTestId('task-title-input');
    const datePicker = screen.getByTestId('date-picker');
    const statusPicker = screen.findByTestId('status-picker');
    const saveButton = screen.getByTestId('save-task-button');


    fireEvent.changeText(titleInput, 'Moja nova dolga naloga');


    fireEvent(datePicker, 'onChange', new Date('2025-01-01'));
    fireEvent(statusPicker, 'onChange', 'progress');


    fireEvent.press(saveButton);


    await waitFor(() => {
      expect(saveTask).toHaveBeenCalledWith(expect.objectContaining({
        title: 'Moja nova dolga naloga',
        status: 'progress',
        completed: false
      }));
    });


    await waitFor(() => {
      expect(screen.getByText('Moja nova dolga naloga')).toBeTruthy();
    });
  });
});

describe('Tasks Lifecycle', () => {
  test('funkcija getTasks se izvede ob inicializaciji komponente', async () => {
    // Renderiramo komponento
    render(<Tasks />);

    // 2. Preverimo, če se je getTasks sprožil (v useEffect)
    await waitFor(() => {
      expect(getTasks).toHaveBeenCalledTimes(1);
    });
  });
});


