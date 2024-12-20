import { useEffect, useState } from 'react'
import "./Modal.css"

function Modal({ setModalOpen, contract }) {

  const sharing = async () => {
    const address = document.querySelector(".address").value
    await contract.allow(address)
    console.log("Shared")
  }

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess()
      let select = document.querySelector("#selectNumber")
      const options = address
      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, []);
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='title'>Share with</div>
        <div className='body'>
          <input
            type='text'
            className='address'
            placeholder='Enter Address'>
          </input>
        </div>
        <form id='myForm'>
          <select id='selectNumber'>
            <option className='address'>People Wiht Access</option>
          </select>
        </form>
        <div className='footer'>
          <button
            onClick={() => {
              setModalOpen(false)
            }}
            id='cancelBtn'
          >
            Cancle
          </button>
          <button onClick={() => sharing()}>Share</button>
        </div>
      </div>

    </div>
  )
}

export default Modal