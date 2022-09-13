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

  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  console.log(currentIssue);
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();

  const statusEl = document.getElementById("status-span");
  statusEl.innerText = 'Closed';
  statusEl.style.background = 'red';

}

// delete issue Function
const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesBody = issues[0];
  console.log(issuesBody);
  const remainingIssues = issues.filter(issues.id !== id);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
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
                              <p><span class="label label-info" id="status-span"> ${ status } </span></p>
                              <h3> ${ description } </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${ severity }</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${ assignedTo }</p>
                              <a href="#" onclick="closeIssue(${ id })" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${ id })" class="btn btn-danger">Delete</a>
                              </div>`;
    }
  }
}

