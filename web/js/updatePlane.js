const updatePlaneForm = document.getElementById('update-plane-form');
const returnPlanes = document.getElementById('return-planes');
const updatePlaneEndpoint = `http://localhost:4000/api/planes/${localStorage.planeId}`;


returnPlanes.addEventListener('click', ()=>{
    window.location.href = '../adminPlanes.html'
})



updatePlaneForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const registrationNumber = document.getElementById('registration-number').value;
  const airline = document.getElementById('airline').value;
  const passengerCapacity = parseInt(document.getElementById('passenger-capacity').value);
  const planeStatus = document.getElementById('plane-status').value;

  const planeData = {
    registration_number: registrationNumber,
    airline: airline,
    passenger_capacity: passengerCapacity,
    plane_status: planeStatus,
  };

  try {
    const response = await axios.put(updatePlaneEndpoint, planeData);
    
    if (response.status === 200) {
      alert('Plane added successfully!');
      location.reload();
      updatePlaneForm.reset();
    } else {
      alert('Failed to add the plane. Please try again.');
    }
  } catch (error) {
    alert('An error occurred. Please try again later.');
    console.error(error);
  }
});

async function fetchDataPlanes(url) {
    try {
        const response = await axios.get(url);
        const data = response.data;
        const registrationNumber = document.getElementById('registration-number');
        registrationNumber.setAttribute('value', data.registration_number);
        const airline = document.getElementById('airline');
        airline.setAttribute('value', data.airline);
        const passengerCapacity = document.getElementById('passenger-capacity');
        passengerCapacity.setAttribute('value', data.passenger_capacity)
        const planeStatus = document.getElementById('plane-status');
        planeStatus.setAttribute('value', data.plane_status);

        

    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  fetchDataPlanes(updatePlaneEndpoint);