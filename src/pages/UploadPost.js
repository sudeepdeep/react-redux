import React, { useEffect, useState } from "react";
import { UploadPhoto } from "../components/UploadPhoto";
import Lottie from "lottie-react";
import uploadLoad from "../assets/uploadLoading.json";
import { ComboButton } from "../components/ComboButton";
import Success from "../components/Success";
import TextField from "../components/TextField";
import Select from "../components/Select";
import Cookies from "js-cookie";
import { useLocation } from "../utils/useLocation";
import { useValidUser } from "../utils/useValidUser";
import axios from "../utils/axios";
import { sectionOptions } from "./Home";

function UploadPost() {
  const [uploadUi, setUploadUi] = useState(true);
  const [form, setForm] = useState({
    title: null,
    abstract: null,
    description: null,
    coverUrl: null,
    username: null,
    section: null,
  });
  useEffect(() => {
    const uploadLoading = setTimeout(() => {
      setUploadUi(false);
    }, 3050);

    return () => clearTimeout(uploadLoading);
  }, []);

  const [success, setSuccess] = useState(false);
  const locs = useLocation();
  const user = useValidUser();

  async function handleUploadFunction() {
    await axios
      .post("/article", {
        ...form,
        latitude: locs.latitude,
        longitude: locs.longitude,
        username: user.name,
        userType: user.name,
        coordinates: [locs.longitude, locs.latitude],
      })
      .then((res) => {
        setSuccess(true);
      });
  }

  if (success) return <Success />;

  if (uploadUi)
    return (
      <div className="w-full flex flex-col h-[70vh] items-center justify-center">
        <Lottie
          animationData={uploadLoad}
          className=" w-[200px] mx-auto my-auto md:w-[630px]"
          loop={true}
          autoplay={true}
        ></Lottie>
        <span className="opacity-75 text-center">
          Tip: Login to get verified & to keep track of your articles
        </span>
      </div>
    );
  return (
    <div className="max-w-xl mx-auto font-bold text-2xl">
      <h3>Add Article</h3>
      <div className="flex flex-col">
        <Select
          onChange={(e) => {
            setForm({
              ...form,
              section: e,
            });
          }}
          options={sectionOptions}
          title={"Section"}
          value={form.section}
        />

        <TextField
          title="Title for the article."
          onChange={(e) => {
            setForm({
              ...form,
              title: e,
            });
          }}
          name="title"
        />
        <TextField
          title=" Abstract for the article."
          onChange={(e) => {
            setForm({
              ...form,
              abstract: e,
            });
          }}
          name="abstract"
          subtitle="Keep it brief and simple."
          rows={3}
        />
        <TextField
          title=" Description for the article."
          onChange={(e) => {
            setForm({
              ...form,
              description: e,
            });
          }}
          name="abstract"
          subtitle="Make sure the above info is correct"
          rows={3}
        />
      </div>
      <UploadPhoto
        title={"Upload Cover"}
        handleChange={(e) => {
          setForm({
            ...form,
            coverUrl: e,
          });
        }}
      />
      <ComboButton
        title={Cookies.get("userId") ? "Post" : "Post as anonymous"}
        onClick={handleUploadFunction}
      />
    </div>
  );
}

export default UploadPost;
