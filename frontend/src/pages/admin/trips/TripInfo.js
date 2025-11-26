import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getTrip, selectTrip } from "../../../redux/features/trips/tripSlice";
import TripHeader from "../../../components/trip/TripHeader";
import {
  fetchTripImages,
  uploadTripImages,
  removeTripImage,
  selectTripImages,
  selectTripImagesLoading,
} from "../../../redux/features/trips/tripImagesSlice";

import { BACKEND_URL } from "../../../services/tripService";

const TripInfo = () => {
  const { id } = useParams(); // /trip/:id
  const dispatch = useDispatch();

  //  const trip = useSelector(selectTrip);
  const images = useSelector(selectTripImages);
  const isLoadingImages = useSelector(selectTripImagesLoading);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(getTrip(id));
    dispatch(fetchTripImages(id));
  }, [dispatch, id]);

  // Select images to upload
  const handleSelectImages = (e) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    dispatch(uploadTripImages({ tripId: id, files }));
    e.target.value = null; // reset input
  };

  const openFilePicker = () => fileInputRef.current.click();

  const handleDelete = (imageId) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      dispatch(removeTripImage({ tripId: id, imageId }));
    }
  };

  return (
    <>
      <TripHeader tripID={id} />
      {/* ------------- images----------------- */}
      <div className="p-6 max-w-5xl mx-auto">
        {/* Add Images Button */}
        <button
          onClick={openFilePicker}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add Images
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleSelectImages}
        />

        {/* Loading State */}
        {isLoadingImages && <p className="mt-4 text-sm">Loading images...</p>}

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {images.length === 0 && (
            <p className="col-span-full text-gray-500">No images yet</p>
          )}

          {images.map((img) => (
            <div
              key={img._id}
              className="border rounded shadow-sm p-2 bg-white relative"
            >
              <img
                src={`${BACKEND_URL}/${img.path}`}
                alt={img.path || "trip image"}
                className="w-full h-32 object-cover rounded"
              />

              <button
                onClick={() => handleDelete(img._id)}
                className="text-xs text-red-600 absolute top-1 right-1 bg-white px-1 rounded"
              >
                ✕
              </button>

              <p className="text-xs text-gray-500 mt-1">
                {(img.size / 1024).toFixed(1)} KB
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TripInfo;
