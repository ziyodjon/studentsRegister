const SERVER_URL = 'http://localhost:3000';
let bufferObj = null;
const addForm = document.getElementById('addForm');
const myFormData = new FormData(addForm);
const addBtn = document.querySelector('.addBtn');
const cancelBtn = document.querySelector('.cancelBtn');

async function addNewStudent(obj){
    const response = await fetch(`${SERVER_URL}/api/students`,{
        method: 'POST',
        headers:{'Content-Type':'application-json'},
        body:JSON.stringify(obj),
    });

    let data = await response.json();

    return data;
}

async function getAllStudent(){
    const response = await fetch(`${SERVER_URL}/api/students`,{
        method: 'GET',
        headers:{'Content-Type':'application-json'},
    });

    let data = await response.json();

    return data;
}


async function deleteNewStudent(id){
    const response = await fetch(`${SERVER_URL}/api/students/${id}`,{
        method: 'DELETE'
    });

    let data = await response.json();

    return data;
}

async function updateNewStudent(id,obj){
    const response = await fetch(`${SERVER_URL}/api/students/${id}`,{
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

    return [year, month, day].join('-');
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
        
        bufferObj = stdObj;

        // const addForm = document.getElementById('addForm');
        // const myFormData = new FormData(addForm);
        
        // for(const data of myFormData){
        //     console.log(myFormData.get(''));
        // }

        const hiddenInput = document.getElementById('hiddenInput').value = stdObj.id;
        const studName = document.getElementById('name-inp').value = stdObj.name;
        const studLastName = document.getElementById('lastname-inp').value= stdObj.lastname;
        const studSurName = document.getElementById('surname-inp').value= stdObj.surname;
        const studBirthDay = document.getElementById('birthdate-inp').value = formatDate(new Date(stdObj.birthday));
        const studFaculty = document.getElementById('faculty-inp').value= stdObj.faculty;
        const studyStart = document.getElementById('studyStart-inp').value= stdObj.studyStart;

        
        addBtn.classList.remove('btn-primary');
        addBtn.classList.add('btn-success');
        addBtn.textContent = 'Редактировать';

        cancelBtn.classList.remove('invisible');
        cancelBtn.classList.add('visible');

    });
    
    cancelBtn.addEventListener('click',function(){
        
        addBtn.classList.add('btn-primary');
        addBtn.classList.remove('btn-success');
        addBtn.textContent = 'Добавить';

        cancelBtn.classList.add('invisible');
        cancelBtn.classList.remove('visible');

        addForm.reset();

    });

    fio.textContent = `${stdObj.lastname} ${stdObj.name} ${stdObj.surname}`;
    birth.textContent = formatDate(new Date(stdObj.birthday));
    faculty.textContent = stdObj.faculty;
    studyStart.textContent = stdObj.studyStart;
    tr.append(fio, birth, faculty, studyStart,deleteBtnTd);
    return tr;
}

function render(arr){
    let copyArr = [... arr];
    
    const studTable = document.getElementById('tBody');

    studTable.innerHTML = '';

    for(const stdObj of copyArr){
        studTable.append(getNewStdTr(stdObj));
    }
}

await loadStudentCompnent();



addForm.addEventListener('submit', async function (event)  {
    event.preventDefault();
    
    const hiddenInput = document.getElementById('hiddenInput').value;
    const studName = document.getElementById('name-inp').value;
    const studLastName = document.getElementById('lastname-inp').value;
    const studSurName = document.getElementById('surname-inp').value;
    const studBirthDay = document.getElementById('birthdate-inp').value;
    const studFaculty = document.getElementById('faculty-inp').value;
    const studyStart = document.getElementById('studyStart-inp').value;

    const formArea = document.getElementById('addForm');

    let newStudent = {
        name: studName,
        lastname: studLastName,
        surname: studSurName,
        birthday: new Date(studBirthDay),
        faculty: studFaculty,
        studyStart: studyStart
    }
        
    let serverData = '';

    //serverData = await updateNewStudent(hiddenInput,newStudent);

    console.log(bufferObj);

    if(bufferObj === null){
        serverData = await addNewStudent(newStudent);
    }else{
        serverData = await updateNewStudent(hiddenInput,newStudent);
        addBtn.classList.add('btn-primary');
        addBtn.classList.remove('btn-success');
        addBtn.textContent = 'Добавить';

        cancelBtn.classList.add('invisible');
        cancelBtn.classList.remove('visible');
    }

    bufferObj = null;
    console.log(bufferObj);

    formArea.reset()
    

    await loadStudentCompnent();
});