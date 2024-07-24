import React from "react";
import PropTypes from "prop-types";
import AppLogger from "../../helpers/AppLogger";
import useLocalizedConstants from "../../hooks/useLocalizedConstants";
import { showInfoToast } from "../../helpers/AppToasts";
// validator - check for file name's length
function nameLengthValidation(filename, maxFilenameLength) {
  // TODO: raise any errors. for now it only return true or false
  const result = filename.length > maxFilenameLength;
  result &&
    AppLogger(
      `Name of the file is too long. Limit it to ${maxFilenameLength}`,
      filename
    );
  return result; // true if length exceeds
}

// validator - check for file size
function fileSizeValidation(fileSize, maxFileSize) {
  // TODO: raise any errors. for now it only return true or false
  const result = fileSize > maxFileSize;
  result && AppLogger(`File size exceeds ${maxFileSize}`, fileSize);
  return result; // true if size exceeds
}

// validator - check for file type
function fileTypeValidation(fileType, validFileTypeList) {
  // TODO: raise any errors. for now it only return true or false
  const result = validFileTypeList.includes(fileType);
  !result &&
    AppLogger(
      `Only these file types are allowed, ${validFileTypeList.reduce(
        (filetypestring, curr) => filetypestring + " " + curr
      )}`,
      fileType
    );
  return result; // true if fileType is in allowed array
}

function FormFieldUploadFile(props) {
  const {
    title,
    placeholder,
    maxFilenameLength,
    maxFileSize,
    validFileTypeList,
    setSelectedFile,
    resetFileInputField,
    typesRequired,
    accept = "*",
    multiple = false,
  } = props;
  // const [selectedFile, setSelectedFile] = useState(null);
  const appConstants = useLocalizedConstants();

  function handleUpload(file) {
    if (!multiple) {
      if (file.size <= maxFileSize) {
        // check name length
        maxFilenameLength && nameLengthValidation(file.name, maxFilenameLength);
        // check file size

        maxFileSize && fileSizeValidation(file.size, maxFileSize);

        // check file type
        validFileTypeList && fileTypeValidation(file.type, validFileTypeList);
        // set to state
        setSelectedFile(file);

        // TODO: add upload logic here
      } else {
        showInfoToast(appConstants.upload_max_10_mb_file);
      }
    } else {
      setSelectedFile(file);
    }
  }

  return (
    <div>
      <div className="form-group mb-3">
        <label
          className="text-secondary font-w500 d-flex justify-content-between"
          title="Required"
        >
          <div>
            {title}
            <span className="text-danger">{appConstants.titles.asterisk}</span>
          </div>
          {!multiple && (
            <div className="text-dark">
              {appConstants.maxSize} {Math.floor(maxFileSize / 1000000)}{" "}
              {appConstants.megaByte}
            </div>
          )}
        </label>
        {typesRequired && (
          <label className="text-secondary text-black-50">
            {appConstants.uploadDocFormats}
          </label>
        )}
        <input
          onClick={() => {
            resetFileInputField.current.value = null;
            setSelectedFile(null);
          }}
          accept={accept}
          type="file"
          multiple={multiple}
          ref={resetFileInputField}
          className="form-control"
          onChange={(e) =>
            handleUpload(multiple ? e.target.files : e.target.files[0])
          }
          required={true}
        />
      </div>
    </div>
  );
}

FormFieldUploadFile.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  maxFilenameLength: PropTypes.number,
  maxFileSize: PropTypes.number,
  validFileTypeList: PropTypes.array,
};

export default FormFieldUploadFile;
