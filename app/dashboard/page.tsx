import Documents from "@/components/Documents";

export const dynamic = "force-dynamic";

function Dashboard() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="h-full max-w-7xl mx-auto ">
        <h1 className="text-3xl p-5 font-extralight text-indigo-600 dark:text-indigo-100">
          My Documents
        </h1>

        <Documents />
      </div>
    </div>
  );
}
export default Dashboard;
