document.addEventListener('DOMContentLoaded', function () {
    const sections = {
        home: document.getElementById('homeSection'),
        appointments: document.getElementById('appointmentsSection'),
        bedAvailability: document.getElementById('bedAvailabilitySection'),
        admissions: document.getElementById('admissionsSection'),
        reports: document.getElementById('reportsSection'),
        settings: document.getElementById('settingsSection')
    };

    const buttons = {
        home: document.getElementById('homeButton'),
        appointments: document.getElementById('appointmentsButton'),
        bedAvailability: document.getElementById('bedAvailabilityButton'),
        admissions: document.getElementById('admissionsButton'),
        reports: document.getElementById('reportsButton'),
        settings: document.getElementById('settingsButton')
    };

    function showSection(section) {
        for (const key in sections) {
            if (sections.hasOwnProperty(key)) {
                sections[key].classList.add('d-none');
            }
        }
        sections[section].classList.remove('d-none');
    }

    buttons.home.addEventListener('click', function () {
        showSection('home');
    });

    buttons.appointments.addEventListener('click', function () {
        showSection('appointments');
    });

    buttons.bedAvailability.addEventListener('click', function () {
        showSection('bedAvailability');
    });

    buttons.admissions.addEventListener('click', function () {
        showSection('admissions');
    });

    buttons.reports.addEventListener('click', function () {
        showSection('reports');
    });

    buttons.settings.addEventListener('click', function () {
        showSection('settings');
    });

    // Initial load to show home section
    showSection('home');

    // Handle new appointment booking
  /*  const bookAppointmentButton = document.querySelector('.btn-primary');
    bookAppointmentButton.addEventListener('click', function () {
        const patientName = prompt('Enter Patient Name:');
        const doctorName = prompt('Enter Doctor Name:');
        const appointmentTime = prompt('Enter Appointment Time:');
        const patientAge = prompt('Enter Patient Age:');

        if (patientName && doctorName && appointmentTime && patientAge) {
            addAppointment(patientName, patientAge, doctorName, appointmentTime);
        }
    });
*/
    // Add new appointment to the table
    function addAppointment(patientName, patientAge, doctorName, appointmentTime) {
        const appointmentTableBody = document.getElementById('appointmentTableBody');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${patientName}</td>
            <td>${doctorName}</td>
            <td>${appointmentTime}</td>
            <td>Confirmed</td>
            <td>
                <button class="btn btn-sm btn-warning">Edit</button>  
                <button class="btn btn-sm btn-danger">Cancel</button>
            </td>
        `;

        appointmentTableBody.appendChild(newRow);
    }

    // Handle new patient admission
    const admissionForm = document.getElementById('admissionForm');
    admissionForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const patientName = document.getElementById('patientName').value;
        const admissionDate = document.getElementById('admissionDate').value;
        const bedAssignment = document.getElementById('bedAssignment').value;
        const doctorAssigned = document.getElementById('doctorAssigned').value;

        if (patientName && admissionDate && bedAssignment && doctorAssigned) {
            addAdmission(patientName, admissionDate, bedAssignment, doctorAssigned);
            admissionForm.reset();
        }
    });

    // Add new admission to the table
    function addAdmission(patientName, admissionDate, bedAssignment, doctorAssigned) {
        const admissionsTableBody = document.getElementById('admissionsTableBody');
        const newRow = document.createElement('tr');

        newRow.innerHTML = `
            <td>${patientName}</td>
            <td>${admissionDate}</td>
            <td>${bedAssignment}</td>
            <td>${doctorAssigned}</td>
        `;

        admissionsTableBody.appendChild(newRow);
    }

    // Handle editing and canceling appointments
    document.getElementById('appointmentTableBody').addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-warning')) {
            // Edit appointment logic here
            const row = event.target.closest('tr');
            const patientName = row.children[0].textContent;
            const doctorName = row.children[1].textContent;
            const appointmentTime = row.children[2].textContent;

            // Populate the edit form with current data
            document.getElementById('editPatientName').value = patientName;
            document.getElementById('editDoctorName').value = doctorName;
            document.getElementById('editAppointmentTime').value = appointmentTime;

            // Store a reference to the row to be updated
            document.getElementById('editAppointmentForm').dataset.rowIndex = Array.from(row.parentNode.children).indexOf(row);

            // Show the edit form
            const editModal = new bootstrap.Modal(document.getElementById('editAppointmentModal'));
            editModal.show();
        } else if (event.target.classList.contains('btn-danger')) {
            // Cancel appointment logic
            if (confirm('Are you sure you want to cancel this appointment?')) {
                event.target.closest('tr').remove();
            }
        }
    });

    // Handle form submission for editing
    document.getElementById('editAppointmentForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const rowIndex = this.dataset.rowIndex;
        const row = document.querySelector(`#appointmentTableBody tr:nth-child(${parseInt(rowIndex) + 1})`);

        // Get the updated values from the form
        const updatedPatientName = document.getElementById('editPatientName').value;
        const updatedDoctorName = document.getElementById('editDoctorName').value;
        const updatedAppointmentTime = document.getElementById('editAppointmentTime').value;

        // Update the row with new values
        row.children[0].textContent = updatedPatientName;
        row.children[1].textContent = updatedDoctorName;
        row.children[2].textContent = updatedAppointmentTime;

        // Hide the modal
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editAppointmentModal'));
        editModal.hide();
    });



    
});
// Toggles the sidebar visibility
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggleSidebar');
    sidebar.classList.toggle('hidden');
    toggleButton.classList.toggle('hidden');
}

// Clears the notification badge
function clearNotification() {
    const badge = document.getElementById('badge');
    badge.style.display = 'none';
}

// Toggles language (just a mock function)
function toggleLanguage() {
    alert("Language toggled!");
}



