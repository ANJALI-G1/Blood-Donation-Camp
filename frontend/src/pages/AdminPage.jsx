import { useState } from "react";
import axios from "axios";
import { useAdminStore } from "../store/adminStore.js";
import { useEffect } from "react";


const AdminPage = () => {
  const {addCampAdmin,camps,fetchAllCampsAdmin}=useAdminStore();
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    contact: "",
    startDate: "",
    endDate: "",
    registrationLink: "",
    latitude: "",
    longitude: "",
  });
  const [image, setImage] = useState(null);

  useEffect(()=>{
    fetchAllCampsAdmin();
  },[fetchAllCampsAdmin]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData();
  for (let key in formData) {
    data.append(key, formData[key]);
  }
  data.append("image", image);

  try {
    const res = await addCampAdmin(data);

    if (res?.data) {
      alert("Camp added successfully!");
      document.getElementById("my_modal_1").close();
    } else {
      console.warn("Camp added but response missing data:", res);
      alert("Camp added, but response was unexpected.");
    }
  } catch (err) {
    console.error("Error submitting form:", err);
    alert("Error adding camp");
  }
};


  return (
    <>
      {/* Red Background */}
      <div className="fixed top-0 left-0 w-full h-full z-[-2] bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,100%,95%,0)_0,rgba(248,113,113,0.25)_100%)]"></div>

      {/* Button to Open Modal */}
      <div className="flex justify-center mt-6">
        <button
          className="btn bg-white shadow-md px-4 py-2 rounded"
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          Add Camp
        </button>
      </div>

      {/* Modal with form inside */}
      <dialog id="my_modal_1" className="modal z-50">
        <div className="modal-box bg-white max-w-xl">
          <h2 className="text-xl font-bold mb-4">Add Blood Donation Camp</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              ["name", "Camp Name"],
              ["organization", "Organization"],
              ["contact", "Contact Number"],
              ["startDate", "Start Date"],
              ["endDate", "End Date"],
              ["registrationLink", "Registration Link"],
              ["latitude", "Latitude"],
              ["longitude", "Longitude"],
            ].map(([field, label]) => (
              <div key={field}>
                <label className="block text-sm font-medium">{label}</label>
                <input
                  type={field.includes("Date") ? "date" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("my_modal_1").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-red-600 text-white hover:bg-red-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
      //{console.log(camps)}




    </>
  );
};

export default AdminPage;
