

import { useFormik } from 'formik';
import Button from "@/components/ui/Button"
import { ADMIN_LOGIN_INITIAL_VALUES } from '@/constants/initialValues';
import InputBox from '@/components/ui/InputBox';
const AdminLogin = () => {
  const formik = useFormik({
    initialValues: ADMIN_LOGIN_INITIAL_VALUES,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className='border border-black/10 w-full'>
      <form onSubmit={formik.handleSubmit}>
       
        <div>
          <InputBox id='email' labelName='Email' inputClass='' labelClass=''
            name='email' onChange={formik?.handleChange} type='email' value={formik?.values?.email} />

        </div>
        <div>
          <InputBox id='password' labelName='Password' inputClass='' labelClass=''
            name='password' onChange={formik?.handleChange} type='password'
            value={formik?.values?.password} />

        </div>
       
        <Button type="submit" classNames='bg-green-800'>Submit</Button>
      </form>
    </div>
  )
}

export default AdminLogin