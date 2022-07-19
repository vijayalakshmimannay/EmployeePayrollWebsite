let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded', (event) => {

    const name = document.querySelector('#name');
    name.addEventListener('input', function () {
        if(name.value.length == 0) {
            setTextValue('.text-error', "");
            return;
        }
        try {
            (new EmployeePayroll()).name = name.value;            
            setTextValue('.text-error', "");
        } catch (e) {
            setTextValue('.text-error', e);
        }
    });
     //Event Listener for Date (UC-19)
     const date = document.querySelector('#date');
     date.addEventListener('input', function() {
         try {
             let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
             (new EmployeePayroll()).startDate = new Date(Date.parse(date));
             setTextValue('.date-error', "");
         } catch (e) {
             setTextValue('.date-error', e);
         }
     });
     
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    salary.addEventListener('input', function () {
        output.textContent = salary.value;
    });
    checkForUpdate();
});

// UC8 Create Employee Payroll Object On Save, validate Name and Date
const save = (event) => {
    event.preventDefault();//prevent resetting the form (UC-19) 
    event.stopPropagation();   
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(Site_Properties.home_page);
    }
    catch (e) {
        return;
    }    
}
const setEmployeePayrollObject= () => { 
    employeePayrollObj._name = getInputValueById('#name');
    employeePayrollObj._profilePic = getSelectedValue('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValue('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValue('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayrollObj._startDate = date;
}

function createAndUpdateStorage(employeePayroll){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayroll = employeePayrollList.
                            find(empData => empData._id == employeePayrollObj._id);
        if (!empPayroll) {
            employeePayrollList.push(createEmployeePayrollData());
        } else {
            const index = employeePayrollList
                          .map(empData => empData._id)
                          .indexOf(empPayroll._id);
            employeePayrollList.splice(index, 1, createEmployeePayrollData(empPayroll._id));
        }
    } else {
        employeePayrollList = [employeePayroll]
    }    
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));    
}
const createEmployeePayrollData = (id) => {  //to read data from JSON
    let employeePayroll = new EmployeePayroll();
    if (!id) employeePayroll.id = createNewEmployeeId();
    else employeePayroll.id = id;
    setEmployeePayrollData(employeePayroll);
    return employeePayroll; 
}

const setEmployeePayrollData = (employeePayroll) => {
    try {
        employeePayroll.name = employeePayrollObj._name;
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayroll.profilePic = employeePayrollObj._profilePic;
    employeePayroll.gender = employeePayrollObj._gender;
    employeePayroll.department = employeePayrollObj._department;
    employeePayroll.salary = employeePayrollObj._salary;    
    employeePayroll.notes = employeePayrollObj._notes;
    try {
        employeePayroll.startDate = new Date(Date.parse(employeePayrollObj._startDate));
    } catch (e) {
        setTextValue('.date-error', e);
        throw e;
    }
    alert(employeePayroll.toString());
}

const createNewEmployeeId = () => {
    let empID = localStorage.getItem("EmployeeID");
    empID = !empID ? 1 : (parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID", empID);
    return empID;
}
const createEmployeePayroll = () => { //Reading data from UI
    let employeePayroll = new EmployeePayroll();
    try {
        employeePayroll.name = getInputValueById('#name');
        setTextValue('.text-error', "");
    } catch (e) {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayroll.profilePic = getSelectedValue('[name=profile]').pop();
    employeePayroll.gender = getSelectedValue('[name=gender]').pop();
    employeePayroll.department = getSelectedValue('[name=department]');
    employeePayroll.salary = getInputValueById('#salary');    
    employeePayroll.notes = getInputValueById('#notes');
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
    employeePayroll.startDate = new Date(Date.parse(date)); 
    alert(employeePayroll.toString());
    return employeePayroll;
}
const getInputValueById = (id) => {
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
//create reset form
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name=Profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day', 0);
    setValue('#month', 0);
    setValue('#year', 0);
}
const unsetSelectedValues = (propertyValue) =>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        item.checked = false;
    });
}
const setValue = (id, value) =>{
    const element = document.querySelector(id);
    element.value = value;
}
const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

//set form
const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=Profile]', employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#salary', employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._notes);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if(Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    });
}