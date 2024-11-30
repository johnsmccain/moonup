
export interface Cloudinary {
  createUploadWidget: (
      options: { cloudName: string; uploadPreset: string },
      callback: (error: any, result: any) => void
  ) => {
      open: () => void;
  };
}import React, { useState } from "react";

const UploadWidget: React.FC = () => {
    const [publicId, setPublicId] = useState<string | null>(null);

    const handleUpload = () => {
        if (window.cloudinary) {
            const uwConfig = {
                cloudName: "your-cloud-name",
                uploadPreset: "your-upload-preset",
            };

            const myWidget = window.cloudinary.createUploadWidget(
                uwConfig,
                (error: any, result: any) => {
                    if (!error && result && result.event === "success") {
                        console.log("Done! Here is the image info: ", result.info);
                        setPublicId(result.info.public_id);
                    }
                }
            );

            // Open the widget
            myWidget.open();
        } else {
            console.error("Cloudinary is not available on the window object.");
        }
    };

    return (
        <div>
            <button onClick={handleUpload}>Upload Image</button>
            {publicId && <p>Uploaded Image Public ID: {publicId}</p>}
        </div>
    );
};

export default UploadWidget;
