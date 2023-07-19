
const adminPlanes = document.getElementById('admin-planes-btn');
const adminGates = document.getElementById('admin-gates-btn');
const landingPage = document.getElementById('home');
const planesContainer = document.getElementById('planes-container');
const gatesContainer = document.getElementById('map-container');
const getPlanes = 'http://localhost:4000/api/planes';
const getGates = 'http://localhost:4000/api/boarding-gates';

landingPage.addEventListener('click', ()=> {
  window.location.href = 'index.html'
});

adminPlanes.addEventListener('click', ()=> {
  window.location.href = 'adminPlanes.html'
})

adminGates.addEventListener('click', ()=> {
  window.location.href = 'adminGates.html'
})

fetchDataPlanes(getPlanes);
fetchDataGates(getGates);

async function fetchDataPlanes(url) {
    try {
      const response = await axios.get(url);
      appendPlanes(...response.data)
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

async function fetchDataGates(url) {
  try {
    const response = await axios.get(url);
    appendGate(...response.data);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function appendPlanes(...planesList){
  planesList.forEach(elem => {
    if(!elem.out_of_service){
      let plane = document.createElement('span');
      plane.textContent = '✈';
      plane.classList.add('plane');
      if(elem.plane_status === 'ready') plane.classList.add('ready');
      if(elem.plane_status === 'boarding') plane.classList.add('boarding');
      if(elem.plane_status === 'flying') plane.classList.add('flying');
      if(elem.plane_status === 'maintenance') plane.classList.add('maintenance');
      /* let desc = document.createElement('p');
      desc.textContent = elem.registration_number;
      plane.appendChild(desc) */
      planesContainer.appendChild(plane);
    }else {
      //console.log(elem.registration_number, 'Is no longer on use')
    }
  })
}

function appendGate(...gatesList){
  gatesList.forEach(elem => {
    let gate = document.createElement('span');
    gate.textContent = '❒';
    gate.classList.add('boarding-gate');
    gate.setAttribute('id',`gate-${elem.code_name}-icon`);
    if(elem.availability)gate.classList.add('ready');
    if(!elem.availability)gate.classList.add('boarding');
    
    gatesContainer.appendChild(gate);
  })
}



