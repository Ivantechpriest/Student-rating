import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import ChangePassword from '../change_password';
import { BrowserRouter as Router } from 'react-router-dom';
import DeleteStudent from '../deletestudent';

jest.mock('axios');

describe('ChangePasswordForm component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.setItem('token', 'mocked_token');
    window.localStorage.setItem('studentId', '1');
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test('changes the student password with provided details', async () => {
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
      const mockStudentData = {
          iduser: '1',
          password: 'password'
      };
    const { getByLabelText, getByText } = render(
      <Router>
        <ChangePassword />
      </Router>
    );

    const passwordInput = getByLabelText('Enter new password:');
    const submitButton = getByText('OK');

    fireEvent.change(passwordInput, { target: { value: 'password' } });

    axios.put.mockResolvedValueOnce({data: mockStudentData});

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledTimes(1);
      expect(axios.put).toHaveBeenCalledWith(
          'http://127.0.0.1:5000/student/change_password',
          {
              iduser: null,
              password: 'password'
          },
          {
          headers: {
            Authorization: 'Bearer mocked_token',
          },
        }
      );

      expect(mockAlert).toHaveBeenCalledTimes(1);
      expect(mockAlert).toHaveBeenCalledWith('Password changed successfully');
    });

    mockAlert.mockRestore();
  });
});
