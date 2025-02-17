import React, { useState } from 'react'
import AdminSetup from './AdminSetup'
import ComplaintProfiles from './ComplaintProfiles'
import { Confirm } from './Confirm'
import Success from './Success'
import Modal from 'react-bootstrap/Modal'
import { BsFillExclamationDiamondFill } from 'react-icons/bs'
import { BsFillXCircleFill } from 'react-icons/bs'

export const UserForm = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [offence, setOffence] = useState('Anti Semitism')
  const [description, setDescription] = useState('')
  const [anonymous, setAnonymous] = useState(false)
  const [postSuccess, setPostSuccess] = useState(true)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const nextStep = () => {
    const steps = step
    setStep(steps + 1)
  }

  const prevStep = () => {
    const steps = step
    setStep(steps - 1)
  }

  const inputChange = input => e => {
    if (input === 'anonymous') {
      setAnonymous(e.target.checked)
      // console.log(input, e.target.checked);
    }
    if (input === 'email') {
      setEmail(e.target.value)
    }
    if (input === 'offence') {
      setOffence(e.target.value)
    }
    if (input === 'description') {
      setDescription(e.target.value)
    }
    // console.log(input, e.target.value);
  }

  const setPostSucc = response => {
    setPostSuccess(response)
  }

  const values = { email, offence, description, anonymous, postSuccess }

  return (
    <>
      <BsFillExclamationDiamondFill onClick={handleShow} />
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title className="text-success">Zurichat Watches</Modal.Title>
          <BsFillXCircleFill variant="secondary" onClick={handleClose} />
        </Modal.Header>
        {step === 1 ? (
          <AdminSetup
            nextStep={nextStep}
            inputChange={inputChange}
            values={values}
          />
        ) : null}
        {step === 2 ? (
          <ComplaintProfiles
            nextStep={nextStep}
            prevStep={prevStep}
            inputChange={inputChange}
            values={values}
          />
        ) : null}
        {step === 3 ? (
          <Confirm
            nextStep={nextStep}
            prevStep={prevStep}
            setPostSucc={setPostSucc}
            values={values}
          />
        ) : null}
        {step === 4 ? <Success postSucc={postSuccess} /> : null}
      </Modal>
    </>
  )
}
export default UserForm
