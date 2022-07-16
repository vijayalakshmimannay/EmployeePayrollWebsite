let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {
    // UC7 Name Validation
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
    checkForUpdate();
})
// UC8 Create Employee Payroll Object On Save, validate Name and Date
const save = () => {    
    try{
        let employeePayroll = createEmployeePayroll();
        // UC9: Saving Employee Payroll to Local Storage
        createAndUpdateStorage(employeePayroll);
    }
    catch (e) {
        return;
    }    
}
const createEmployeePayroll = () => {
    let employeePayroll = new EmployeePayroll();
    try {
        employeePayroll.name = getInputValueId('#name');
        setTextValue('.text-error', "");
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
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
    alert(employeePayroll.toString());
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
    alert(employeePayrollList.toString());
}
//UC10 Reset the EmployeePayroll Form
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=Profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','40000');
    setValue('#notes','');
    setValue('#day','day');
    setValue('#month','January');
    setValue('#year','2022');
}
const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}

const unsetSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        item.checked = false;
    });
}
const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

//UC18 Update row
const checkForUpdate = () => {
    const employeePayrollLJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollLJson ? true : false;
    if (!isUpdate)
        return;
        employeePayrollObj = JSON.parse(employeePayrollLJson);
    setForm();
}

const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectValue('[name=profile]', employeePayrollObj._profilePic);
    setSelectValue('[name=gender]', employeePayrollObj._gender);
    setSelectValue('[name=department]', employeePayrollObj._department);

    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);

    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    //console.log(date);
    setValue('#day', date[0]);
    setValue('#month', date[1]);
    setValue('#year', date[2]);
    setValue('#notes', employeePayrollObj._notes);
}
const setSelectValue = (propertyValue, value) => {
    let allItem = document.querySelectorAll(propertyValue);
    allItem.forEach(item => {
        if (Array.isArray(value)) {
            if(value.includes(item.value)){
                item.checked = true;
            }
        } else if (item.value == value) {
            item.checked = true;
        }
    });
}
