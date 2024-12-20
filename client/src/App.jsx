/* eslint-disable no-unused-vars */
//npx hardhat node 
//npx hardhat run --network localhost scripts/deploy.js
import Upload from './artifacts/contracts/Upload.sol/Upload.json'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import FileUpload from './components/FileUpload'
import Display from './components/Display'
import Modal from './components/Modal'
import "./App.css"


function App() {
  const [account, setAccount] = useState("")
  const [contract, setContract] = useState(null)
  const [provider, setProvider] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner(); //to write data on blockchain
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";//npx hardhat run --network localhost scripts/deploy.js

        const contract = new ethers.Contract(
          contractAddress, Upload.abi, signer
        )
        //        console.log(contract);
        setContract(contract)
        setProvider(provider)
      } else {
        console.error("Metamask is not installed")
      }
    };
    provider && loadProvider()
  }, [])

  return (
    <>
      {!modalOpen && (
        <button className='share'
          onClick={() => setModalOpen(true)}
        >
          Share
        </button>)}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>)}
      <div className='App'>
        <h1 style={{ color: 'white' }}>Gdrive</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <p style={{ color: 'white' }}>
          Account: {account ? account : "Account not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}>
        </FileUpload>
        <Display contract={contract} account={account}></Display>
      </div>
    </>
  )
}

export default App