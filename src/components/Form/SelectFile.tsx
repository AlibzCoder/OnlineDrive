import { useRef, useState } from "react";


const SelectFile = (props: any) => {
  const input = useRef<HTMLInputElement>(null);
  const [fileInfo, setFileInfo] = useState<string | null>(null);
  const { name, key } = props;

  const id = "select-file" + name + key;

  return (
    <div className="select-file m-5" style={{
        color: fileInfo ? "var(--primaryColor)" : "var(--gray)"
    }}>
      <input
        ref={input}
        type="file"
        name={name}
        id={id}
        className="hidden"
        onChange={(e) => {
            if(e.target.files instanceof FileList){
                const file = e.target.files[0];
                setFileInfo(file.name)
            }
        }}
      />
      <label
        htmlFor={id}
        className="d-flex w-full p-4 justify-center items-center flex-column"
      >
        {fileInfo ? (
          <h6>{fileInfo}</h6>
        ) : (
          <>
            <i className="fal fa-cloud-upload-alt mb-2"></i>
            <h6>Uplaod</h6>
          </>
        )}
      </label>
    </div>
  );
};

export default SelectFile;