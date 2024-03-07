const SERVER_URL = 'http://localhost:3000';

async function addNewStudent(obj){
    const response = await fetch(SERVER_URL + '/api/students',{
        method: 'POST',
        headers:{'Content-Type':'application-json'},
        body:JSON.stringify(obj),
    });

    let data = await response.json();

    return data;
}

async function getAllStudent(){
    const response = await fetch(SERVER_URL + '/api/students',{
        method: 'GET',
        headers:{'Content-Type':'application-json'},
    });

    let data = await response.json();

    return data;
}


async function deleteNewStudent(id){
    const response = await fetch(SERVER_URL + '/api/students/' + id,{
        method: 'DELETE'
    });

    let data = await response.json();

    return data;
}

async function updateNewStudent(obj,id){
    const response = await fetch(SERVER_URL + '/api/students/' + id,{
        method: 'PATCH',
        headers:{'Content-Type':'application-json'},
        body:JSON.stringify(obj),
    });

    let data = await response.json();

    return data;
}

async function loadStudentCompnent() {
    let studentLists = await getAllStudent();
    render(studentLists);
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('/');
}

function getNewStdTr(stdObj){
    const tr = document.createElement('tr');
    const fio = document.createElement('td');
    const birth = document.createElement('td');
    const faculty = document.createElement('td');
    const studyStart = document.createElement('td');
    const deleteBtnTd = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn','btn-danger','w-100');
    deleteBtn.textContent = 'Delete';
    deleteBtnTd.append(deleteBtn);

    deleteBtn.addEventListener('click', async function(){
        await deleteNewStudent(stdObj.id);
        tr.remove();
    });

    fio.addEventListener('click',function(event){
        console.log(formatDate(new Date(stdObj.birthday)));
        const hiddenInput = document.getElementById('hidden-inp').value = stdObj.id;
        const studName = document.getElementById('name-inp').value = stdObj.name;
        const studLastName = document.getElementById('lastname-inp').value= stdObj.lastname;
        const studSurName = document.getElementById('surname-inp').value= stdObj.surname;
        const studBirthDay = document.getElementById('birthdate-inp').value = "1985-01-31";
        //const studBirthDay = document.getElementById('birthdate-inp').value= formatDate(new Date(stdObj.birthday));
        const studFaculty = document.getElementById('faculty-inp').value= stdObj.faculty;
        const studyStart = document.getElementById('studyStart-inp').value= stdObj.studyStart;
    });

    fio.textContent = `${stdObj.lastname} ${stdObj.name} ${stdObj.surname}`;
    birth.textContent = formatDate(new Date(stdObj.birthday));
    faculty.textContent = stdObj.faculty;
    studyStart.textContent = stdObj.studyStart;
    tr.append(fio, birth, faculty, studyStart,deleteBtnTd);
    return tr;
}

function render(arr){
    
    let comyArr = [... arr];
    
    const studTable = document.getElementById('tBody');

    studTable.innerHTML = '';

    for(const stdObj of comyArr){
        const newTR = getNewStdTr(stdObj);
        studTable.append(newTR);
    }
}

await loadStudentCompnent();



document.getElementById('addForm').addEventListener('submit', async function (event)  {
    event.preventDefault();

    const studName = document.getElementById('name-inp').value;
    const studLastName = document.getElementById('lastname-inp').value;
    const studSurName = document.getElementById('surname-inp').value;
    const studBirthDay = document.getElementById('birthdate-inp').value;
    const studFaculty = document.getElementById('faculty-inp').value;
    const studyStart = document.getElementById('studyStart-inp').value;
    const hiddenInput = document.getElementById('hidden-inp').value;

    const formArea = document.getElementById('addForm');

    // let simpleDate = studBirthDay;
    // simpleDate = simpleDate.replace(/-/g,',');

    console.log(hiddenInput);

    let newStudent = {
        name: studName,
        lastname: studLastName,
        surname: studSurName,
        birthday: new Date(studBirthDay),
        faculty: studFaculty,
        studyStart: studyStart
    }
        
    let serverData = '';

    if(hiddenInput === null && hiddenInput === ''){
        serverData = await addNewStudent(newStudent);
    }else{
        serverData = await updateNewStudent(newStudent,hiddenInput);
    }

    formArea.reset()

    await loadStudentCompnent();
});