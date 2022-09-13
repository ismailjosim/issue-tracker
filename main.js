// get input Element
const getInputValue = inputId => {
  const element = document.getElementById(inputId).value;
  return element;

}
// Submit Problem to local Storage
document.getElementById('issueInputForm').addEventListener('submit', submitIssues = event => {
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  if (description !== '' && assignedTo !== '') {
    const issue = { id, description, severity, assignedTo, status };
    let issues = [];

    if (localStorage.getItem('issues')) {
      issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
  } else {
    alert("Fill Description & Assigned Box!");
  }

  fetchIssues();
  event.preventDefault();

});

// close Issue Function
const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  // same as following.
  // const currentIssue = issues.find(issue => issue.id == id);

  const currentIssue = issues.find(issue => parseInt(issue.id) === id);

  currentIssue.status = 'Closed';

  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();

}

// delete issue Function
const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  const remainingIssues = issues.filter(issue => issue.id != id);

  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

// Fetch issue Function
const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  if (issues) {
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
      const { id, description, severity, assignedTo, status } = issues[i];
      issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${ id } </h6>
                              <p><span class="label text-capitalize ${ status === 'Open' ? 'label-info' : 'label-danger' }" id="status-span"> ${ status } </span></p>
                              <h3 class="text-capitalize"> ${ description } </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${ severity }</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${ assignedTo }</p>
                              <a href="#" onclick="closeIssue(${ id })" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${ id })" class="btn btn-danger">Delete</a>
                              </div>`;
    }
  }
}

