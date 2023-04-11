const studentsTable = document.getElementById('students-table');

const filterBtn = document.querySelector("#filter-btn");
const scoreInput = document.querySelector("#best-score");


fetch('http://127.0.0.1:5000/students/findall')
  .then(response => response.json())
  .then(data => {
      // console.log(data)
    // Iterate over the received data and add a new row to the table for each student
    data.students.forEach(student => {
      const row = document.createElement('tr');
      const fullNameCell = document.createElement('td');
      fullNameCell.textContent = student['full_name'];
      row.appendChild(fullNameCell);
      const birthDateCell = document.createElement('td');
      let date = new Date(student['birth_date'])
      birthDateCell.textContent = date.toLocaleDateString();
      row.appendChild(birthDateCell);
      const groupCell = document.createElement('td');
      groupCell.textContent = student['group'];
      row.appendChild(groupCell);
      const ratingCell = document.createElement('td');
      ratingCell.textContent = student['rating'];
      row.appendChild(ratingCell);
      const scoreCell = document.createElement('td');
      scoreCell.textContent = student['score'];
      row.appendChild(scoreCell);
      studentsTable.appendChild(row);
    });
  })
  .catch(error => {
    console.error('Error fetching students data:', error);
  });


// Add an event listener to the filter button
filterBtn.addEventListener("click", async () => {
  event.preventDefault();
  // Get the score value from the input field
  const score = scoreInput.value;
  console.log(score)

  // Fetch the filtered data from the server
  const response = await fetch(`http://127.0.0.1:5000/students/findByScore/${score}`);
  const data = await response.json();
  console.log(data)

  // Update the table with the filtered data
  const table = document.getElementById('students-table');

  // Delete all rows except the first one
  const tableBody = document.querySelector('#students-table');
  const rowsToDelete = tableBody.querySelectorAll('tr:not(:first-child)');
  rowsToDelete.forEach(row => row.remove());


  data.students.forEach(student => {
      const row = document.createElement('tr');
      const fullNameCell = document.createElement('td');
      fullNameCell.textContent = student['full_name'];
      row.appendChild(fullNameCell);
      const birthDateCell = document.createElement('td');
      let date = new Date(student['birth_date'])
      birthDateCell.textContent = date.toLocaleDateString();
      row.appendChild(birthDateCell);
      const groupCell = document.createElement('td');
      groupCell.textContent = student['group'];
      row.appendChild(groupCell);
      const ratingCell = document.createElement('td');
      ratingCell.textContent = student['rating'];
      row.appendChild(ratingCell);
      const scoreCell = document.createElement('td');
      scoreCell.textContent = student['score'];
      row.appendChild(scoreCell);
      studentsTable.appendChild(row);
    });
});

