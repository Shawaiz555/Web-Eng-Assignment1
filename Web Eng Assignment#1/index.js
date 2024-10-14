let Users = [];

const user = {
    name: "",
    age: "",
    email: "",
    hobbies: []
};

const AddUserBtn = document.getElementById("AddUserBtn");
AddUserBtn.addEventListener("click", (e) => {
    e.preventDefault();
    AddUser();
});

function AddUser() {
    let UserName = document.getElementById("Name").value;
    let UserAge = document.getElementById("Age").value;
    let UserEmail = document.getElementById("Email").value;

    let newUser = {
        name: UserName,
        age: UserAge,
        email: UserEmail,
        hobbies: [...user.hobbies]
    };

    Users.push(newUser);

    document.getElementById("Name").value = '';
    document.getElementById("Age").value = '';
    document.getElementById("Email").value = '';
    document.getElementById("Hobby").value = '';

    user.hobbies = [];
    document.querySelector(".Hobbies").innerHTML = '';

    DisplayUserInTable(Users);
}

const AddHobbyBtn = document.getElementById("AddHobbyBtn");
AddHobbyBtn.addEventListener("click", AddHobby);

function AddHobby(e) {
    e.preventDefault();
    let UserHobby = document.getElementById("Hobby").value;

    if (UserHobby && !user.hobbies.includes(UserHobby)) {
        user.hobbies.push(UserHobby);
        document.getElementById("Hobby").value = "";

        let Hobbies = document.querySelector(".Hobbies");
        Hobbies.innerHTML += `
            <div class="flex gap-2 bg-white px-4 py-1 rounded-lg">
                <h1 class="text-md font-semibold">${UserHobby}</h1>
                <button class="RemoveHobbyBtn text-md text-red-500 font-semibold hover:scale-90">
                    <span>x</span>
                </button>
            </div>
        `;

        UpdateRemoveHobbyButtons();
    }
}

function UpdateRemoveHobbyButtons() {
    let removeButtons = document.querySelectorAll(".RemoveHobbyBtn");
    removeButtons.forEach((button, index) => {
        button.onclick = () => {
            user.hobbies.splice(index, 1);
            button.parentElement.remove();
        };
    });
}

function DisplayUserInTable(users) {
    let tableBody = document.querySelector(".UserData");
    tableBody.innerHTML = '';

    users.forEach((user, index) => {
        let hobbies = user.hobbies.join(', ');

        let UserDataRow = `
            <tr class="text-center bg-white even:bg-gray-100 hover:bg-gray-50 transition-colors">
                <td class="px-4 py-3 border-b">${user.name}</td>
                <td class="px-4 py-3 border-b">${user.age}</td>
                <td class="px-4 py-3 border-b">${user.email}</td>
                <td class="px-4 py-3 border-b">${hobbies}</td>
                <td class="px-4 py-3 border-b">
                    <div class="flex justify-center gap-3">
                    <button class="EditUser bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-1 rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-95" UserIndex="${index}">
                        Edit
                    </button>
                    <button class="DeleteUser bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-1 rounded-lg shadow-md transition duration-300 ease-in-out hover:scale-95" UserIndex="${index}">
                        Delete
                    </button>
                    </div>
                </td>
            </tr>
        `;
        tableBody.innerHTML += UserDataRow;
    });

    DeleteUserFunctionality();
    EditUserFunctionality();
}

function DeleteUserFunctionality() {
    let deleteButtons = document.querySelectorAll(".DeleteUser");
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            let index = e.target.getAttribute("UserIndex");
            Users.splice(index, 1);
            DisplayUserInTable(Users);
        });
    });
}

let currentUserIndex = null;
let editedHobbies = [];

function EditUserFunctionality() {
    let editButtons = document.querySelectorAll(".EditUser");

    editButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            currentUserIndex = e.target.getAttribute("UserIndex");
            let user = Users[currentUserIndex];

            document.getElementById("EditUserName").value = user.name;
            document.getElementById("EditUserAge").value = user.age;
            document.getElementById("EditUserEmail").value = user.email;

            editedHobbies = [...user.hobbies];
            DisplayHobbiesInEditForm(editedHobbies);

            showModal(document.getElementById("EditUserModal"));
        });
    });
}

function DisplayHobbiesInEditForm(hobbies) {
    let Hobbies = document.querySelector(".EditHobbies");
    Hobbies.innerHTML = '';

    hobbies.forEach((hobby) => {
        Hobbies.innerHTML += `
            <div class="flex gap-2 bg-white px-4 py-1 rounded-lg">
                <h1 class="text-md font-semibold">${hobby}</h1>
                <button class="RemoveEditHobbyBtn text-md text-red-500 font-semibold hover:scale-90">
                    <span>x</span>
                </button>
            </div>
        `;
    });

    let removeButtons = document.querySelectorAll(".RemoveEditHobbyBtn");
    removeButtons.forEach((button, index) => {
        button.onclick = () => {
            editedHobbies.splice(index, 1);
            button.parentElement.remove();
        };
    });
}

document.getElementById("AddEditHobbyBtn").addEventListener("click", (e) => {
    e.preventDefault();
    let UserHobby = document.getElementById("EditHobby").value;

    if (UserHobby && !editedHobbies.includes(UserHobby)) {
        editedHobbies.push(UserHobby);
        document.getElementById("EditHobby").value = '';
        DisplayHobbiesInEditForm(editedHobbies);
    }
});

document.getElementById("CancelEditBtn").addEventListener("click", () => {
    hideModal(document.getElementById("EditUserModal"));
});

document.getElementById("EditUserForm").addEventListener("submit", (e) => {
    e.preventDefault();

    let updatedName = document.getElementById("EditUserName").value;
    let updatedAge = document.getElementById("EditUserAge").value;
    let updatedEmail = document.getElementById("EditUserEmail").value;

    Users[currentUserIndex].name = updatedName;
    Users[currentUserIndex].age = updatedAge;
    Users[currentUserIndex].email = updatedEmail;
    Users[currentUserIndex].hobbies = [...editedHobbies];

    hideModal(document.getElementById("EditUserModal"));

    DisplayUserInTable(Users);
});

function showModal(modal) {
    modal.classList.remove('hidden', 'opacity-0', 'translate-y-8');
    modal.classList.add('opacity-100', 'translate-y-0');
}

function hideModal(modal) {
    modal.classList.remove('opacity-100', 'translate-y-0');
    modal.classList.add('opacity-0', 'translate-y-8');
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 400);
}
