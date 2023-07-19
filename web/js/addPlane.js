const addPlaneForm = document.getElementById('add-plane-form');
const returnPlanes = document.getElementById('return-planes');
const addPlaneEndpoint = 'http://localhost:4000/api/planes';

returnPlanes.addEventListener('click', ()=>{
    window.location.href = '../adminPlanes.html'
})

addPlaneForm.addEventListener('submit', async (event) => {
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
    const response = await axios.post(addPlaneEndpoint, planeData);

    if (response.status === 201) {
      alert('Plane added successfully!');
      addPlaneForm.reset();
    } else {
      alert('Failed to add the plane. Please try again.');
    }
  } catch (error) {
    alert('An error occurred. Please try again later.');
    console.error(error);
  }
});