//Salary Range
{
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function () {
    output.textContent = salary.value; });
}
//Name Validation
{
    const name = document.querySelector('#name');
    const message = document.querySelector('.error-output');
    name.addEventListener('input', function()
    {
        let nameCheck = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        if(nameCheck.test(name.value))
        {
            message.textContent = "";
        }
        else if(name.value == "")
        {
            message.textContent = "";
        }
        else
        {
            message.textContent = "Format Incorrect";
        }
    });
}