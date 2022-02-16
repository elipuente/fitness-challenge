import { useState } from "react";
import Compressor from "compressorjs";

import { CameraIcon, CheckCircleIcon } from "@heroicons/react/outline";
import LoadingSpinner from "../LoadingSpinner";

const AddImage = ({ setEncodedImage, loading }) => {
  const [addedImage, setAddedImage] = useState(false);
  const [convertingImage, setConvertingImage] = useState(false);

  const handleFileInputChange = (e) => {
    setConvertingImage(true);

    const file = e?.target?.files?.[0];

    if (file) {
      const reader = new FileReader();
      new Compressor(file, {
        maxHeight: 1200,
        checkOrientation: true,
        quality: 0.6,
        mimeType: "image/webp",
        success(compressedImage) {
          reader.readAsDataURL(compressedImage);
          reader.onloadend = () => {
            setEncodedImage(reader.result);
            setConvertingImage(false);
            setAddedImage(true);
          };
        },
        error() {
          setConvertingImage(false);
          setAddedImage(false);
        },
      });
    }
  };

  return (
    <>
      <input
        type="file"
        name="image"
        id="image-upload"
        accept="image/*"
        className="hidden"
        disabled={loading}
        onChange={handleFileInputChange}
      />
      <label
        htmlFor="image-upload"
        className="flex flex-row items-center text-gray-500 cursor-pointer"
      >
        {addedImage ? (
          convertingImage ? (
            <>
              <LoadingSpinner className="h-6 w-6 mr-1" />
              <p className="text-emerald-600">Converting Image...</p>
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-6 w-6 mr-1 text-emerald-600" />
              <p className="text-emerald-600">Added</p>
            </>
          )
        ) : (
          <>
            <CameraIcon className="h-6 w-6 mr-1" />
            <p>Add an image</p>
          </>
        )}
      </label>
    </>
  );
};

export default AddImage;
