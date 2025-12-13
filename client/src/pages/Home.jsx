import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import moment from "moment";
import Headers from "../components/Headers";
import getMessage from "../utils/tostMsg";
import Button from "../components/Button";

const Home = () => {
  const [backendImg, setBackendImg] = useState(null);
  const [Img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadedImg, setUploadedImg] = useState([]);
  const [upload, setUpload] = useState("");
  const currentImg = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setBackendImg(file);
    setImg(URL.createObjectURL(file));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setBackendImg(file);
    setImg(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!Img) {
      getMessage.error("please first select an image!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", backendImg);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/img/imgUpload`,
        formData,
        { withCredentials: true }
      );
      setUpload(res.data);
      getMessage.success("image uploaded successfully");
      setImg(null);
    } catch (err) {
      getMessage.error("something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const getAllImg = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/img`);
    setUploadedImg(res.data);
  };

  const handleRemove = async (imgLink) => {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/img/deleteImg/${imgLink}`,
      { withCredentials: true }
    );
    getMessage.success("image deleted successfully");
    getAllImg();
  };

  const handleRemoveImg = () => {
    setImg(null);
    setBackendImg(null);
  };

  useEffect(() => {
    getAllImg();
  }, [upload]);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 flex justify-center">
      <div className="w-full max-w-5xl">
        <Headers />

        <section className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* DROP ZONE */}
            <div className="md:col-span-2">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-slate-200 rounded-xl min-h-[220px] md:min-h-[280px] flex items-center justify-center p-4"
              >
                {Img ? (
                  <div className="relative w-full max-w-[600px] aspect-[3/2] rounded-md overflow-hidden">
                    <img
                      src={Img}
                      alt="preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={handleRemoveImg}
                      className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-red-500 text-white text-sm shadow"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-base sm:text-lg font-medium text-slate-700">
                      Drop images here
                    </p>
                    <input
                      type="file"
                      hidden
                      ref={currentImg}
                      onChange={handleImageUpload}
                    />
                    <button
                      onClick={() => currentImg.current.click()}
                      className="mt-3 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm"
                    >
                      Choose files
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* SIDEBAR */}
            <aside>
              <div className="bg-slate-50 rounded-lg p-4">
                <h3 className="text-sm font-medium">Upload settings</h3>
                <Button
                  onClick={handleUpload}
                  loading={!loading ? "Uploading" : "Loading..."}
                />
              </div>
            </aside>
          </div>

          {/* FILE GRID */}
          <div className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {uploadedImg.map((img, i) => (
                <div
                  key={i}
                  className="rounded-xl border overflow-hidden shadow-sm"
                >
                  <div className="h-36">
                    <img
                      src={img.imageLink}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 text-xs">
                    <div className="flex justify-between">
                      <span>image_{i + 1}.jpg</span>
                      <button
                        onClick={() => handleRemove(img?._id)}
                        className="text-rose-500"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-1 text-slate-400 flex justify-between">
                      <span>{img.size || "MB"}</span>
                      <span>{moment(img.createdAt).fromNow()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
