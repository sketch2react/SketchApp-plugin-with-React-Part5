import {useState, useEffect } from 'react';
import * as React from "react";

const useSketchData = (initialValue:string = "") => {
  const [sketchData, setData] = useState<string>(initialValue);

  useEffect(() => {
    const handleSendDataEvent = (e:any) => {
      setData(e.detail.data as string);
    }

    window.addEventListener("send-data", handleSendDataEvent);
    return () => {
      window.removeEventListener("send-data", handleSendDataEvent);
    }
  }, [])
  
  const setSketchData = (data:string) => {
    window.postMessage('setSelectionName', data);
    setData(data);
  }

  const refreshSketchData = () => {
    window.postMessage('get-data');
  }
  
  return {sketchData, setSketchData, refreshSketchData};
}

export default useSketchData;