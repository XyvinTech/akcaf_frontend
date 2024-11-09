import React, { useRef, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";
import { StyledButton } from "./StyledButton";
import { Stack } from "@mui/material";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(0, 0, 0, 0.2)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(0, 0, 0, 0.2)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(0, 0, 0, 0.2)",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(0, 0, 0, 0.2)",
    opacity: 1,
  },
}));

const ImagePreview = styled("img")({
  width: "100px",
  height: "100px",
  marginTop: "10px",
  objectFit: "contain",
  border: "1px solid rgba(0, 0, 0, 0.2)",
  borderRadius: "4px",
});
const PdfPreview = styled("div")({
  width: "100px",
  height: "100px",
  marginTop: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid rgba(0, 0, 0, 0.2)",
  borderRadius: "4px",
  backgroundColor: "#f0f0f0",
  fontSize: "12px",
  fontWeight: "bold",
  color: "rgba(0, 0, 0, 0.5)",
});
export const StyledEventUpload = ({
  label,
  value,
  onChange,
  ratio = 16 / 9,
}) => {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(value || null);
  const [isPdf, setIsPdf] = useState(false);
  const [srcImage, setSrcImage] = useState(null);
  const cropperRef = useRef(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (fileType.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setSrcImage(reader.result);
        };
        reader.readAsDataURL(file);
        setIsPdf(false);
      } else if (fileType === "application/pdf") {
        setSelectedImage(file.name);
        setIsPdf(true);
        onChange(file);
      }
    }
  };

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas();
      croppedCanvas.toBlob((blob) => {
        if (blob) {
          const croppedUrl = URL.createObjectURL(blob);
          setCroppedImageUrl(croppedUrl);
          setSelectedImage(croppedUrl);
          onChange(blob); // Pass the cropped image as a blob
        }
      }, "image/jpeg");
    }
  };
console.log("ratio",ratio);

  useEffect(() => {
    if (value && typeof value === "string") {
      setSelectedImage(value);
      setIsPdf(value.endsWith(".pdf"));
    }
  }, [value]);

  return (
    <>
      <CustomTextField
        fullWidth
        label={label}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleIconClick}>
                <BackupOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
          readOnly: true,
        }}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept="image/*,application/pdf"
      />
      {srcImage && (
        <Stack spacing={2}>
          <Cropper
           key={ratio}
            src={srcImage}
            style={{ height: 200, width: "100%" }}
            aspectRatio={ratio}
            guides={false}
            ref={cropperRef}
            viewMode={1}
            dragMode="none" // Prevent dragging the image
            scalable={false} // Disable scaling (resizing) the image
            zoomable={true} // Disable zooming in/out
            movable={true} // Prevent moving the cropping area
            cropBoxResizable={false} // Prevent resizing the crop box
            cropBoxMovable={true} // Prevent moving the crop box
          />
          <StyledButton
            name={"Save Crop"}
            variant={"primary"}
            onClick={handleCrop} style={{ width: "100%" }}
          />
        </Stack>
      )}
      {croppedImageUrl && (
        <ImagePreview src={croppedImageUrl} alt="Cropped Preview" />
      )}
      {selectedImage && isPdf && (
        <PdfPreview>PDF Preview: {selectedImage}</PdfPreview>
      )}
    </>
  );
};
