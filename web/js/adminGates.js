const adminPlanes = document.getElementById('admin-planes-btn');
const adminGates = document.getElementById('admin-gates-btn');
const landingPage = document.getElementById('home');
const getGates = 'http://localhost:4000/api/boarding-gates';
const clearGateUrl = 'http://localhost:4000/api/boarding-gates/clear/'
const gatesContainer = document.getElementById('admin-gates-container');



landingPage.addEventListener('click', ()=> {
    window.location.href = 'index.html'
  });
  
  adminPlanes.addEventListener('click', ()=> {
    window.location.href = 'adminPlanes.html'
  })
  
  adminGates.addEventListener('click', ()=> {
    window.location.href = 'adminGates.html'
  })

fetchDataGates(getGates);

async function fetchDataGates(url) {
  try {
    const response = await axios.get(url);
    appendGate(...response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function appendGate(...gatesList){
    let lettering = 0;
    gatesList.forEach(elem => {
        let gate = document.createElement('span');
        gate.textContent = '❒';
        gate.classList.add('boarding-gate');
        if(elem.availability)gate.classList.add('ready');
        if(!elem.availability)gate.classList.add('boarding');
        const name = document.createElement('p');
        name.textContent = elem.code_name;
        const availability = document.createElement('p');
        elem.availability ? availability.textContent = 'available':
        availability.textContent = 'occupied';
        const planeId = document.createElement('p');
        elem.planeId === null ? planeId.textContent = 'not assigned':
        planeId.textContent = elem.plane.registration_number;

        const assign = document.createElement('button');
        assign.innerHTML = 'assign';
        assign.classList.add('update-btn');
        lettering<4 ? 
        assign.setAttribute('data-id', `A${elem.id}`):
        assign.setAttribute('data-id', `B${elem.id}`);
        assign.setAttribute('onclick', "getButtonId(event)");

        const remove = document.createElement('button');
        remove.innerHTML = 'remove';
        remove.classList.add('remove-btn');
        remove.setAttribute('data-id', elem.id);
        remove.setAttribute('onclick', "clearGate(event)");
        
        gatesContainer.append(gate, name, availability, planeId, assign, remove);
        lettering++;
    })
  }
  
async function clearGate(event) {
  try {
    const id = event.target.getAttribute('data-id');
    const response = await axios.put(clearGateUrl+id);
    if (response.status === 200){
      alert('Plane removed successfully!');
      location.reload();
    }else{
      alert('Failed to remove the plane')
    }
  } catch (error) {
    alert('An error occurred. Please try again later.');
    console.error(error);
  }
}
function getButtonId(event){
  let id = event.target.getAttribute('data-id');
  localStorage.setItem('gateId', id);
  window.location.href = 'crud/assignGate.html';
}