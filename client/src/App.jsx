import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import moment from 'moment';
import Headers from "./components/Headers";
// ImageUploadUI - React + Tailwind CSS
// NOTE: This file contains only presentational UI (no state, no event handlers).
// You can plug in your upload logic, handlers and props where indicated.

const App = ()=> {
  const [fileField,setFileField]=useState('')
  const [backendImg,setBackendImg]=useState('')
  const [Img,setImg]=useState('')
  const [loading,setLoading]=useState(false)
  const [uploadedImg,setUploadedImg]=useState([] || '')
  const [upload,setUpload]=useState('')
  let currentImg = useRef()
 
  const handleImageUpload = (e)=>{
    let fileData= e.target.files[0]
    setBackendImg(fileData)
    let imgUrl = URL.createObjectURL(fileData)
    setImg(imgUrl)
  }
  // http://localhost:4000/img/imgUpload
const handleUpload =async()=>{
  setLoading(true)
  if(!Img){
    setLoading(true)
    alert('please first select an image!')
  }else{
    setLoading(false)
  }
  let myFormData= new FormData()
  myFormData.append(
      'image',backendImg
  )
  try {
   let res = await axios.post('http://localhost:4000/img/imgUpload',myFormData,{
      withCredentials:true
    })
      setUpload(res.data)
      setLoading(false)
    setImg('')
  } catch (error) {
    setLoading(false)
    console.log(error)
  }
  finally{
    setLoading(false)
  }
}
const getAllImg=async()=>{
  try {
   let res =await axios.get('http://localhost:4000/img')
   setUploadedImg(res.data)
  } catch (error) {
    console.log(error)
  }
}

// delete removeFile 
const handleRemove = async (imgLink) => {

  // if (!image) return;

  try {
    // Extract Cloudinary public_id from imageLink
    // const imgId = image?.imageLink.split('/')[7].split('.')[0]; 
    // console.log(imgId, 'will be deleted');
    // const myFormData = new FormData()
    // myFormData.append('imgId',imgId)
    try {
     await axios.delete(`http://localhost:4000/img/deleteImg`,{imgLink}).then(()=>{}).catch(e=>{
        console.log(e)
      })

    } catch (error) {
      console.log(error)
    }

    // Refresh UI automatically after deletion
    getAllImg();
  } catch (error) {
    console.error(error);
  }
};
useEffect(()=>{
  getAllImg()
},[upload])
// console.log(uploadedImg[0].imageLink,'uploaded')
  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <Headers/>

        {/* Upload Card */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dropzone (visual only) */}
            <div className="col-span-1 md:col-span-2">
              <div  className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center h-56 md:h-72">
                {Img ? (
                  <div className="w-[600px] flex justify-center items-center rounded-[5px] h-[400px] overflow-hidden">
                    <img className="w-full" src={Img} alt="Image" />
                  </div>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-slate-400 mb-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M7 16v-4a4 4 0 014-4h1m4 8V8m0 0l-3 3m3-3l3 3"
                      />
                    </svg>
                    <div className="text-center">
                      <p className="text-lg font-medium text-slate-700">Drop images here</p>
                      <p className="text-sm text-slate-500 mt-1">or</p>
                      <form>
                        <input onChange={handleImageUpload} type="file" hidden ref={currentImg} />
                      </form>
                      <button
                        onClick={() => currentImg.current.click()}
                        className="mt-3 inline-flex items-center px-4 py-2 rounded-lg bg-slate-800 text-white text-sm shadow-sm"
                      >
                        Choose files
                      </button>
                    </div>
                    <p className="mt-4 text-xs text-slate-400">
                      Supported: JPG, PNG, GIF — Max 10MB each
                    </p>
                  </>
                )}
              </div>

              {/* Hint / Tips */}
              <div className="mt-4 text-sm text-slate-500">
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    Image Link : 
                    <a className="text-blue-500" target="_blank" href={uploadedImg[0]?.imageLink}>({uploadedImg[0]?.imageLink}).</a>
                  </li>
                  <li>You can reorder uploads — drag handles shown in thumbnails.</li>
                  <li>Each thumbnail displays a progress placeholder and actions.</li>
                </ul>
              </div>
            </div>

            {/* Sidebar: Upload Settings (visual) */}
            <aside className="col-span-1">
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-slate-700">Upload settings</h3>
                <div className="mt-3 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Image resize</span>
                    <span className="text-xs text-slate-400">Auto</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Compress</span>
                    <span className="text-xs text-slate-400">On</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Visibility</span>
                    <span className="text-xs text-slate-400">Private</span>
                  </div>
                </div>

                <div className="mt-4">
                  <button onClick={handleUpload} className="w-full px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm">
                    {
                      !loading ? 'Start upload' :'Loading.......'
                    }
                  </button>
                </div>
              </div>
            </aside>
          </div>

          {/* Previews Grid (static placeholders) */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-slate-700 mb-3">Files</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {/* Image card (repeat visually) */}
              {uploadedImg?.map((image, i) => (
                <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"
                >
                  {/* {console.log(image.imageLink.split('/')[7].split('.')[0])} */}
                  {/* {console.log(image._id)} */}
                  <div className="relative h-36 bg-slate-100 flex items-center justify-center">
                    <img
                      src={`${image?.imageLink}`}
                      alt={`preview-${i}`}
                      className="object-cover w-full h-full"
                    />
                    {/* Progress overlay (visual only) */}
                    <div className="absolute inset-x-0 bottom-0 p-2">
                      <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500"
                          style={{ width: `${(i + 1) * 10}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-slate-600 truncate">image_{i + 1}.jpg</div>
                      <div className="flex items-center space-x-2">
                        {/* Drag handle visual */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-slate-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M4 7h16M4 12h16M4 17h16"
                          />
                        </svg>
                        {/* Action icons (visual only) */}
                        <button className="text-xs text-slate-500">Edit</button>
                        <button onClick={()=>handleRemove(image?.imageLink)} className="text-xs text-rose-500">Remove</button>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
                      <span>1.2 MB</span>
                      <span className="text-blue-500">{moment(image.createdAt).fromNow()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state hint (responsive) */}
            <div className="mt-6 text-center text-sm text-slate-500">
              <p>If no files are present, show a friendly empty state with call-to-action.</p>
            </div>
          </div>
        </section>

        {/* Footer actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-slate-600">Selected {uploadedImg.length} files</div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg border border-slate-200 text-sm">Clear</button>
            <button className="px-4 py-2 rounded-lg bg-slate-800 text-white text-sm">
              Upload all
            </button>
          </div>
        </div>
        {/* Notes */}
        <div className="mt-6 text-xs text-slate-400">
          <p>
            Note: This component is presentational only — integrate file input, drag/drop, state and
            upload handlers where needed.
          </p>
        </div>
      </div>
    </div>
  );
}
export default App
