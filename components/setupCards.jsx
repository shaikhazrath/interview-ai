"use client";
import React,{useState} from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Image from "next/image";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";

export function SetupCards({ data }) {
  const [loading ,setLoading] = useState(false)

  const router = useRouter();
  
  const handleSelectInterview = async(id) => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/interview/preMadeSetup',{id:id},{
        headers: {
          authorization: token
        }
      })
      localStorage.setItem('interviewid', res.data._id);

      if (res.data) {
        router.push('/interview/takeinterview');
      }
    } catch (error) {
      setLoading(false)
      console.error("Error in handleSelectInterview:", error);
    }
  };
  if(loading){
    return(
      <div className="flex justify-center items-center">
      <Loader2 className="mr-2 h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <a onClick={()=>handleSelectInterview(data.id)}>
    <CardContainer className="inter-var" key={data.id} >
      <CardBody className="bg-gray-50  relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-max rounded-xl p-6 border overflow-hidden">
        <div size={250} duration={12} delay={9} />
        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
          {data.name}
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          {data.description}
        </CardItem>
        <CardItem className="w-full mt-4">
          <img
            src={data.image}
            height="1000"
            width="1000"
            className=" h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <CardItem>
        </CardItem>
      </CardBody>
    </CardContainer>
    </a>
  );
}