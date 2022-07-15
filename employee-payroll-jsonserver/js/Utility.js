const stringifyDate = (date) =>{
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    const newDate = !date ? "undefined" :
                    new Date(Date.parse(date)).toLocaleDateString('en-GB', options);
    return newDate;
}
const update = (node) => {
    let empPayrollData = employeePayrollList.find(empData => empData._id == node.id)
    if (!empPayrollData) return;
    localStorage.setItem('editEmp', JSON.stringify(empPayrollData))
    window.location.replace(Site_Properties.add_emp_payroll_page);
}