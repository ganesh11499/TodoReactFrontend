import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import TodoModal from "../modals/TodoModal";
import {
  deleteTodo,
  getTodo,
  getTodoList,
  saveTodo,
  updateTodo,
} from "../../service/todoService";
import Pagination from "../../components/pagination";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  status: "Pending" | "In Progress" | "Completed";
}

export default function Dashboard() {
  const [todoLoading, setTodoLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("PENDING");
  const [todoData, getTodoData] = useState<Task | null>(null);
  const [open, setOpen] = useState(false);
  const navigate =useNavigate();

  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);
  const userName = user.fullName
  console.log(userName, "userName");



  const [data, setData] = useState<Task[]>([]);

  const [pagination, setPagination] = useState({
    page: 0,
    size: 5,
    status: "PENDING",
  });

  const fecthTodoList = async () => {
    try {
      setTodoLoading(true);
      const response = await getTodoList(
        pagination.page,
        pagination.size,
        pagination.status,
      );

      setTotalPages(response.data.totalPages);

      setData(response.data.content);
    } catch (error) {
    } finally {
      setTodoLoading(false);
      console.log(data, "data");
    }
  };

  useEffect(() => {
    fecthTodoList();
  }, [pagination]);

  const filteredData =
    activeTab === "All"
      ? data
      : data.filter((item) => item.status === activeTab);

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
    getTodoData(null);
    setOpen(true);
  };

  const handleSaveTodo = async (todo: any) => {
    try {
      setIsLoading(true);
      console.log(todo);
      const isEdit = !!todoData?.id;

      const response = isEdit
        ? await updateTodo(todoData.id, todo)
        : await saveTodo(todo);

      // const response = await saveTodo(todo);

      console.log(response, "response");

      alert(isEdit ? "Todo Updated Successfully" : "Todo Saved Successfully");

      setOpen(false);
      fecthTodoList();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

   const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    console.log(tab, "tab");

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

  const handleTodoEdit = async (taskId: number) => {
    console.log(taskId, "taskId");

    try {
      const response = await getTodo(taskId);
      console.log(response.data, "getresponse");
      setOpen(true);
      getTodoData(response.data);
    } catch (error) {
    } finally {
    }
  };

  const handleTodoDelete = async(todoId: number) => {
    try {
      const response = await deleteTodo(todoId)

      console.log(response,"deleteResponse");

      alert("Todo Deleted Successfully");

      fecthTodoList();
      
    } catch (error) {

      alert("Something Went Wrong")
      
    }finally{

    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-5">
         <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="h-16 flex items-center justify-between">

      <h1 className="text-lg sm:text-xl font-bold text-indigo-600">
        Hii, {userName}
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition"
      >
        Logout
      </button>

    </div>
  </div>
</header>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold">Todo Management</h2>

        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          onClick={handleOpen}
        >
          + Add Task
        </button>

        <TodoModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onSave={handleSaveTodo}
          isLoading={isLoading}
          todoData={todoData}
        ></TodoModal>
      </div>

      {/* Tabs */}

      <div className="flex flex-wrap gap-2 mb-5">
        {["PENDING", "IN_PROGRESS", "COMPLETED"].map((tab) => (
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
              <th className="text-left px-4 py-3">ID</th>

              <th className="text-left px-4 py-3">Task</th>

              {/* <th className="text-left px-4 py-3">
                Assigned To
              </th> */}

              <th className="text-left px-4 py-3">Due Date</th>

              <th className="text-left px-4 py-3">Status</th>

              <th className="text-center px-4 py-3">Actions</th>
            </tr>
          </thead>

          {todoLoading ? (
            "Loading..."
          ) : (
            <tbody>
              {filteredData.map((task, no) => (
                <tr key={task.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4">{no + 1}</td>

                  <td className="px-4 py-4 font-medium">{task.title}</td>

                  {/* <td className="px-4 py-4">
                  {task.assignedTo}
                </td> */}

                  <td className="px-4 py-4">{task.dueDate}</td>

                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle(
                        task.status,
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

                      <button className="p-2 rounded bg-blue-100 hover:bg-blue-200"  onClick={() => handleTodoEdit(task.id)}>
                        <Pencil size={18} />
                      </button>

                      <button className="p-2 rounded bg-red-100 hover:bg-red-200" onClick={() => handleTodoDelete(task.id)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
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
          <div key={task.id} className="border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">{task.title}</h3>

              <span
                className={`px-2 py-1 rounded-full text-xs ${statusStyle(
                  task.status,
                )}`}
              >
                {task.status}
              </span>

              
            </div>
            

            {/* <p className="text-sm text-gray-500">
              Assigned: {task.assignedTo}
            </p> */}

            <p className="text-sm text-gray-500 mt-1">Due: {task.dueDate}</p>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-slate-100 p-2 rounded">View</button>

              <button
                className="flex-1 bg-blue-100 p-2 rounded"
                onClick={() => handleTodoEdit(task.id)}
              >
                Edit
              </button>

              <button className="flex-1 bg-red-100 p-2 rounded" onClick={() => handleTodoDelete(task.id)}>Delete</button>
            </div>
            
   
          </div>
        ))}

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
        
    </div>
  );
}
