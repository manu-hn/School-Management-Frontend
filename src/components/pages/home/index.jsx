import Button from "@/components/ui/Button";
import StudentImage from "/images/SchoolStudents.avif";
import HomePageHeading from "@/components/ui/Heading";
import { INFO } from "@/constants/homePage";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <section className="w-full grid md:grid-cols-2 gap-4 md:gap-8 min-h-screen ">


            <div className="w-full flex flex-col justify-around items-center h-5/6 px-8">

                <HomePageHeading classNames="text-[1.5em] md:text-[3em]">Welcome to SmartSchoolHub</HomePageHeading>
                <p className="text-justify">{INFO}</p>

                <Button classNames="bg-sky-500 px-6 py-3 rounded-lg text-white">
                    <Link className="" to={'/login'}>Login to Continue</Link>
                </Button>

                <div className="flex justify-around">
                    <p>Don&apos;t have an account?</p>
                    <Link className="text-blue-600 underline-offset-4 underline mx-2" to={'/sign-up'}>Sign Up</Link>
                </div>
            </div>
            <div className="w-full flex justify-center items-center ">

                <img src={StudentImage} alt="School Students" className="max-w-full h-5/6 " />
            </div>
        </section>
    );
}

export default HomePage;
