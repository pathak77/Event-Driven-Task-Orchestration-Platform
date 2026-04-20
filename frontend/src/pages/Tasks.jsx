import { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import { NeuCard } from '../components/NeuCard';
import { NeuButton } from '../components/NeuButton';
import { NeuInput } from '../components/NeuInput';
import api from '../api/axios';

export function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', description: '', date: '' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data || []);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/task/create', newTask);
      setShowModal(false);
      setNewTask({ name: '', description: '', date: '' });
      fetchTasks();
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  const toggleTask = async (task) => {
    try {
      if (task.completed) {
        await api.put(`/task/unmark-done/${task.id}`);
      } else {
        await api.put(`/task/mark-done/${task.id}`);
      }
      fetchTasks();
    } catch (error) {
      console.error('Failed to toggle task', error);
    }
  };

  const deleteTask = async (id) => {
    if (confirm('Delete this task?')) {
      try {
        await api.delete(`/task/delete/${id}`);
        fetchTasks();
      } catch (error) {
        console.error('Failed to delete task', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: '#1F2937' }}>Tasks</h1>
        <div className="w-32">
          <NeuButton onClick={() => setShowModal(true)} icon={<Plus className="w-4 h-4" />}>
            New
          </NeuButton>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <NeuCard key={task.id} padding="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => toggleTask(task)} className="focus:outline-none">
                  {task.completed ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                <div>
                  <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-[#1F2937]'}`}>
                    {task.name}
                  </h3>
                  <p className="text-sm" style={{ color: '#6B7280' }}>{task.description}</p>
                  <p className="text-xs mt-1" style={{ color: '#4A90E2' }}>Due: {task.date}</p>
                </div>
              </div>
              <button onClick={() => deleteTask(task.id)} className="p-2 text-red-400 hover:text-red-600">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </NeuCard>
        ))}
        {tasks.length === 0 && (
          <p className="text-center mt-10" style={{ color: '#6B7280' }}>No tasks found.</p>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="w-full max-w-md">
            <NeuCard padding="p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1F2937' }}>Create Task</h2>
              <form onSubmit={handleCreate} className="space-y-4">
                <NeuInput
                  icon={<CheckSquare className="w-5 h-5" />}
                  name="name"
                  placeholder="Task Name"
                  value={newTask.name}
                  onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                />
                <NeuInput
                  icon={<span className="w-5 h-5 block border-b-2" />}
                  name="description"
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
                <NeuInput
                  icon={<span className="w-5 h-5 block rounded-full border-2" />}
                  type="date"
                  name="date"
                  placeholder="Due Date"
                  value={newTask.date}
                  onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                />
                <div className="flex gap-4 pt-4">
                  <NeuButton variant="secondary" onClick={() => setShowModal(false)}>Cancel</NeuButton>
                  <NeuButton type="submit">Save</NeuButton>
                </div>
              </form>
            </NeuCard>
          </div>
        </div>
      )}
    </div>
  );
}
