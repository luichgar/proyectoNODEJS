const adminPlanes = document.getElementById('admin-planes-btn');
const adminGates = document.getElementById('admin-gates-btn');
const landingPage = document.getElementById('home');
const addPlane = document.getElementById('add-plane')
const getPlanes = 'http://localhost:4000/api/planes';
const removePlaneUrl = 'http://localhost:4000/api/planes/remove/';
const planesContainer = document.getElementById('admin-planes-container');

landingPage.addEventListener('click', ()=> {
    window.location.href = 'index.html'
  });
  
adminPlanes.addEventListener('click', ()=> {
  window.location.href = 'adminPlanes.html'
})

adminGates.addEventListener('click', ()=> {
  window.location.href = 'adminGates.html'
})

addPlane.addEventListener('click', () => {
  window.location.href = 'crud/addPlane.html'
})
  

fetchDataPlanes(getPlanes);

async function fetchDataPlanes(url) {
    try {
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
          update.innerHTML = 'update';
          update.classList.add('update-btn');
          update.setAttribute('data-id', elem.id);
          update.setAttribute('onclick', "getButtonId(event)");

          const remove = document.createElement('button');
          remove.innerHTML = 'delete';
          remove.classList.add('update-btn');
          remove.setAttribute('data-id', elem.id);
          remove.setAttribute('onclick', "removePlane(event)");
          
          planesContainer.append(plane, reg, airline, capacity, status, update, remove);
      } 
      
      
  })
}

function getButtonId(event){
  let id = event.target.getAttribute('data-id');
  localStorage.setItem('planeId', id);
  window.location.href = 'crud/updatePlane.html';
}

async function removePlane(event) {
  try {
    const id = event.target.getAttribute('data-id');
    const response = await axios.put(removePlaneUrl+id);
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



