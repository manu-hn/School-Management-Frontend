
import { useSelector } from 'react-redux'

const AdminProfile = () => {
  const { currentUser } = useSelector(store => store.user);
  console.log(currentUser)
  return (
    <div className='w-full bg-white/20 flex justify-center items-center'>

      <div className='bg-blue-300 h-[20rem] w-1/4 flex flex-col justify-evenly px-10 rounded-lg'>
        <h2 className='text-xl font-semibold'>{currentUser?.role.toUpperCase()} DETAILS:</h2>
        <h3>Name : {currentUser?.name}</h3>
        <h5>Email : {currentUser?.email}</h5>
        <h5>Role : {currentUser?.role}</h5>
        <h5>School Name : {currentUser?.schoolName}</h5>

      </div>
    </div>
  )
}

export default AdminProfile