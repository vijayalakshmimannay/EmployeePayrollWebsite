//UC15 Display Employee details from JSON Object including the Department 
let employeePayrollList
window.addEventListener('DOMContentLoaded', (event) => {
    if (Site_Properties.use_local_storage.match("true")) {
        getEmployeePayrollDataFromStorage();
    } else getEmployeePayrollDataFromServer();    
});
const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
    processEmployeePayrollDataResponse();          
}
const processEmployeePayrollDataResponse = () => {
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp');
}
const getEmployeePayrollDataFromServer =() =>{
    makeServiceCall("GET", Site_Properties.server_url, true)
        .then(responseText => {
            empPayrollList = JSON.parse(responseText);
            processEmployeePayrollDataResponse();
        })
        .catch(error => {
            console.log("GET Error Status: " + JSON.stringify(error));
            empPayrollList = [];
            processEmployeePayrollDataResponse();
        });
}
// UC14 Template Literals (ES6) feature
const createInnerHtml = () => {
    const headerHtml = "<th>Profile</th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
   // let employeePayrollList = createEmployeePayrollJSON();
    for (const employeePayroll of employeePayrollList) {
        innerHtml = `${innerHtml}  
        <tr>
            <td><img class="profile" alt=""
                src="${employeePayroll._profilePic  }">
            </td>
            <td>${employeePayroll._name}</td>
            <td>${employeePayroll._gender}</td>
            <td>${getDeptHtml(employeePayroll._department)}</td>
            <td>${employeePayroll._salary}</td>
            <td>${employeePayroll._startDate}</td>
            <td>
                <img id="${employeePayroll.id}" onclick="remove(this)" alt="delete" src="../assets/images/delete-black-18dp.svg">
                <img id="${employeePayroll.id}" onclick="update(this)" alt="edit" src="../assets/images/update-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}
const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [
        {
            id: 'Lakshmi ',
            _gender: 'Female',
            _department: [
                'Engineer'
            ],
            _salary: '400000',
            _startDate: '13 July 2022',
            _notes: '',
            id: new Date().getTime(),
            _profilePic: '../assets/images/employee3.jpg'
        },
        {
            id: 'Harsha',
            _gender: 'Male',
            _department: [
                'Finance',
                'Engineer'
            ],
            _salary: '600000',
            _startDate: '12 June 2016',
            _notes: '',
            id: new Date().getTime() + 1,
            _profilePic: '../assets/images/employee4.jpg'
        },
        {
            _name: 'Aarna',
            _gender: 'Female',
            _department: [
                'HR'    
            ],
            _salary: '300000',
            _startDate: '20 Nov 2021',
            _notes: '',
            id: new Date().getTime() + 1,
            _profilePic: '../assets/images/employee1.jpg'
        }
    ];
    return employeePayrollListLocal;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`
    }
    return deptHtml;
}

const update = (node) => {
    let empPayrollData = employeePayrollList.find(empData => empData._id == node.id)
    if (!empPayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData))
    window.location.replace(Site_Properties.add_emp_payroll_page);
}

//Remove row
const remove = (node) => {
    let employeePayroll =  employeePayrollList.find(empData => empData.id == node.id);
    if(!employeePayroll) return;
    const index = employeePayrollList.map(empData => empData.id).indexOf(employeePayroll.id);
    employeePayrollList.splice(index, 1);
    if(Site_Properties.use_local_storage.match("true")){
    localStorage.setItem('EmployeePayrollList', JSON.stringify(employeePayrollList));
    document.querySelector('.emp-count').textContent = employeePayrollList.length;
    createInnerHtml();
    }
    else{
    const deleteUrl = Site_Properties.server_url + employeeData.id.toString();
    makeServiceCall("DELETE", deleteUrl, false)
        .then(responseText =>{
            createInnerHtml();
        })
        .catch(error =>{
            console.log("Delete Error Status: " + JSON.stringify(error));
        });
    }
}
