

const ErrorPage = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center text-white font-sans" style={{ backgroundImage: "url('https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}>
            <div className="max-w-4xl p-5 text-center bg-opacity-60 bg-black rounded-lg">
                <h1 className="text-4xl font-bold mb-10 text-red-800">
                    Oops, something went wrong
                </h1>
                <p className="text-lg leading-relaxed">
                    We apologize for the inconvenience. Our website is currently experiencing technical difficulties. Please check back later.
                </p>
            </div>
        </div>
    );
};

export default ErrorPage;
