import { fireEvent, getByTestId, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/dom'
import Main, { Student, Teacher } from '../main';
import axios from 'axios';
import React from 'react';


jest.mock('axios');

describe('Main component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.localStorage.setItem('token', 'mocked_token');
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test('renders buttons in student header', () => {
    const { getByText } = render(<Student />);

    const button1 = getByText('Change password');
    const button2 = getByText('Log Out');

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });

  test('renders buttons in teacher header', () => {
    const { getByText } = render(<Teacher />);

    const button1 = getByText('Add Student');
    const button2 = getByText('Edit Student`s Profile');

    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });

  test('fetches and displays student information in table', async () => {
      const mockStudentData = {"students":[{
          full_name: 'Benedickt',
          birth_date: '2004-06-20',
          group: '216',
          rating: '1',
          score: '99'
      }] };

    axios.get.mockResolvedValueOnce({ data: mockStudentData });

    const { getByText } = render(<Main />);


    await waitFor(() => {
      const tableRow1 = getByText('Benedickt');

      expect(tableRow1).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/students/findall', {
      headers: {
        Authorization: 'Bearer mocked_token',
      },
    });
  });

  test('filters and displays student with specified scores', async () => {
    const mockStudentData = {
      'students': [{
        full_name: 'Benedickt',
        birth_date: '2004-06-20',
        group: '216',
        rating: '1',
        score: '99'
      },
        {
          full_name: 'Ivan',
          birth_date: '2004-06-21',
          group: '216',
          rating: '2',
          score: '97'
        }]
    };
    axios.get.mockResolvedValueOnce({ data: mockStudentData });
    axios.get.mockResolvedValueOnce({ data: mockStudentData });

    const { queryByText, getByTestId } = render(<Main />);

    const filterInput = getByTestId("score-input");
    const filterButton = getByTestId("filter-button");

    fireEvent.change(filterInput, { target: { value: '98' } });
    fireEvent.click(filterButton);

    await waitFor(() => {
      const tableRow1 = queryByText('Benedickt');

      expect(tableRow1).not.toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith('http://127.0.0.1:5000/students/findByScore/98', {
      headers: {
        Authorization: 'Bearer mocked_token',
      },
    });
  });

  test('displays searched students', async () => {
    const mockStudentData = {
      'students': [
        {
          full_name: 'Ivan',
          birth_date: '2004-06-21',
          group: '216',
          rating: '2',
          score: '97'
        }] };

    axios.get.mockResolvedValueOnce({ data: mockStudentData });
    axios.get.mockResolvedValueOnce({ data: mockStudentData });

    const { getByText, getByTestId } = render(<Main />);

    const searchInput = getByTestId("search-input");
    const searchButton = getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'Ivan' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      const tableRow1 = getByText('Ivan');

      expect(tableRow1).toBeInTheDocument();
    });

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(`http://127.0.0.1:5000/students/search/Ivan`, {
      headers: {
        Authorization: 'Bearer mocked_token',
      },
    });
  });
});
