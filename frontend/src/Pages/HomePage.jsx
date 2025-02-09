import React, { useEffect, useState,useRef } from 'react';
import { useRideStore } from '../store/rideauthStore';
const LazyComponent = React.lazy(() => import('../Components/map'));
import RateList from '../Components/RateList';
import { axiosInstance } from "../lib/axios";
import DomToImage from 'dom-to-image';
import {compressImage} from "../lib/compress.js"
import RideTrack from '../Components/RideTrack.jsx';
import { useDriverAuthStore } from '../store/driverauthStore.js';
import RideCompletePage from './rideCompletePage.jsx';
import { useAuthStore } from '../store/useAuthStore.js';

const HomePage = () => {

  const { location,setLocation, getDrivers,bookRide, checkDriver,Payment,subscribeToDrivers,unsubscribeFromDrivers} = useRideStore();
  const {getLocation} = useDriverAuthStore()
  const [pickup, setPickup] = useState();
  const [destination, setDestination] = useState();
  const [destinationcoordinates, setdestinationcoordinates] = useState(null);
  const [pickupcoordinates, setpickupcoordinates] = useState(null);
  const [drivercoordinates, setdrivercoordinates] = useState(null);
  const [pickupDropdown, setpickupDropdown] = useState(null);
  const [destinationDropdown, setdestinationDropdown] = useState(null);
  const [route, setRoute] = useState(null);
  const [distTime,setdistTime] = useState(null)
  const [selectedVehicle,setSelectedVehicle] = useState(null)
  const [coupon,setCoupon] = useState(null); 
  const [driver,setdriver] = useState(null); 
  const [CouponWrong,setCouponWrong] = useState(false)
  const [rideConfirm,setRideConfirm] = useState(false)
  const [rideStart,setRideStart] = useState(false)
  const [rideComplete,setRideComplete] = useState(false)
  const [pickuptime,setpickuptime] = useState(0)
  const [droptime,setdroptime] = useState(0)
  const [amt,setAmt] = useState(0)
  
  useEffect(()=>{
    subscribeToDrivers()
    return () => {unsubscribeFromDrivers()}
  },[subscribeToDrivers,unsubscribeFromDrivers])

  const GetCurrentLocation = ()=>{
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    })}


  const getDriverLocation = async () => {
    const res = await getLocation(driver._id);
    setdrivercoordinates(res.data)
    const resp = await axiosInstance.put("/api/ride/route",{
      pickupcoordinates: {latitude:res.data[0],longitude: res.data[1]},
      destinationcoordinates: pickupcoordinates
    })
    if(resp.data.properties.time<60) {
      setRideConfirm(false)
      setRideStart(true)
    }

    setpickuptime(resp.data.properties.time)
    setRoute(resp.data.geometry.coordinates[0])
  }

  const getDriverLocation2 = async () => {
    const res = await getLocation(driver._id);
    setdrivercoordinates(res.data)
    console.log(res.data);
    const resp = await axiosInstance.put("/api/ride/route",{
      pickupcoordinates: {latitude:res.data[0],longitude: res.data[1]},
      destinationcoordinates: destinationcoordinates
    })
    if(resp.data.properties.time<60) 
    {
      setRideStart(false)
      setRideComplete(true)
    }

    setdroptime(resp.data.properties.time)
    setRoute(resp.data.geometry.coordinates[0])
  }

  
  useEffect(() => {
    let locationInterval
    if(rideConfirm)
    {getDriverLocation()
    locationInterval = setInterval(getDriverLocation, 5000); // Update location every 5 seconds
    }
    else if(rideStart)
    {getDriverLocation2()
    locationInterval = setInterval(getDriverLocation2, 5000); // Update location every 5 seconds
    }
    else {
    GetCurrentLocation(); // Get initial location
    locationInterval = setInterval(GetCurrentLocation, 5000); // Update location every 5 seconds
    }
    // Clean up the interval when the component unmounts
    return () => clearInterval(locationInterval);
  }, [rideConfirm, rideStart, location]);



  const handlePickup = async (e) => {
    setPickup(e.target.value);
    
    const res = await axiosInstance.put("/api/ride/pickup",{
      pickup : e.target.value
    })
        setpickupDropdown(res.data);
      
  };

  const handleDestination = async (e) => {
    setDestination(e.target.value);
    const res = await axiosInstance.put("/api/ride/destination",{
      Destination : e.target.value
    })
        setdestinationDropdown(res.data);
  };

  const handleRoute = async () => {
    if (pickupcoordinates && destinationcoordinates) {
      const res = await axiosInstance.put("/api/ride/route",{
        pickupcoordinates: pickupcoordinates,
        destinationcoordinates: destinationcoordinates
      })
        setdistTime({
          distance:res.data.properties.distance,
          time:res.data.properties.time
        })
        setRoute(res.data.geometry.coordinates[0])
      
    }
  };

  const handleDiscount = (e) =>{
    setCoupon(e.target.value)
    if( e.target.value === "RIDE50"){
      setCouponWrong(false)
        setAmt((selectedVehicle.fare - (selectedVehicle.fare/2)).toFixed(2))
    }else if( e.target.value === "RIDE30")
    {
      setCouponWrong(false)
      setAmt((selectedVehicle.fare - (selectedVehicle.fare/3)).toFixed(2))
      
    }
    else {setCouponWrong(true)
    setAmt(selectedVehicle.fare)
  }
  console.log(amt);
  }


  const handleBooking = async (e) => {
    e.preventDefault();
    
    try {
      console.log("Starting payment...");
      const driver = await checkDriver({
        pickup: pickup,
        pickupcoordinates: pickupcoordinates,
        destinationcoordinates: destinationcoordinates,
        destination: destination,
        vehicle: selectedVehicle.vehicle,
        fare: amt,
        user: useAuthStore.getState().authUser,
        distance:distTime.distance,
        time:distTime.time
      });
      console.log("Driver selected:", driver);
      setdriver(driver)
      if (driver) {
        // Assuming selectDriver is a synchronous function that updates state
        const res = await Payment(selectedVehicle.fare); // This should return a promise
        console.log("Payment response:", res); // Log to verify if Payment completes correctly
  
  
        if (res) {
          try {
            const mapContainer = document.getElementsByClassName('leaflet-map-pane')[0]
            console.log("mapContainer:", mapContainer);
           
            const dataUrl = await DomToImage.toPng(mapContainer,{
              style: {
                margin: '0',
                padding: '0',
              }
          });
            const compressed=await compressImage(dataUrl)
            console.log(compressed);
            await bookRide({
              pickup: pickup,
              destination: destination,
              vehicle: selectedVehicle.vehicle,
              fare: amt,
              driverId: driver._id,
              image: compressed,
              distance:distTime.distance,
              time:distTime.time
            });
            
            console.log("Ride booked");
            setRideConfirm(true)

          } catch (canvasError) {
            console.error("Error capturing map image:", canvasError);
          }
        } else {
          console.log("Payment not confirmed");
        }
      } else {
        setSelectedVehicle(null);
        console.log("Driver not available");
      }
    } catch (paymentError) {
      console.error("Error with payment:", paymentError); // If the Payment function fails
    }
  };
  

  
  useEffect(() => {
    getDrivers();
  }, [location]);

  // Trigger route calculation only when destinationcoordinates or pickupcoordinates change
  useEffect(() => {
    if (pickupcoordinates && destinationcoordinates) {
      handleRoute();
    }
  }, [pickupcoordinates, destinationcoordinates]);

  return (
    <>
    { rideComplete ? <RideCompletePage /> :(
    <div className='flex flex-col mb-20 md:mb-0 md:flex-row'>
      <div id='map' className={`relative scroll-smooth h-[calc(72vh)] md:h-[calc(86vh)] w-[calc(96vw)]`}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <LazyComponent route={route} pickupcoordinates={pickupcoordinates} destinationcoordinates={destinationcoordinates} drivercoordinates={drivercoordinates} rideConfirm={rideConfirm} rideStart={rideStart}/>
        </React.Suspense>
      {!selectedVehicle && <form className='relative z-10 text-white text-lg font-bold flex flex-col text-center items-center justify-center gap-[calc(60vh)] md:gap-[calc(70vh)]'>
        <div className={`dropdown dropdown-bottom (${route} ? disabled: : "") `}>
          <label className='flex items-center gap-4 h-12 md:h-18 bg-gray-900 p-1.5 md:p-3 w-fit rounded-b-2xl'>
            <svg fill="#4dcb34" className='my-auto' height="18px" width="18px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Location-Pin-Filled"> <path d="M12,1c-4.97,0-9,4.03-9,9c0,6.75,9,13,9,13s9-6.25,9-13C21,5.03,16.97,1,12,1z M12,13c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,13,12,13z"></path> </g> </g></svg>
            <input
              type='text'
              className='h-full text-sm md:text-md cursor-text bg-transparent'
              placeholder='Pickup Point'
              tabIndex={0}
              role='button'
              value={pickup}
              onChange={handlePickup}
            />
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu text-sm md:text-base bg-gray-400 rounded-box z-20 p-2 md:p-3 shadow gap-1.5 cursor-pointer'
          >
            {pickupDropdown &&
              pickupDropdown.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setPickup(item.address_line1 + "," + item.address_line2);
                    setpickupcoordinates({ latitude: item.lat, longitude: item.lon });
                    setpickupDropdown(null)
                  }}
                >
                  {item.address_line1},
                  {item.address_line2}
                </li>
              ))}
          </ul>
        </div>
        <div className={`dropdown dropdown-top (${route} ? disabled: : "") `}>
          <label className='flex items-center gap-4 h-12 md:h-18 bg-gray-900 p-1.5 md:p-3 w-fit rounded-t-2xl'>
            <svg fill="#e81111" className='my-auto' height="18px" width="18px" version="1.1" id="Filled_Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve" stroke="#e81111"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Location-Pin-Filled"> <path d="M12,1c-4.97,0-9,4.03-9,9c0,6.75,9,13,9,13s9-6.25,9-13C21,5.03,16.97,1,12,1z M12,13c-1.66,0-3-1.34-3-3s1.34-3,3-3 s3,1.34,3,3S13.66,13,12,13z"></path> </g> </g></svg>
                            
            <input
              type='text'
              className='h-full text-sm md:text-md cursor-text bg-transparent'
              placeholder='Where to?'
              tabIndex={1}
              role='button'
              value={destination}
              onChange={handleDestination}
            />
          </label>
          <ul
            tabIndex={1}
            className='dropdown-content menu text-sm md:text-base bg-gray-400 rounded-box z-20 p-2 md:p-3 shadow gap-1.5 cursor-pointer'
          >
            {destinationDropdown &&
              destinationDropdown.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setDestination(item.address_line1 + "," + item.address_line2);
                    
                    setdestinationcoordinates({ latitude: item.lat, longitude: item.lon });
                    setdestinationDropdown(null)
                  }}
                >
                  {item.address_line1},{item.address_line2}
                </li>
              ))}
          </ul>
        </div>
      </form>}
    </div>
    {(route && !rideConfirm ) && (selectedVehicle 
      ? 
        <form onSubmit={handleBooking} className='rounded-box bg-zinc-900 w-full md:w-[calc(40vw)] p-6 flex flex-col gap-7 mb-14 md:mb-0'>
          
          <label className="input input-bor
          dered flex items-center gap-3 text-emerald-400">
            Pickup
            <input type="text" className="disabled:" value={pickup} />
          </label>
          <label className="input input-bordered flex items-center gap-3 text-red-400">
            Destination
            <input type="text" className="disabled:" value={destination} />
          </label>
          <label className="input input-bordered flex items-center gap-3">
            Vehicle
            <input type="text" className="disabled:" value={selectedVehicle.vehicle} />
          </label>
          <label className="input input-bordered flex items-center gap-3">
            Fare
            <input type="text" value={amt || selectedVehicle.fare} className='disabled:' />
          </label>
          <label className="input input-bordered flex items-center gap-3 " >
            Coupon
            <input type="text" className="grow" placeholder="Enter a valid coupon code" value={coupon} onChange={handleDiscount}/>
            {CouponWrong && <p className='text-xxs text-red-600'>Invalid Coupon</p> }
          </label>
            <button type='submit' className='btn btn-info btn-outline '>Book Ride</button>
          
        </form>
      : 
        <RateList {...distTime} function={setSelectedVehicle} />)}
        {(rideConfirm||rideStart) && <RideTrack pickup={pickup} rideStart={rideStart} destination={destination} driverId={driver} droptime={droptime} pickuptime={pickuptime}/>}
    
    </div>)
    }
  </>
  );
};

export default HomePage;
