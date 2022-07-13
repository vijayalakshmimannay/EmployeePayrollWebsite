window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const nameError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
        try {
            let empData = new EmployeePayroll();
            empData.name = name.value;
            nameError.textContent = "";
        } catch (e) {
            nameError.textContent = e;
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
})
// UC8 Create Employee Payroll Object On Save, validate Name and Date
const save = () => {
    try {
    let employeePayroll = createEmployeePayroll();
    createAndUpdateStorage(employeePayroll);
    }catch (e) {
        return;
    }
    //alert(JSON.stringify(employeePayroll));
}
const createEmployeePayroll = () => {
    let employeePayroll = new EmployeePayroll();
    try {
        employeePayroll.name = getInputValueId("#name");
        setTextValue('.text-error', "");
    } catch (e) {
        setTextValue('.text-error', e);
    }

    try {
        let date = getInputValueId('#day') + " " + getInputValueId('#month') + " " + getInputValueId('#year');
        employeePayroll.startDate = new Date(Date.parse(date));
        setTextValue('.date-error', "");
    } catch (e) {
        setTextValue('.date-error', e);
    }

    employeePayroll.profilePic = getSelectedValue('[name=profile]').pop();
    employeePayroll.gender = getSelectedValue('[name=gender]').pop();
    employeePayroll.department = getSelectedValue('[name=department]');
    employeePayroll.salary = getInputValueId('#salary');
    employeePayroll.notes = getInputValueId('#notes');
    employeePayroll.id = new Date().getTime()+1;
    return employeePayroll;
}

const getInputValueId = (id) => {
    return document.querySelector(id).value;
}

const setTextValue = (id, message) => {
    const textError = document.querySelector(id);
    textError.textContent = message;
}

const getSelectedValue = (propertyValue)=> {
    let allItem = document.querySelectorAll(propertyValue);
    let setItem = [];
    allItem.forEach(item=>{
        if(item.checked == true){
            setItem.push(item.value);
        }
    })
    return setItem;
}
// UC9 Save the Employee Payroll object to local storage
function createAndUpdateStorage(employeePayroll) {
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayroll);
    } else{
        employeePayrollList = [employeePayroll];
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList))
    alert(JSON.stringify(employeePayrollList));
}