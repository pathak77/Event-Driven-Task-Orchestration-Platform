import { useState, useEffect } from 'react';
import { NeuCard } from '../components/NeuCard';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import api from '../api/axios';
import { Activity, CheckCircle, Clock, List } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/api/task/');
      setTasks(response.data || []);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
  const inProgressTasks = totalTasks - completedTasks;

  const chartData = {
    labels: ['Completed', 'In Progress'],
    datasets: [
      {
        backgroundColor: ['#4A90E2', '#7AB0F3'],
        data: [completedTasks, inProgressTasks],
        borderWidth: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#1F2937' }
      }
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold" style={{ color: '#1F2937' }}>Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NeuCard padding="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #7AB0F3 100%)' }}>
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Total Tasks</p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{totalTasks}</p>
            </div>
          </div>
        </NeuCard>

        <NeuCard padding="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #7AB0F3 100%)' }}>
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#6B7280' }}>Completed</p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{completedTasks}</p>
            </div>
          </div>
        </NeuCard>

        <NeuCard padding="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #4A90E2 0%, #7AB0F3 100%)' }}>
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#6B7280' }}>In Progress</p>
              <p className="text-2xl font-bold" style={{ color: '#1F2937' }}>{inProgressTasks}</p>
            </div>
          </div>
        </NeuCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NeuCard padding="p-6">
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#1F2937' }}>Task Status</h2>
          <div className="h-64 flex justify-center">
            {totalTasks > 0 ? (
              <Pie data={chartData} options={chartOptions} />
            ) : (
              <p className="flex items-center justify-center h-full" style={{ color: '#6B7280' }}>No data available</p>
            )}
          </div>
        </NeuCard>

        <NeuCard padding="p-6">
          <div className="flex items-center gap-2 mb-4">
            <List className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-semibold" style={{ color: '#1F2937' }}>Recent Tasks</h2>
          </div>
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: '240px' }}>
            {tasks.length > 0 ? (
              tasks.slice(0, 5).map(task => (
                <div key={task.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center hover:bg-blue-50 transition-colors">
                  <div>
                    <h3 className="font-semibold text-gray-800">{task.title}</h3>
                    <p className="text-xs text-gray-500">{task.startDate}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${task.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                    {task.status === 'COMPLETED' ? 'Done' : 'In Progress'}
                  </span>
                </div>
              ))
            ) : (
              <p className="flex justify-center text-sm text-gray-500 mt-10">No tasks found</p>
            )}
          </div>
        </NeuCard>
      </div>
    </div>
  );
}
