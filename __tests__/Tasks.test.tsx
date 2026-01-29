import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import Tasks from '../src/screens/Tasks';
import { saveTask, getTasks } from '../src//utils/storage';
import { GuidGenerator } from '../src/utils/generator';


jest.mock('../src//utils/storage', () => ({
  getTasks: jest.fn(),
  saveTask: jest.fn(),
}));

describe('Tasks - saveTask test', () => {
  
test('successfully saved the account, with all fields filled in correctly', async () => {
    render(<Tasks />);

    
    const titleInput = screen.getByTestId('task-title-input');
    const datePicker = screen.getByTestId('date-picker');
    const statusPicker = screen.findByTestId('status-picker');
    const saveButton = screen.getByTestId('save-task-button');


    fireEvent.changeText(titleInput, 'My Tasks for all work peoples in world...');


    fireEvent(datePicker, 'onChange', new Date('2025-01-01'));
    fireEvent(statusPicker, 'onChange', 'progress');


    fireEvent.press(saveButton);


    await waitFor(() => {
      expect(saveTask).toHaveBeenCalledWith(expect.objectContaining({
        id: GuidGenerator.short(),
        title: 'My long tasks ',
        status: 'progress',
        date: new Date('2025-01-01'),
        completed: false
      }));
    });


    await waitFor(() => {
      expect(screen.getByText('My new debt account')).toBeTruthy();
    });
  });
});

describe('Tasks Lifecycle', () => {
  test('the getTasks function is executed when the component is initialized', async () => {
    render(<Tasks />);
    await waitFor(() => {
      expect(getTasks).toHaveBeenCalledTimes(1);
    });
  });
});


