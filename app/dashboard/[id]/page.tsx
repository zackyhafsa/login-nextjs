export default async function Dashboard({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users?id=${params.id}`);
  const data = await res.json();

  return (
    <div className="grid place-items-center h-screen w-full">
      <div className="border border-t-slate-800 border-t-4 rounded-md text-slate-800 p-5 shadow-lg">
        <h1 className="text-3xl font-bold my-3">Selamat Datang {data.user.name}</h1>
        <p>
          Email: <span className="font-bold">{data.user.email}</span>
        </p>
        <p>
          Password: <span className="font-bold">{data.user.password}</span>
        </p>
        <button className="bg-red-500 text-white w-full text-lg py-1 my-5 font-semibold shadow-lg rounded-md hover:bg-red-400">
          Logout
        </button>
      </div>
    </div>
  );
}
