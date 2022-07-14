window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});

const createInnerHtml = () => {
    const innerHtml = `
    <tr>
        <th></th>
        <th>Name</th>
        <th>Gender</th>
        <th>Department</th>
        <th>Salary</th>
        <th>Start Date</th>
        <th>Actions</th>
    </tr>
    <tr>
        <td>
        <img class="profile" alt="profileImage" src="../assets/images/employee1.jpg">
        </td>
        <td>Lakshmi Talluri</td>
        <td>female</td>
       <td>
          <div class="dept-label">HR</div>
          <div class="dept-label">Engineer</div>
       </td>
       <td>300000</td>
       <td> 13 July 2022</td>
       <td>
        <td>
            <img id="1" onclick="remove(this)" alt="delete" src="../assets/Images/delete-black-18dp.svg">
            <img id="1" onclick="update(this)" alt="edit" src="../assets/Images/update-black-18dp.svg">
        </td>
    </tr>
    `;
    document.querySelector('#table-display').innerHTML = innerHtml;
}