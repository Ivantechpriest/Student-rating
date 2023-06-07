import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Addstudent from '../addstudent';
import Editstudent from '../editstudent';
import DeleteStudent from '../deletestudent';
import { BrowserRouter as Router } from 'react-router-dom';


jest.mock('axios');

describe('StudentForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.setItem('token', 'mocked_token');
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test('creates a student with provided details', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { getByLabelText, getByText } = render(
      <Router>
        <Addstudent />
      </Router>
    );

    const loginInput = getByLabelText('Login');
    const passwordInput = getByLabelText('Password');
    const nameInput = getByLabelText('Full Name');
    const birthDateInput = getByLabelText('Birth Date');
    const groupInput = getByLabelText('Group');
    const scoreInput = getByLabelText('Score');
    const ratingInput = getByLabelText('Rating');
    const submitButton = getByText('OK');

    fireEvent.change(loginInput, { target: { value: 'login' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(birthDateInput, { target: { value: '1995-10-20' } });
    fireEvent.change(groupInput, { target: { value: 'A' } });
    fireEvent.change(scoreInput, { target: { value: '80' } });
    fireEvent.change(ratingInput, { target: { value: '15' } });

    axios.post.mockResolvedValueOnce();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:5000/student', {
        login: 'login',
        password: 'password',
        full_name: 'John Doe',
        birth_date: '1995-10-20',
        group: 'A',
        score: '80',
        rating: '15',
      }, {
        headers: {
          Authorization: 'Bearer mocked_token',
        },
      });
    });
    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith('Student created successfully');
  });

  test('edits a student with provided details', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { getByLabelText, getByText } = render(
      <Router>
        <Editstudent />
      </Router>
    );

    const nameInput = getByLabelText('Full Name');
    const birthDateInput = getByLabelText('Birth Date');
    const groupInput = getByLabelText('Group');
    const scoreInput = getByLabelText('Score');
    const ratingInput = getByLabelText('Rating');
    const submitButton = getByText('OK');

    fireEvent.change(nameInput, { target: { value: 'Ivan Doe' } });
    fireEvent.change(birthDateInput, { target: { value: '1999-10-20' } });
    fireEvent.change(groupInput, { target: { value: 'A' } });
    fireEvent.change(scoreInput, { target: { value: '80' } });
    fireEvent.change(ratingInput, { target: { value: '15' } });

    axios.put.mockResolvedValueOnce();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(axios.put).toHaveBeenCalledWith('http://127.0.0.1:5000/student', {
        full_name: 'Ivan Doe',
        birth_date: '1999-10-20',
        group: 'A',
        score: '80',
        rating: '15',
      }, {
        headers: {
          Authorization: 'Bearer mocked_token',
        },
      });
    });
    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith('Student edited successfully');
  });

  test('deletes a student', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { getByLabelText, getByText } = render(
      <Router>
        <DeleteStudent />
      </Router>
    );

    const nameInput = getByLabelText('Student`s Full Name');
    const submitButton = getByText('OK');

    fireEvent.change(nameInput, { target: { value: 'Ivan Doe' } });

    axios.delete.mockResolvedValueOnce();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledTimes(1);
      expect(axios.delete).toHaveBeenCalledWith('http://127.0.0.1:5000/student/Ivan Doe', {
        headers: {
          Authorization: 'Bearer mocked_token',
        },
      });
    });
    expect(mockAlert).toHaveBeenCalledTimes(1);
    expect(mockAlert).toHaveBeenCalledWith('Student deleted successfully');
  });
});
