import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import { mocked } from 'jest-mock';
import Tasks from '../src/screens/Tasks';
import { saveTask, getTasks } from '../src/utils/storage';

jest.mock('../src/utils/storage', () => ({
  getTasks: jest.fn(() => Promise.resolve([])),
  saveTask: jest.fn(() => Promise.resolve()),
}));

const mockedSaveTask = mocked(saveTask);
const mockedGetTasks = mocked(getTasks);

describe('Tasks Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('successfully saved the task, with all fields filled in correctly', async () => {
    render(<Tasks />);

    const titleInput = await screen.findByTestId('task-title-input');
    //const datePicker = screen.getByTestId('date-picker');
    const statusPicker = screen.getByTestId('status-picker');
    const saveButton = screen.getByTestId('save-task-button');

    const testTitle = 'My Tasks for all work';
    const testDate = new Date().toLocaleDateString() ;

    fireEvent.changeText(titleInput, testTitle);
    //fireEvent(datePicker, 'onChange', { nativeEvent: { timestamp: new Date(testDate).toLocaleDateString() } }, new Date(testDate).toLocaleDateString());
    fireEvent(statusPicker, 'onValueChange', 'progress');
    fireEvent.press(saveButton);

    await waitFor(() => {
      expect(mockedSaveTask).toHaveBeenCalledWith(expect.objectContaining({
        title: testTitle,
        status: 'new',
        date: testDate
      }));
    });

    await waitFor(() => {
      expect(screen.getByText(testTitle)).toBeTruthy();
    });
  });

  test('the getTasks function is executed when the component is initialized', async () => {
    render(<Tasks />);
    await waitFor(() => {
      expect(mockedGetTasks).toHaveBeenCalled();
    });
  });
});
