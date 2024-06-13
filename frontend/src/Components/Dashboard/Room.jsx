import { useEffect, useState } from "react";
import Sidebar from "./Sidebar"
import RoomTable from "./RoomTable";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Dashboard/Dashboard.css"
import useAuthRedirect from "../../../context/useAuth";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';




const Room = () => {
    useAuthRedirect();
    const [roomData, setRoomData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [message, setMessage] = useState("");
    const [isSideBarToggle, setIsSideBarToggle] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const fetchRooms = async () => {
            try {
                const response = await axios.get("https://hostel-management-3ztc.vercel.app/room/");
                setRoomData(response.data);
            } catch (error) {
                setIsLoading(false);
                if(error.response && error.response.status === 400) {
                    setMessage("Cannot fetch room...")
                }else {
                    setMessage("server error!")
                }
            }finally{
                setMessage(false)
            }
        }

        fetchRooms();
    }, []);

    useEffect(() => {
        const filteredRooms = roomData.filter((res) => {
            const roomLocation = res.roomLoaction?.toLowerCase() || "";
            const roomStatus = res.roomStatus?.toLowerCase() || "";

            return (
                roomLocation.includes(search.toLowerCase()) || 
                roomStatus.includes(search.toLowerCase())
            );
        });

        setSearchResult(filteredRooms);
    }, [roomData, search])


    const handleAddRoom = (newRoomData) => {
       setRoomData((prevData) => [...prevData, newRoomData])
    };

    const handleUpdateRoom = (updatedRoomData) => {
       setRoomData((prevData) => prevData.map((room) => room._id === updatedRoomData._id ? updatedRoomData : room))
    };


    const removeRoom = async(id) => {
        try {
            await axios.delete(`https://hostel-management-3ztc.vercel.app/room/${id}`);
            setRoomData((prevRoomdata) => prevRoomdata.filter((room) => room._id !== id))
        } catch (error) {
            console.error("Failed to delee room", error)
        }
    }

    const confirmDelete = (_id) => {
        confirmAlert({
          title: " Delete This Room",
          message: "Are you sure you want to delete this room",
          buttons: [
            {
              label: "Delete",
              onClick: () => removeRoom(_id),
            },
    
            {
              label: "Cancel",
              onClick: () => alert("deletion cancelled"),
            },
    
          ],
        });
      };


    return (
        <div>
            <div>
                {isSideBarToggle && (<div className='mobile-side-nav'>
                    <Sidebar />
                </div>)}
            </div>

            <div className='--flex --overflow-hidden'>
                <div className="desktop-side-nav">
                    <Sidebar />

                </div>
                <div className="--flex-dir-column --overflow-y-auto  --flex-1 --overflow-x-hidden">
                    <main className='--flex-justify-center w-full'>
                        <div className="right --dash-main">
                            <div className="--flex-justify-between">
                                <h1>Hostel Room Listing</h1>

                                {isSideBarToggle ? (<FaTimes className='sidebar-toggle-iconb' onClick={() => setIsSideBarToggle(false)} />) :
                                    (<FaBars className='sidebar-toggle-iconb' onClick={() => setIsSideBarToggle(true)} />)}
                            </div>

                            <p>Search students</p>

                            <input
                                placeholder="Search by room number, status, or location"
                                type="text"
                                className="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div>
                                <RoomTable
                                    rooms={searchResult}
                                    onAddRoom={handleAddRoom}
                                    onUpdateRoom={handleUpdateRoom}
                                    onDeleteRoom={confirmDelete}
                                />
                            </div>

                        </div>
                    </main>

                </div>
            </div>
        </div>



    );
};

export default Room;

