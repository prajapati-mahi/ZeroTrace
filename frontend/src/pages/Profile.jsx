import { useEffect, useState } from "react";
import api from "../services/api";

const Profile = () => {

  const [profile,setProfile]=
  useState(null);

  useEffect(()=>{

    fetchProfile();

  },[]);

  const fetchProfile=async()=>{

    try{

      const res=
      await api.get("/profile");

      setProfile(res.data);

    }

    catch(error){

      console.log(error);

    }

  };

  if(!profile){

    return(
      <div className="min-h-screen bg-[#09090F] text-white flex items-center justify-center">

        Loading...

      </div>
    );

  }

  return(

    <div className="min-h-screen bg-[#09090F] text-white flex justify-center items-center">

      <div className="bg-[#151523] p-10 rounded-3xl w-[550px]">

        <h1 className="text-4xl font-black">

          {profile.user.name}

        </h1>

        <p className="mt-4">

          {profile.user.email}

        </p>

        <hr className="my-8"/>

        <p>

          Reports :
          {profile.totalReports}

        </p>

        <p>

          Average Similarity :
          {profile.averageSimilarity}%

        </p>

        <p>

          Average AI :
          {profile.averageAI}%

        </p>

      </div>

    </div>

  );

};

export default Profile;