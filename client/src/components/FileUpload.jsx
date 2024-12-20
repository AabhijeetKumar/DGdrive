/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import axios from 'axios'
import "./FileUpload.css"

function FileUpload({ contract, account, provider }) {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState("No image selected")
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `5f44cd8f06fa7f97a510`,
            pinata_secret_api_key: `f11a05e31e53eae879f03fb7f776dbca693905a369e5f35e1b2aa9df1355468f`,
            "Content-Type": "multipart/from-data",

          },
        })
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`
        //const signer = contract.connect(provider.getSigner())
        contract.add(account, ImgHash)
        alert("Img Successfully uploaded")

        //to get  back to initial state after upload 
        setFileName("No image selected")
        setFile(null)
      } catch (e) {
        alert("unable to upload image to pinata")
      }
    }
  }
  //To fetch img data
  const retriveFile = (e) => {
    const data = e.target.files[0]; //array of file object
    //    console.log(data)
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data)
    reader.onloadend = () => {
      setFile(e.target.files[0])
    }
    setFileName(e.target.files[0].name)
    e.preventDefault()
  }

  return (
    <div className='top'>
      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor='file-upload' className='choose'>
          Choose Image
        </label>
        <input
          disabled={!account}
          type='file'
          id='file-upload'
          name='data'
          onChange={retriveFile}
        />
        <span className='textArea'>Image:{fileName}</span>
        <button type='submit' className='upload' disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
  )
}

export default FileUpload