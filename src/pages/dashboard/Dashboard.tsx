import { useEffect, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import TodoModal from "../modals/TodoModal";
import { getTodoList, saveTodo } from "../../service/todoService";
import Pagination from "../../components/pagination";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
}





export default function Dashboard() {
  const [todoLoading, setTodoLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] =
    useState("PENDING");
  const [open, setOpen] = useState(false);  

  const [data, setData] = useState<Task[]>([])


  
const [pagination, setPagination] = useState({
  page: 0,
  size: 5,
  status: "PENDING",
});

const fecthTodoList = async() => {

  try {
    setTodoLoading(true);
    const response = await getTodoList(
      pagination.page,
      pagination.size,
      pagination.status
    );

    setTotalPages(response.data.totalPages);

    setData(response.data.content)
  } catch (error) {
    
  }finally{
    setTodoLoading(false);
    console.log(data, "data");
  }


}

useEffect(() => {
  fecthTodoList();
},[pagination])

  const filteredData =
    activeTab === "All"
      ? data
      : data.filter(
          (item) => item.status === activeTab
        );

  const statusStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "In Progress":
        return "bg-blue-100 text-blue-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      default:
        return "";
    }
  };

  const handleOpen = () => {
    setOpen(true);
  }

  const handleSaveTodo = async (todoData: any) => {
  try {
    setIsLoading(true)
    console.log(todoData);
    const response = await saveTodo(todoData);

    console.log(response, "response")
    
    alert("Todo Saved Successfully");

    setOpen(false);
    fecthTodoList();
  } catch (error) {
    console.error(error);
  }finally{
    setIsLoading(false)
  }
};

  const handleTabChange = (tab: string) => {
    
    setActiveTab(tab);
    console.log(tab, "tab")

    setPagination((prev) => ({
      ...prev,
      page: 0, // reset to first page
      status:
        tab === "All"
          ? ""
          : tab === "PENDING"
            ? "PENDING"
            : tab === "IN_PROGRESS"
              ? "IN_PROGRESS"
              : "COMPLETED",
    }));

  };


  return (
    <div className="bg-white rounded-xl shadow-md p-5">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">
          Task Management
        </h2>

        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700" onClick={handleOpen}>
          + Add Task
        </button>

        <TodoModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={handleSaveTodo}
        isLoading={isLoading}>
        </TodoModal>
      </div>

      {/* Tabs */}

      <div className="flex flex-wrap gap-2 mb-5">
        {[
          "PENDING",
          "IN_PROGRESS",
          "COMPLETED",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Desktop Table */}

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="text-left px-4 py-3">
                ID
              </th>

              <th className="text-left px-4 py-3">
                Task
              </th>

              {/* <th className="text-left px-4 py-3">
                Assigned To
              </th> */}

              <th className="text-left px-4 py-3">
                Due Date
              </th>

              <th className="text-left px-4 py-3">
                Status
              </th>

              <th className="text-center px-4 py-3">
                Actions
              </th>
            </tr>
          </thead>

          {todoLoading ? "Loading..." :
           <tbody>
            {filteredData.map((task, no) => (
              <tr
                key={task.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-4">
                  {no + 1}
                </td>

                <td className="px-4 py-4 font-medium">
                  {task.title}
                </td>

                {/* <td className="px-4 py-4">
                  {task.assignedTo}
                </td> */}

                <td className="px-4 py-4">
                  {task.dueDate}
                </td>

                <td className="px-4 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>

                <td className="px-4 py-4">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 rounded bg-slate-100 hover:bg-slate-200">
                      <Eye size={18} />
                    </button>

                    <button className="p-2 rounded bg-blue-100 hover:bg-blue-200">
                      <Pencil size={18} />
                    </button>

                    <button className="p-2 rounded bg-red-100 hover:bg-red-200">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
           </tbody>
          }

         
        </table>

        <Pagination
          page={pagination.page}
          totalPages={totalPages}
          onPageChange={(page) =>
            setPagination((prev) => ({
              ...prev,
              page,
            }))
          }
        />
      </div>

      {/* Mobile Cards */}

      <div className="grid gap-4 md:hidden">
        {filteredData.map((task) => (
          <div
            key={task.id}
            className="border rounded-xl p-4 shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">
                {task.title}
              </h3>

              <span
                className={`px-2 py-1 rounded-full text-xs ${statusStyle(
                  task.status
                )}`}
              >
                {task.status}
              </span>
            </div>

            {/* <p className="text-sm text-gray-500">
              Assigned: {task.assignedTo}
            </p> */}

            <p className="text-sm text-gray-500 mt-1">
              Due: {task.dueDate}
            </p>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-slate-100 p-2 rounded">
                View
              </button>

              <button className="flex-1 bg-blue-100 p-2 rounded">
                Edit
              </button>

              <button className="flex-1 bg-red-100 p-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}