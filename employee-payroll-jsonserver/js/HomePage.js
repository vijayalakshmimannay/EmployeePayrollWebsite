//UC15 Display Employee details from JSON Object including the Department 
window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                        "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    let innerHtml = `${headerHtml}`;
    let employeePayrollList = createEmployeePayrollJSON();
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
                <img id="1" onclick="remove(this)" alt="delete" 
                    src="../assets/images/delete-black-18dp.svg">
                <img id="1" onclick="update(this)" alt="edit"
                    src="../assets/images/update-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}
const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [
        {
            _name: 'Lakshmi ',
            _gender: 'Female',
            _department: [
                'Engineer'
            ],
            _salary: '400000',
            _startDate: '13 July 2022',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/images/employee3.jpg'
        },
        {
            _name: 'Harsha',
            _gender: 'Male',
            _department: [
                'Finance',
                'Engineer'
            ],
            _salary: '600000',
            _startDate: '12 June 2016',
            _note: '',
            _id: new Date().getTime() + 1,
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
            _note: '',
            _id: new Date().getTime() + 1,
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