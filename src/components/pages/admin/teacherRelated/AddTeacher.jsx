/* eslint-disable no-unused-vars */
import Popup from '@/components/helper/Popup'
import { getSubjectDetails } from '@/redux/slices/sclass/sclassHandle'
import { registerUser } from '@/redux/slices/user/userHandle'
import { underControl } from '@/redux/slices/user/userSlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'


const AddTeacher = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const subjectID = params.id
  const { status, response, error } = useSelector(state => state.user);
  const { subjectDetails } = useSelector((state) => state.sclass);
  
  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
  }, [dispatch, subjectID]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loader, setLoader] = useState(false)

  const role = "Teacher"
  const school = subjectDetails?.data && subjectDetails?.data?.school
  const teachSubject = subjectDetails?.data && subjectDetails?.data?._id
  const teachSclass = subjectDetails?.data && subjectDetails?.data?.sclassName && subjectDetails?.data?.sclassName?._id

  const fields = { name, email, password, role, school, teachSubject, teachSclass }

  const submitHandler = (event) => {
    event.preventDefault()
    setLoader(true)
    dispatch(registerUser(fields, role))
  }


  useEffect(() => {
    if (status === 'added') {
      dispatch(underControl())
      navigate("/Admin/teachers")
    }
    else if (status === 'failed') {
      setMessage(response)
      setShowPopup(true)
      setLoader(false)
    }
    else if (status === 'error') {
      setMessage("Network Error")
      setShowPopup(true)
      setLoader(false)
    }
  }, [status, navigate, error, response, dispatch]);
  const inputClassName = ` rounded-lg px-8 mb-4`
  return (
    <section>
      <div>
        <div className="flex w-full justify-center">
          <form className="bg-blue-200 w-1/3 flex flex-col items-center rounded-xl" onSubmit={submitHandler} >
            <h3 className="text-xl font-semibold my-8 text-center">Add Teacher</h3>

            <div className='flex flex-col'>
              <label>
                Subject : {subjectDetails.data && subjectDetails.data.subName}
              </label>
              <label>
                Class : {subjectDetails?.data && subjectDetails?.data?.sclassName && subjectDetails?.data?.sclassName?.sclassName}
              </label>
            </div>
            <div className='flex flex-col w-5/6'>
              <label>Teacher Name</label>
              <input className={`${inputClassName}`} type="text" placeholder="Enter teacher's name..."
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name" required />
            </div>

            <div className='flex flex-col w-5/6'>

              <label>Email</label>
              <input className={`${inputClassName}`} type="email" placeholder="Enter teacher's email..."
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email" required />
            </div>

            <div className='flex flex-col w-5/6'>
              <label>Password</label>
              <input className={`${inputClassName}`} type="password" placeholder="Enter teacher's password..."
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password" required />
            </div>

            <button className="bg-orange-600 text-white px-6 py-2 rounded-lg my-4" type="submit" disabled={loader}>
              {loader ? (
                // <CircularProgress size={24} color="inherit" />
                <h1>Loading...</h1>
              ) : (
                'Register'
              )}
            </button>
          </form>
        </div>
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </div>
    </section>
  )
}

export default AddTeacher