import { useState, useEffect } from 'react';
import CampTable from '../components/camps/CampTable';
import toast, { Toaster } from 'react-hot-toast';
import api from '../api/axiosConfig';
import { Plus } from 'lucide-react';
import AddingCamp from '../components/camps/AddingCamp';

const Dashboard = () => {
  const [camps, setCamps] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  const fetchCamps = async () => {
    try {
      const response = await api.get('/api/camps/admin');
      setCamps(response.data.data || response.data); // Handle both formats
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {
    fetchCamps();
  }, [refreshKey]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/camps/${id}`);
      toast.success('Camp deleted successfully!'); 

      fetchCamps();
    } catch (error) {
      console.error('Error deleting camp:', error);
      toast.error('Failed to delete camp');
    }
  };



  return (
    <div className="p-6 bg-red-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-red-900 ">Camps Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Camp
        </button>
      </div>

      <CampTable camps={camps} onDelete={handleDelete} onRefresh={fetchCamps} />

      {showAddForm && (
        <AddingCamp
          onClose={() => setShowAddForm(false)}
          onSuccess={() => {
            setShowAddForm(false);
            setRefreshKey(prev => prev + 1); // Force refresh
          }}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
};

export default Dashboard;