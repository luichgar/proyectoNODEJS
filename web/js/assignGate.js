const returnGates = document.getElementById('return-gates');
const getPlanes = 'http://localhost:4000/api/planes';
const assignGateUrl = 'http://localhost:4000/api/boarding-gates/assign/';
const planesContainer = document.getElementById('assign-planes-container');
const assignGateText = document.getElementById('assign-gate-text');

returnGates.addEventListener('click', ()=>{
    window.location.href = '../adminGates.html'
})

fetchDataPlanes(getPlanes);

async function fetchDataPlanes(url) {
    try {
        assignGateText.textContent = `Assign a plane to ${localStorage.gateId}`;
        const response = await axios.get(url);
        appendPlanes(...response.data)
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  function appendPlanes(...planesList){
    planesList.forEach(elem => {
        if(!elem.out_of_service){
            const plane = document.createElement('span');
            plane.textContent = '✈';
            plane.classList.add('plane');
            if(elem.plane_status === 'ready') plane.classList.add('ready');
            if(elem.plane_status === 'boarding') plane.classList.add('boarding');
            if(elem.plane_status === 'flying') plane.classList.add('flying');
            if(elem.plane_status === 'maintenance') plane.classList.add('maintenance');
            const reg = document.createElement('p');
            reg.textContent = elem.registration_number;
            const airline = document.createElement('p');
            airline.textContent = elem.airline;
            const capacity = document.createElement('p');
            capacity.textContent = elem.passenger_capacity;
            const status = document.createElement('p');
            status.textContent = elem.plane_status;
  
            const update = document.createElement('button');
            update.innerHTML = 'assign';
            update.classList.add('update-btn');
            update.setAttribute('data-id', elem.id);
            update.setAttribute('onclick', "assignGate(event)");
  
            planesContainer.append(plane, reg, airline, capacity, status, update);
        } 
        
    })
  }

  async function assignGate(event) {
    try {
        const strGateId = localStorage.gateId;
        const gateId = strGateId.slice(1);
        const planeId = event.target.getAttribute('data-id');
        const response = await axios.put(assignGateUrl+`${gateId}&${planeId}`);
      if (response.status === 200){
        alert('Plane was asssigned successfully!');
        window.location.href = '../adminGates.html';
      }else{
        alert('Failed to assing the plane')
      }
    } catch (error) {
      alert('An error occurred. Please try again later.');
      console.error(error);
    }
  }
