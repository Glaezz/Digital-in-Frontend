import { Link } from "react-router-dom";

export default function Forbidden(){
    return (
        <div className="grid h-screen place-content-center bg-[#070807]">
  <div className="text-center">
    <h1 className="text-9xl font-black text-gray-700">403</h1>

    <p className="text-2xl font-bold tracking-tight sm:text-4xl text-white">
      Forbidden
    </p>

    <p className="mt-4 text-gray-400">You don't have permission to access this resource.</p>

    <Link
      to="/"
      className="mt-6 inline-block rounded-sm bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-3 focus:outline-hidden"
    >
      Back to Home
    </Link>
  </div>
</div>
    )
}