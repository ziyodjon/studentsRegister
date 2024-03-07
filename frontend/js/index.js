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

async function getNewStudent(){
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

async function updateNewStudent(id){
    const response = await fetch(SERVER_URL + '/api/students/' + id,{
        method: 'PATCH'
    });

    let data = await response.json();

    return data;
}


const studentLists = await getNewStudent();

// const studentLists = [
//     {
//         name: 'Shahzod',
//         lastname: 'Qudratov',
//         surname: 'Mahmudovich',
//         birthday: new Date(1987,12,22),
//         faculty: 'Экономика',
//         start: 2016
//     },
//     {
//         name: 'Shavkat',
//         lastname: 'Ismoilov',
//         surname: 'Shuhratovich',
//         birthday: new Date(1990,12,22),
//         faculty: 'Математика',
//         start: 2000
//     },
//     {
//         name: 'Ismoil',
//         lastname: 'Aminov',
//         surname: 'Isroilovich',
//         birthday: new Date(1988,5,22),
//         faculty: 'Дорожная специальность',
//         start: 2004
//     }
// ];

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
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
        const studName = document.getElementById('name-inp').value = stdObj.name;
        const studLastName = document.getElementById('lastname-inp').value= stdObj.lastname;
        const studSurName = document.getElementById('surname-inp').value= stdObj.surname;
        const studBirthDay = document.getElementById('birthdate-inp').value= stdObj.birthday;
        const studFaculty = document.getElementById('faculty-inp').value= stdObj.faculty;
        const studyStart = document.getElementById('studyStart-inp').value= stdObj.studyStart;
    });

    fio.textContent = `${stdObj.lastname} ${stdObj.name} ${stdObj.surname}`;
    birth.textContent = formatDate(stdObj.birthday);
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

render(studentLists);



document.getElementById('addForm').addEventListener('submit', async function (event)  {
    event.preventDefault();

    const studName = document.getElementById('name-inp').value;
    const studLastName = document.getElementById('lastname-inp').value;
    const studSurName = document.getElementById('surname-inp').value;
    const studBirthDay = document.getElementById('birthdate-inp').value;
    const studFaculty = document.getElementById('faculty-inp').value;
    const studyStart = document.getElementById('studyStart-inp').value;

    // let simpleDate = studBirthDay;
    // simpleDate = simpleDate.replace(/-/g,',');

    let newStudent = {
        name: studName,
        lastname: studLastName,
        surname: studSurName,
        birthday: new Date(studBirthDay),
        faculty: studFaculty,
        studyStart: studyStart
    }

    const serverData = await addNewStudent(newStudent);

    studentLists.push(serverData);
    render(studentLists);
});