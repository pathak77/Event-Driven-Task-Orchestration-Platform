import { useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  CheckCircle,
  Circle,
  CheckSquare,
  UserPlus,
  X,
} from "lucide-react";
import { NeuCard } from "../components/NeuCard";
import { NeuButton } from "../components/NeuButton";
import { NeuInput } from "../components/NeuInput";
import api from "../api/axios";

export function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const [assignModal, setAssignModal] = useState({ show: false, taskId: null });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get("/api/task/");
      setTasks(response.data || []);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    
    
    const taskToPost = {
      title: newTask.title,
      description: newTask.description,
      startDate: newTask.startDate, 
      endDate: newTask.endDate,
    };

    try {
      await api.post("/api/task/create", taskToPost);
      setShowModal(false);
      setNewTask({ title: "", description: "", startDate: "", endDate: "" });
      fetchTasks();
    } catch (error) {
      console.error("Failed to create task", error);
    }
  };

  const toggleTask = async (task) => {
    try {
      if (task.status === "COMPLETED") {
        await api.put(`/api/task/unmark-done/${task.id}`);
      } else {
        await api.put(`/api/task/mark-done/${task.id}`);
      }
      fetchTasks();
    } catch (error) {
      console.error("Failed to toggle task", error);
    }
  };

  const deleteTask = async (id) => {
    if (confirm("Delete this task?")) {
      try {
        await api.delete(`/api/task/delete/${id}`);
        fetchTasks();
      } catch (error) {
        console.error("Failed to delete task", error);
      }
    }
  };

  const handleOpenAssignModal = async (taskId) => {
    try {
      const response = await api.get("/api/users");
      setUsers(response.data || []);
      setAssignModal({ show: true, taskId });
    } catch (error) {
      console.error("Failed to fetch users", error);
    }
  };

  const assignTask = async (userId) => {
    try {
      await api.post(
        `/api/assignments/${assignModal.taskId}/assign-to/${userId}`,
      );
      setAssignModal({ show: false, taskId: null });
      alert("Task successfully assigned!");
    } catch (error) {
      console.error("Failed to assign task", error);
      alert("Failed to assign task.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-50 to-transparent p-4 rounded-xl shadow-sm">
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          Tasks
        </h1>
        <div className="w-36 transition-transform hover:scale-105">
          <NeuButton
            onClick={() => setShowModal(true)}
            icon={<Plus className="w-5 h-5" />}
          >
            New Task
          </NeuButton>
        </div>
      </div>

      <div className="space-y-5">
        {tasks.map((task) => {
          const isCompleted = task.status === "COMPLETED";
          return (
            <div
              key={task.id}
              className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-2xl"
            >
              <NeuCard padding="p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-4">
                    <button
                      onClick={() => toggleTask(task)}
                      className="focus:outline-none mt-1 sm:mt-0 transform transition-transform hover:scale-110"
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-7 h-7 text-emerald-500 drop-shadow-md" />
                      ) : (
                        <Circle className="w-7 h-7 text-gray-300 hover:text-blue-400 transition-colors" />
                      )}
                    </button>
                    <div>
                      <h3
                        className={`font-bold text-lg transition-colors ${isCompleted ? "line-through text-gray-400" : "text-gray-800"}`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-sm mt-1 text-gray-500 line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Due: {task.startDate}
                        </span>
                        {task.endDate && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            End: {task.endDate}
                          </span>
                        )}
                        {isCompleted && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 ml-11 sm:ml-0">
                    <button
                      onClick={() => handleOpenAssignModal(task.id)}
                      className="p-2.5 rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-700 transition-all shadow-sm hover:shadow"
                      title="Assign User"
                    >
                      <UserPlus className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-2.5 rounded-xl bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-all shadow-sm hover:shadow"
                      title="Delete Task"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </NeuCard>
            </div>
          );
        })}
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <CheckSquare className="w-16 h-16 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-500">
              No tasks found. Create one to get started!
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md transform transition-all duration-300 scale-100">
            <NeuCard padding="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Create Task
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <form onSubmit={handleCreate} className="space-y-5">
                <NeuInput
                  icon={<CheckSquare className="w-5 h-5 text-blue-500" />}
                  name="title"
                  placeholder="Task Title"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  required
                />
                <NeuInput
                  icon={
                    <span className="w-5 h-5 block border-b-2 border-blue-500" />
                  }
                  name="description"
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  required
                />
                <NeuInput
                  icon={
                    <span className="w-5 h-5 block rounded-full border-2 border-blue-500" />
                  }
                  type="date"
                  name="startDate"
                  placeholder="Start Date"
                  value={newTask.startDate || ""}
                  onChange={(e) =>
                    setNewTask({ ...newTask, startDate: e.target.value })
                  }
                  required
                />
                <NeuInput
                  icon={
                    <span className="w-5 h-5 block rounded-full border-2 border-red-500" />
                  }
                  type="date"
                  name="endDate"
                  placeholder="End Date"
                  value={newTask.endDate || ""}
                  onChange={(e) =>
                    setNewTask({ ...newTask, endDate: e.target.value })
                  }
                  required
                />
                <div className="flex gap-4 pt-6">
                  <div className="w-1/2">
                    <NeuButton
                      type="button"
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </NeuButton>
                  </div>
                  <div className="w-1/2">
                    <NeuButton type="submit">Save Task</NeuButton>
                  </div>
                </div>
              </form>
            </NeuCard>
          </div>
        </div>
      )}

      {assignModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md transform transition-all duration-300 scale-100">
            <NeuCard padding="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Assign User
                </h2>
                <button
                  onClick={() => setAssignModal({ show: false, taskId: null })}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-3 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
                {users.length > 0 ? (
                  users.map((user) => (
                    <div
                      key={user.id}
                      className="flex justify-between items-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-inner">
                          {user.username
                            ? user.username.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {user.username}
                          </p>
                          <p className="text-xs text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => assignTask(user.id)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl font-medium transition-colors shadow-sm cursor-pointer"
                      >
                        Assign
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 font-medium">No users found.</p>
                  </div>
                )}
              </div>
            </NeuCard>
          </div>
        </div>
      )}
    </div>
  );
}
